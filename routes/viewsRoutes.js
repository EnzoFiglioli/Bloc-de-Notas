const express = require("express");
const route = express.Router();
const {homeView, dashboardView, loginView}  = require("../controllers/vistasControllers.js");

route.get("/",homeView);
route.get("/dashboard",dashboardView);
route.get("/login", loginView);

module.exports = route;