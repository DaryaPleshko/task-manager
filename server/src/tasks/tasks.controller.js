const express = require("express");
const { getTasks, createTask, updateTasks, deleteTasks } = require("./tasks.service")

const router = express.Router();


router.get("/:user_id", async (req, res) => {
    try {
        const gotTasks = await getTasks();
        res.status(200).send(gotTasks);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.post("/:user_id", async (req, res) => {
    try {
        const { task } = req.body
        const created = await createTask(req.params.user_id, task);
        res.status(200).send(created);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.put("/:user_id", async (req, res) => {
    try {
        const { task } = req.body;
        const updatedTasks = await updateTasks(req.params.user_id, task);
        res.status(200).send(updatedTasks);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.delete("/:user_id", async (req, res) => {
    try {
        const deletedTasks = await deleteTasks(req.params.user_id);
        res.status(200).send(deletedTasks);
    } catch (error) {
        res.status(404).send(error.message);
    }
});


module.exports = router