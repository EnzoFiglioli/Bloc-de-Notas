const express = require('express');
const route = express.Router();
const {
        login,
        signIn,
        logout
    } = require("../controllers/usuariosController.js");

route.post("/login", login);
route.post("/crear", signIn);
route.get("/logout", logout);

module.exports = route;