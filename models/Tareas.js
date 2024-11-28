const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema({
    concepto: { type: String, required: true },
    estado: { type: Boolean, default: false},
    timestamp : { type: Date, default: Date.now() }
});

const Tarea = mongoose.model('Tarea', tareaSchema);

module.exports = {Tarea, tareaSchema}