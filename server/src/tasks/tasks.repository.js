const { pool } = require("../database");

const getTasksDB = async () => {
    const connect = await pool.connect();

    const sqlStudents = `select t.id, t.user_id, t.tasks from tasks t join users u On u.id = t.id `
    const objStudents = (await connect.query(sqlStudents, [])).rows;
    return objStudents;
}

const createTaskDB = async (user_id, task) => {
    const connect = await pool.connect();
    try {
        connect.query('BEGIN')

        const sql = 'INSERT INTO tasks (user_id, tasks) VALUES ($1, $2) RETURNING tasks.*'
        const objStudents = (await connect.query(sql, [user_id, task])).rows;

        connect.query('COMMIT')

        return objStudents
    } catch (e) {
        console.log('EXC IN createTaskDB');
        connect.query('ROLLBACK')
    } finally {
        connect.release()
    }
}

module.exports = { getTasksDB, createTaskDB }
