const express = require("express");
const conectarDB = require("./config/db");

//Crear el servidor
const app = express();

//conectar a la base de datos
conectarDB();

//Puerto de la app
const PORT = process.env.PORT || 4000;

//Definir la pagina principal
app.get("/", (req, res) => {
  res.send("Hello Putito");
});

//arrancar la app
app.listen(PORT, () => {
  console.log(`El servidor esta funcionado en el puerto ${PORT}`);
});
