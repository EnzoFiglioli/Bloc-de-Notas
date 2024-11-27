const express = require("express");
const route = express.Router();
const {tareasLista} = require("../controllers/notasControllers.js");

route.get("/", tareasLista);

module.exports = route;