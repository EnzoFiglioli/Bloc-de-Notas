const mongoose = require("mongoose");
const {tareaSchema} = require("./Tareas.js");

const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Usuario = mongoose.model('Usuario',usuarioSchema);

module.exports = {Usuario}