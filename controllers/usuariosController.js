const usuarios = require("../config/usuarios.json");
const login = async (req,res) => {
    try{
        const { username, password } = req.body;
        console.log(req.body);        
        const usuario = usuarios.find((i)=> i.username === username);
        if(usuario){
            const contraseña = usuario.password == password;
            contraseña ? 
                res.json({msg:`Bienvenido ${username}`}) : 
                res.status(404).json({msg:'Usuario o contraseña incorrecta'});
        }else{
            res.status(404).json("Usuario no registrado");
        }
    }catch(err){
        res.json({msg:`Error al iniciar sesion: ${err.message}`})
    }
}

module.exports = {login}