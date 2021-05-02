const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");

//crear un proyecto
//api/proyecto
router.post(
  "/",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  proyectoController.crearProyecto
);

//Obtener todos los proyectos
router.get("/", auth, proyectoController.obtenerProyectos);

//Actualiza proyecto via ID
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  proyectoController.actualizarProyecto
);

//Eliminar un proyecto

//Actualiza proyecto via ID
router.delete("/:id", auth, proyectoController.eliminarProyecto);
module.exports = router;
