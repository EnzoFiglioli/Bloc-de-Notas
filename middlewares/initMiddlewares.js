// middleware.js
const express = require("express");
const morgan = require("morgan");
const { join } = require("path");

const middleware = (app) => {
    app.set("view engine", "ejs");
    app.set("views", join(__dirname, "../views"));
    app.use(morgan("dev"));
    app.use(express.urlencoded({extended:false}));
};

module.exports = middleware;
