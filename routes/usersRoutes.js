const express = require('express');
const route = express.Router();
const {login} = require("../controllers/usuariosController.js");

route.post("/login", login);

module.exports = route;