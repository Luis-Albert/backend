//Rutas para authenticar usuario
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");

//Inciiar sesion usuario
//api/auth
router.post("/", authController.autenticarUsuario);

//obtiene el usuario autenticado
router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
