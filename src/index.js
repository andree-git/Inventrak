require("dotenv").config();
const authRoutes = require("./auth/auth.routes");
const express = require("express");
const cors = require("cors");
const prisma = require("./prisma");

const app = express();

app.use(cors());
app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.send("API de SchoolConnect funcionando!");
});

// Test de base de datos
app.get("/usuario", async (req, res) => {
  try {
    const usuarios = await prisma.Usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.use("/auth", authRoutes);

const auth = require("./auth/auth.middleware");

app.get("/perfil", auth, (req, res) => {
  res.json({
    message: "Acceso permitido",
    usuario: req.usuario,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
