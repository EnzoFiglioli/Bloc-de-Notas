require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000
const middleware = require("./middlewares/initMiddlewares.js");
const viewsRoutes = require("./routes/viewsRoutes.js");
const userRoutes = require("./routes/usersRoutes.js");

// Middleware
middleware(app);

// Rutas
app.use("/", viewsRoutes);
app.use("/api/user/", userRoutes);

app.listen(port,()=>{
    console.log(`Servidor iniciado en el puerto ${port}`);
    console.log(`http://localhost:${port}/`);
});