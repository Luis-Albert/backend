const express = require("express");
const conectarDB = require("./config/db");

//Crear el servidor
const app = express();

//conectar a la base de datos
conectarDB();

//Habilitar express.json
app.use(express.json({ extended: true }));

//Puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));

//arrancar la app
app.listen(PORT, () => {
  console.log(`El servidor esta funcionado en el puerto ${PORT}`);
});
