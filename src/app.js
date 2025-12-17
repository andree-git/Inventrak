const express = require("express");
const cors = require("cors");

const authRoutes = require("./auth/auth.routes");
const usuariosRoutes = require("./usuarios/usuarios.routes");
const productosRoutes = require("./productos/productos.routes");
const ventasRoutes = require("./ventas/ventas.routes");
const movimientosRoutes = require("./movimientos/movimientos.routes");

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API Inventario funcionando correctamente");
});

// Rutas
app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/productos", productosRoutes);
app.use("/ventas", ventasRoutes);
app.use("/movimientos", movimientosRoutes);

module.exports = app;
