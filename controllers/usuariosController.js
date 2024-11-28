require("dotenv").config();
const {Usuario} = require("../models/Usuario.js");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const login = async (req,res) => {
    try{
        const { username, password } = req.body;
        const usuario = await Usuario.findOne({username}); 
        if(usuario){
            const contraseña = usuario.password == password;
            if(contraseña){
                const data = {
                    id: usuario._id,
                    username: usuario.username
                }
                const token = jwt.sign(data,secretKey,{expiresIn:'3d'});
                res.cookie('token',token);
                res.json({ok:true, msg:`Bienvenido ${username}`, token});
            }else{ 
                res.status(404).json({msg:'Usuario o contraseña incorrecta'});
            }
        }else{
            res.status(404).json("Usuario no registrado");
        }
    }catch(err){
        res.json({msg:`Error al iniciar sesion: ${err.message}`})
    }
}

const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = {
            username,
            password,
            nombreCompleto: "No Name",
            email:'generic@gmail.com',
            tareas: []
        };
        

        const userExists = await Usuario.findOne({username});
        console.log(userExists);
        
        if (userExists) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }
        
        await Usuario.create(newUser);
        return res.json({ msg: 'Usuario creado exitosamente', data: newUser });

    } catch (err) {
        res.status(500).json({ msg: 'No se pudo crear el usuario. Error en el servidor', error: err.message });
    }
};

const getAllUsers = (req,res) =>{
    try{
        res.json(usuariosPath);
    }catch{
        res.json({msg:"No se pudo traer usuarios"})
    }
}

module.exports = {login, signIn, getAllUsers}