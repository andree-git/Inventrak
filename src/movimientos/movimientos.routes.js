const express = require("express");
const router = express.Router();

const {
  getMovimientos,
  createAjusteInventario,
} = require("./movimientos.controller");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/auth.middleware");

// Ver movimientos (ADMIN)
router.get(
  "/",
  authenticateToken,
  authorizeRoles("ADMIN"),
  getMovimientos
);

// Ajuste manual de inventario (ADMIN)
router.post(
  "/ajuste",
  authenticateToken,
  authorizeRoles("ADMIN"),
  createAjusteInventario
);

module.exports = router;
