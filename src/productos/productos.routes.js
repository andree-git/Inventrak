const express = require("express");
const router = express.Router();

const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  getProductosRiesgo,
} = require("./productos.controller");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/auth.middleware");

// Todos pueden ver productos
router.get("/", authenticateToken, getProductos);

// Productos con stock riesgoso (ADMIN)
router.get(
  "/riesgo",
  authenticateToken,
  authorizeRoles("ADMIN"),
  getProductosRiesgo
);

// Producto por ID
router.get("/:id", authenticateToken, getProductoById);

// Crear producto (ADMIN)
router.post(
  "/",
  authenticateToken,
  authorizeRoles("ADMIN"),
  createProducto
);

// Actualizar producto (ADMIN)
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("ADMIN"),
  updateProducto
);

// Eliminar (desactivar) producto (ADMIN)
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("ADMIN"),
  deleteProducto
);

module.exports = router;
