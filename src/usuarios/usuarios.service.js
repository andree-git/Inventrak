const prisma = require("../prisma/client");
const bcrypt = require("bcryptjs");

/**
 * Listar usuarios activos
 */
const getUsuariosService = async () => {
  return prisma.usuarios.findMany({
    where: { activo: true },
    select: {
      id: true,
      usuario: true,
      nombre: true,
      rol: true,
      activo: true,
      fecha_creacion: true,
    },
    orderBy: { nombre: "asc" },
  });
};

/**
 * Usuario por ID
 */
const getUsuarioByIdService = async (id) => {
  return prisma.usuarios.findFirst({
    where: { id, activo: true },
    select: {
      id: true,
      usuario: true,
      nombre: true,
      rol: true,
      activo: true,
      fecha_creacion: true,
    },
  });
};

/**
 * Crear usuario
 */
const createUsuarioService = async (data) => {
  const { usuario, password, nombre, rol } = data;

  if (!usuario || !password || !nombre || !rol) {
    throw new Error("Todos los campos son obligatorios");
  }

  if (!["ADMIN", "VENDEDOR"].includes(rol)) {
    throw new Error("Rol inválido");
  }

  const existe = await prisma.usuarios.findUnique({ where: { usuario } });
  if (existe) {
    throw new Error("El usuario ya existe");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.usuarios.create({
    data: {
      usuario,
      password: hashedPassword,
      nombre,
      rol,
    },
    select: {
      id: true,
      usuario: true,
      nombre: true,
      rol: true,
    },
  });
};

/**
 * Actualizar usuario
 */
const updateUsuarioService = async (id, data) => {
  const usuarioDB = await prisma.usuarios.findUnique({ where: { id } });
  if (!usuarioDB) {
    throw new Error("Usuario no encontrado");
  }

  const updateData = { ...data };

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  if (data.rol && !["ADMIN", "VENDEDOR"].includes(data.rol)) {
    throw new Error("Rol inválido");
  }

  return prisma.usuarios.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      usuario: true,
      nombre: true,
      rol: true,
      activo: true,
    },
  });
};

/**
 * Desactivar usuario (soft delete)
 */
const deleteUsuarioService = async (id) => {
  const usuarioDB = await prisma.usuarios.findUnique({ where: { id } });
  if (!usuarioDB) {
    throw new Error("Usuario no encontrado");
  }

  return prisma.usuarios.update({
    where: { id },
    data: { activo: false },
  });
};

module.exports = {
  getUsuariosService,
  getUsuarioByIdService,
  createUsuarioService,
  updateUsuarioService,
  deleteUsuarioService,
};
