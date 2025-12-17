const prisma = require("../prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginService = async (usuario, password) => {

  const user = await prisma.usuarios.findUnique({  // ← nombre correcto
    where: { usuario },
  });

  if (!user || !user.activo) {
    throw new Error("Usuario no encontrado o inactivo");
  }

  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) {
    throw new Error("Contraseña incorrecta");
  }

  const token = jwt.sign(
    {
      id: user.id,
      usuario: user.usuario,
      rol: user.rol,
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return {
    token,
    usuario: {
      id: user.id,
      nombre: user.nombre,
      usuario: user.usuario,
      rol: user.rol,
    },
  };
};

module.exports = { loginService };
