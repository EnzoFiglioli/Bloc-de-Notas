const express = require("express");
const route = express.Router();
const {homeView, dashboardView}  = require("../controllers/vistasControllers.js");

route.get("/",homeView);
route.get("/dashboard",dashboardView);

module.exports = route;