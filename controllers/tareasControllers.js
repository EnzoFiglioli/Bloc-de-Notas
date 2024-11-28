const notas = require("../config/usuarios.json");
const { Tarea } = require("../models/Tareas.js");
const { Usuario } = require("../models/Usuario.js");

const tareasLista = async(req, res) => {
    try {
        const userActive = "EnzoF";
        const user = await Usuario.findOne({username:userActive});
        
        if(user) {
            const tareasIncompletas = await Usuario.findOne({username:userActive})
                .populate({
                    path:'tareas',
                    match:{
                        incompletas:true,
                        estado: false
                    }
                });

            if (tareasIncompletas) {
                const {tareas} = tareasIncompletas;
                const listaDeTareas = await Tarea.find();

                const tareasFiltradas = listaDeTareas.filter((i) =>{
                    i._id === tareas._id
                });
                if(tareasFiltradas) return res.json(listaDeTareas);

                res.status(404).json({msg:'Tareas no encontradas'});
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

const crearTarea = async (req,res) => {
    try{
        const {concepto} = req.body;
       const tarea = await Tarea.create({concepto});
       const usuarioActualizado = await Usuario.findOneAndUpdate(
        {
            username:'EnzoF'
        },{
            $push:{
                tareas:{incompletas: tarea._id}
            }
        }
    );

    res.json({msg:'Tarea creada exitosamente', usuarioActualizado});
    }catch(err){
        res.status(404).json({msg:`Error al crear la tarea: ${err.message}`})
    }
}

const eliminarTarea = async (req,res)=> {
    try{
        const { id } = req.params;
        const tarea = await Tarea.findByIdAndDelete(id);
        if(!tarea) return res.status(404).json({msg:'Tarea no encontrada'});
        res.json({msg:'Tarea eliminada exitosamente!'});
    }catch{
        res.status(500).json({msg:'Error al eliminar tarea'})
    }
}

module.exports = { tareasLista, crearTarea, eliminarTarea };