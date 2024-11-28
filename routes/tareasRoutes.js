const express = require("express");
const route = express.Router();
const { tareasLista, crearTarea, eliminarTarea } = require("../controllers/tareasControllers.js");

route.get("/", tareasLista);
route.post("/crear", crearTarea);
route.delete("/eliminar/:id", eliminarTarea);

module.exports = route;