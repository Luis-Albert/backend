const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.crearUsuario = async (req, res) => {
  //Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //extraer email y password
  const { email, password } = req.body;
  try {
    //Validar que el usuario registrado sea unico
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }
    //guardar el nuevo usuario
    usuario = new Usuario(req.body);

    //Hashear el password
    const salt = await bcryptjs.genSaltSync(10);
    usuario.password = await bcryptjs.hash(password, salt);

    //guardar usuario
    await usuario.save();

    //mensaje de confirmacion
    res.json({ msg: "El usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
