const mongoose = require("mongoose");
const {tareaSchema} = require("./Tareas.js");

const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nombreCompleto: { type: String, required: true },
    email: { type: String, required: true, default: 'todolisto@mail.com'},
    timestamp: { type: Date, default: Date.now }
});

const Usuario = mongoose.model('Usuario',usuarioSchema);

module.exports = {Usuario}