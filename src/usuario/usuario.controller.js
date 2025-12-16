const prisma = require("../prisma");
const bcrypt = require("bcryptjs");

// GET /usuario
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.Usuario.findMany({
      select: {
        id: true,
        usuario: true,
        nombre: true,
        email: true,
        rol: true,
        activo: true,
        fecha_creacion: true,
      },
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /usuario
exports.createUsuario = async (req, res) => {
  const { usuario, nombre, email, rol, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    const nuevo = await prisma.Usuario.create({
      data: {
        usuario,
        nombre,
        email,
        rol,
        password: hash,
      },
    });

    res.status(201).json({ message: "Usuario creado", id: nuevo.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /usuario/:id
exports.updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { usuario, nombre, email, rol } = req.body;

  await prisma.Usuario.update({
    where: { id: Number(id) },
    data: { usuario, nombre, email, rol },
  });

  res.json({ message: "Usuario actualizado" });
};

// PATCH /usuario/:id/estado
exports.toggleUsuario = async (req, res) => {
  const { id } = req.params;

  const user = await prisma.Usuario.findUnique({
    where: { id: Number(id) },
  });

  await prisma.Usuario.update({
    where: { id: Number(id) },
    data: { activo: !user.activo },
  });

  res.json({ message: "Estado actualizado" });
};

// DELETE /usuario/:id
exports.deleteUsuario = async (req, res) => {
  const { id } = req.params;

  await prisma.Usuario.delete({
    where: { id: Number(id) },
  });

  res.json({ message: "Usuario eliminado" });
};
