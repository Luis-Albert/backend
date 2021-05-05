//Rutas para authenticar usuario
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");

//Inciiar sesion usuario
//api/authUsers
//obtener todos los usuarios
router.get("/", auth, authController.obtenerTodoUsuario);

module.exports = router;
