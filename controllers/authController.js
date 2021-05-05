const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //extraer el email y password
  const { email, password } = req.body;
  try {
    //Revisar que sea un usuario registrado
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    //Revisar el password
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Password incorrecto" });
    }
    //Si todo es correcto crear y firmar el jwt
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    //Firmar el jwt
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;
        //mensaje de confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-password");
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//Obtener todos lo usuarios
exports.obtenerTodoUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-password");
    if (usuario.rol === "admin") {
      const usuarios = await Usuario.find();
      res.json({ usuarios });
    } else {
      res.status(404).json({ msg: "el usuario no es administrador" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
