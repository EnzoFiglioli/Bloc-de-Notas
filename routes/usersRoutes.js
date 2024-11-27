const express = require('express');
const route = express.Router();
const {
        login,
        signIn,
        getAllUsers
    } = require("../controllers/usuariosController.js");

route.post("/login", login);
route.post("/crear", signIn);
route.get("/", getAllUsers);

module.exports = route;