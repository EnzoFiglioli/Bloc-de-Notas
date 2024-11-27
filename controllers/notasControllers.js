const notas = require("../config/usuarios.json");

const tareasLista = (req, res) => {
    try {
        const userActive = "Enzo";
        const user = notas.find(i => i.username === userActive);
        
        if (user) {
            const tareasIncompletas = user.tareas[0].incompletas;

            if (tareasIncompletas) {
                return res.json(tareasIncompletas);
            } else {
                return res.status(404).json({ msg: 'No hay tareas incompletas' });
            }
        } else {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Error al obtener las tareas' });
    }
};

module.exports = { tareasLista };
