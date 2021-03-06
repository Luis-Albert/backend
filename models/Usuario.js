const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  registro: {
    type: Date,
    default: Date.now(),
  },
  rol: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
