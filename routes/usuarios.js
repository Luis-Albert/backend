//Rutas para crear usuarios
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

//crear un usuario

//api/usuario
router.post("/", usuarioController.crearUsuario);
module.exports = router;
