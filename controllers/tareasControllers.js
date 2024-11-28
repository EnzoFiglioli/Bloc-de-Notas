const notas = require("../config/usuarios.json");
const { Tarea } = require("../models/Tareas.js");
const { Usuario } = require("../models/Usuario.js");

const userActive = "Enzo";

const tareasLista = async(req, res) => {
    try {
        const user = await Usuario.findOne({username:userActive});
        if(user) {
            const {_id} = user;
            const tareasFiltradas = await Tarea.find({ usuarioId: _id });
            if(tareasFiltradas) return res.json(tareasFiltradas);

            res.status(404).json({msg:'Tareas no encontradas'});
        } else {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Error al obtener las tareas' });
    }
};

const crearTarea = async (req,res) => {
    try{
        const {concepto} = req.body;
       const user = await Usuario.findOne({username: userActive});
       await Tarea.create(
        {
            concepto,
            usuarioId: user._id
        });

    res.json({msg:'Tarea creada exitosamente'});
    }catch(err){
        res.status(404).json({msg:`Error al crear la tarea: ${err.message}`})
    }
}

const eliminarTarea = async (req,res)=> {
    try{
        const { id } = req.params;
        const tarea = await Tarea.findByIdAndDelete(id);
        if(!tarea) return res.status(404).json({msg:'Tarea no encontrada'});
        
        if(tarea){
            await Usuario.findOne({username:userActive})
            .populate({path:'tareas'}).findByIdAndDelete(id);
            res.json({msg:'Tarea eliminada exitosamente!'});
        }
    }catch{
        res.status(500).json({msg:'Error al eliminar tarea'})
    }
}

const actualizarTarea = async (req,res)=> {
    try{
        const { id } = req.params;
        const { concepto } = req.body;

        const tarea = await Tarea.findByIdAndUpdate({_id:id},{concepto});
        if(!tarea) return res.status(404).json({msg:'No se pudo actualizar la tarea'});
        res.json({msg:'Tarea actualizada correctamente!'})
    }catch{
        res.status(500).json({msg:'Error al actualizar la tarea'})
    }
}

module.exports = { tareasLista, crearTarea, eliminarTarea, actualizarTarea };