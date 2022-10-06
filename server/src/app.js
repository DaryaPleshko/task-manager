const express = require("express");
const bodyParser = require("body-parser");
const users = require("./users/users.controller");
const tasks = require("./tasks/tasks.controller");

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());

app.use("/users", users);
app.use("/tasks", tasks);

app.use((error, req, res, next) => {
    res.status(404).send(error.message);
})

module.exports = app;