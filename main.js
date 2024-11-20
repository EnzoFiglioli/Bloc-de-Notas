require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000

// Middleware

app.listen(port,()=>{
    console.log(`Servidor iniciado en el puerto ${port}`);
    console.log(`http://localhost:${port}/`);
});