const express = require("express");
const route = express.Router();
const {homeView, dashboardView, loginView, registerView}  = require("../controllers/vistasControllers.js");
const { verifyToken } = require("../functions/verifyToken.js")

route.get("/",homeView);
route.get("/dashboard",
    // verifyToken,
    dashboardView);
route.get("/login", loginView);
route.get("/register", registerView);
module.exports = route;