const { getTasksDB, createTaskDB, updateTaskDB, deleteTaskDB } = require("./tasks.repository");

const getTasks = async () => {
    const gotTasksDB = await getTasksDB();
    return gotTasksDB;
}

const createTask = async (user_id, task) => {
    const created = await createTaskDB(user_id, task);
    return created;
}

const updateTasks = async (user_id, task) => {
    const updated = await updateTaskDB(user_id, task);
    return updated;
}

const deleteTasks = async (user_id) => {
    const deleted = await deleteTaskDB(user_id);
    return deleted;
}

module.exports = { getTasks, createTask, updateTasks, deleteTasks }