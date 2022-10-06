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
        const obj = (await connect.query(sql, [user_id, task])).rows;
        connect.query('COMMIT')
        return obj
    } catch (e) {
        console.log(`EXC IN createTaskDB ${e}`);
        connect.query('ROLLBACK')
    } finally {
        connect.release()
    }
}


const updateTaskDB = async (user_id, task) => {
    const connect = await pool.connect();
    try {
        await connect.query('BEGIN');
        console.log(user_id, task);
        const sqlInfo = `UPDATE tasks SET tasks = $1 WHERE user_id = $2 RETURNING tasks.*`;
        const objInfo = (await connect.query(sqlInfo, [task, user_id])).rows;

        await connect.query('COMMIT');

        if (!objInfo.length > 0) throw new Error('Неккоректные значения');
        return objInfo;
    } catch (error) {
        console.log(`EXCEPTION IN updateTasksDB ${error}`);
        await connect.query('ROLLBACK');
    } finally {
        connect.release()
    }
}

const deleteTaskDB = async (user_id) => {
    const connect = await pool.connect();
    try {
        await connect.query('BEGIN');
        console.log();
        const sqlInfo = `
        DELETE FROM tasks
        WHERE user_id = $1 RETURNING tasks.* `;

        const objInfo = (await connect.query(sqlInfo, [user_id])).rows;

        await connect.query('COMMIT');

        return objInfo;
    } catch (error) {
        console.log(`EXCEPTION IN deleteUsersDB ${error}`);
        await connect.query('ROLLBACK');
    } finally {
        connect.release()
    }
}

module.exports = { getTasksDB, createTaskDB, updateTaskDB, deleteTaskDB }
