const express = require("express");
const router = express.Router();

const {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} = require("./usuarios.controller");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/auth.middleware");

// Todas las rutas SOLO ADMIN
router.use(authenticateToken, authorizeRoles("ADMIN"));

router.get("/", getUsuarios);
router.get("/:id", getUsuarioById);
router.post("/", createUsuario);
router.put("/:id", updateUsuario);
router.delete("/:id", deleteUsuario);

module.exports = router;
