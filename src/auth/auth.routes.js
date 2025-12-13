const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Buscar usuario por email
    const usuario = await prisma.usuarios.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(401).json({ message: "Usuario no existe" });
    }

    // 2. Comparar contraseña
    const passwordOk = await bcrypt.compare(password, usuario.password);

    if (!passwordOk) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // 3. Crear token
    const token = jwt.sign(
      {
        id: usuario.id,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET || "secreto",
      { expiresIn: "1d" }
    );

    // 4. Respuesta
    res.json({
      token,
      usuario: {
        id: usuario.id,
        apellido: usuario.apellido,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
