const { usersCreatedDB, readUserDB, updateUsersDB, deleteUsersDB } = require("./users.repository");

const usersCreate = async (name, email, password) => {
    const userCreatedDB = await usersCreatedDB(name, email, password);
    return userCreatedDB;
}

const usersGet = async (email, password) => {
    const userReadedDB = await readUserDB(email, password);
    return userReadedDB;
}

const updateUsers = async (id, name, email, password) => {
    const updatedUsersDB = await updateUsersDB(id, name, email, password);
    return updatedUsersDB;
}

const deleteUsers = async (id) => {
    const deletedUsersDB = await deleteUsersDB(id);
    return deletedUsersDB;
}


module.exports = { usersCreate, usersGet, updateUsers, deleteUsers }