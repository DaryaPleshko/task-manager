const { pool } = require("../database");

const usersCreatedDB = async (name, email, password) => {
    const connect = await pool.connect();

    const sqlStudents = `INSERT into users (name, email, password)
    VALUES ($1, $2, $3)  RETURNING users.*`
    const objStudents = (await connect.query(sqlStudents, [name, email, password])).rows;
    return objStudents;
}

const readUserDB = async (email, password) => {
    const connect = await pool.connect();
    const sql = `SELECT * FROM users WHERE email = $1 AND password = $2`;
    const obj = (await connect.query(sql, [email, password])).rows;
    return obj;
}


const updateUsersDB = async (id, name, email, password) => {
    const connect = await pool.connect();
    try {
        await connect.query('BEGIN');

        const sqlInfo = `UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING users.*`;
        const objInfo = (await connect.query(sqlInfo, [name, email, password, id])).rows;

        await connect.query('COMMIT');

        if (!objInfo.length > 0) throw new Error('Неккоректные значения');
        return objInfo;
    } catch (error) {
        console.log('EXCEPTION IN updateUsersDB');
        await connect.query('ROLLBACK');
    } finally {
        connect.release()
    }
}

const deleteUsersDB = async (id) => {
    const connect = await pool.connect();
    try {
        await connect.query('BEGIN');

        const sqlInfo = `
        DELETE FROM users
        WHERE id = $1 RETURNING users.* `;
        const objInfo = (await connect.query(sqlInfo, [id])).rows;
        await connect.query('COMMIT');
        return objInfo;
    } catch (error) {
        console.log('EXCEPTION IN deleteUsersDB');
        await connect.query('ROLLBACK');
    } finally {
        connect.release()
    }
}

module.exports = { usersCreatedDB, readUserDB, updateUsersDB, deleteUsersDB }
