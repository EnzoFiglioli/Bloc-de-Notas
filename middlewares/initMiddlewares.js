const express = require("express");
const app = express();
const morgan = require("morgan");

app.use("views","engine","ejs");
app.set("views",__dirname + "views")
app.use(morgan("dev"));

module.exports = middleware;