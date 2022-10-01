const express = require("express");
const { usersCreate, usersGet, updateUsers, deleteUsers } = require("./users.service")

const router = express.Router();


router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const createdUsers = await usersCreate(name, email, password);
        res.status(200).send(createdUsers); 
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.post("/auth", async (req, res) => {
    try {
        const { email, password } = req.body;
        const authUsers = await usersGet(email, password);
        res.status(200).send(authUsers);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

// router.get("/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const gotNews = await getNewsById(id);
//         res.status(200).send(gotNews);
//     } catch (error) {
//         res.status(404).send(error.message);
//     }
// });

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const updatedUsers = await updateUsers(id, name, email, password);
        res.status(200).send(updatedUsers);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUsers = await deleteUsers(id);
        res.status(200).send(deletedUsers);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router