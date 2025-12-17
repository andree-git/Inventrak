const express = require("express");
const router = express.Router();

const {
  createVenta,
  getVentas,
  getVentaById,
} = require("./ventas.controller");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/auth.middleware");

// ADMIN y VENDEDOR
router.use(authenticateToken, authorizeRoles("ADMIN", "VENDEDOR"));

router.get("/", getVentas);
router.get("/:id", getVentaById);
router.post("/", createVenta);

module.exports = router;
