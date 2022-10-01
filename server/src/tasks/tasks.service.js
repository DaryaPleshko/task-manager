const { getTasksDB, createTaskDB } = require("./users.repository");

const getTasks = async () => {
    const gotTasksDB = await getTasksDB();
    return gotTasksDB;
}

const createTask = async(user_id, task)=> {
    const created = await createTaskDB(user_id, task);
    return created;
}
module.exports = { getTasks, createTask }