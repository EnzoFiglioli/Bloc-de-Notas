const mongoose = require("mongoose");
const {tareaSchema} = require("./Tareas.js");

const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tareas: {
        incompletas: { type: [tareaSchema], default: [] },
        completas: { type: [tareaSchema], default: [] }
    },
    timestamp: { type: Date, default: Date.now }
});

const Usuario = mongoose.model('Usuario',usuarioSchema);

module.exports = {Usuario}