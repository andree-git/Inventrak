const prisma = require("../prisma/client");

/**
 * Listar productos activos
 */
const getProductosService = async () => {
  return prisma.productos.findMany({
    where: { activo: true },
    include: {
      proveedores: {
        select: { id: true, nombre: true },
      },
    },
    orderBy: { nombre: "asc" },
  });
};

/**
 * Producto por ID
 */
const getProductoByIdService = async (id) => {
  return prisma.productos.findFirst({
    where: { id, activo: true },
    include: {
      proveedores: true,
    },
  });
};

/**
 * Crear producto
 */
const createProductoService = async (data) => {
  const {
    nombre,
    precio_venta,
    precio_compra,
    cantidad_actual,
    cantidad_critica,
    proveedor_id,
  } = data;

  if (!nombre || !precio_venta || !precio_compra) {
    throw new Error("Nombre, precio_venta y precio_compra son obligatorios");
  }

  return prisma.productos.create({
    data: {
      nombre,
      precio_venta,
      precio_compra,
      cantidad_actual: cantidad_actual || 0,
      cantidad_critica: cantidad_critica || 5,
      proveedor_id: proveedor_id || null,
    },
  });
};

/**
 * Actualizar producto
 */
const updateProductoService = async (id, data) => {
  const producto = await prisma.productos.findUnique({ where: { id } });
  if (!producto) {
    throw new Error("Producto no encontrado");
  }

  return prisma.productos.update({
    where: { id },
    data,
  });
};

/**
 * Desactivar producto (soft delete)
 */
const deleteProductoService = async (id) => {
  const producto = await prisma.productos.findUnique({ where: { id } });
  if (!producto) {
    throw new Error("Producto no encontrado");
  }

  return prisma.productos.update({
    where: { id },
    data: { activo: false },
  });
};

/**
 * Productos con stock en riesgo
 */
const getProductosRiesgoService = async () => {
  return prisma.productos.findMany({
    where: {
      activo: true,
      cantidad_actual: {
        lte: prisma.productos.fields.cantidad_critica,
      },
    },
    orderBy: { cantidad_actual: "asc" },
  });
};

module.exports = {
  getProductosService,
  getProductoByIdService,
  createProductoService,
  updateProductoService,
  deleteProductoService,
  getProductosRiesgoService,
};
