require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000
const middleware = require("./middlewares/initMiddlewares.js");
const viewsRoutes = require("./routes/viewsRoutes.js");
const userRoutes = require("./routes/usersRoutes.js");
const tareasRoutes = require("./routes/tareasRoutes.js");
const { verifyToken } = require("./functions/verifyToken.js");


// Middleware
middleware(app);

// Rutas
app.use("/", viewsRoutes);
app.use("/api/auth/", userRoutes);
app.use("/api/tareas/", verifyToken ,tareasRoutes);

app.listen(port,()=>{
    console.log(`Servidor iniciado en el puerto ${port}`);
    console.log(`http://localhost:${port}/`);
});