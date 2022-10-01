const express = require("express");
const { getTasks, createTask } = require("./users.service")

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
        const { tasks } = req.body
        const created = await createTask(req.params.user_id, tasks);
        res.status(200).send(created);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router