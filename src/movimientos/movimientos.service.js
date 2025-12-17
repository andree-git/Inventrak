const prisma = require("../prisma/client");

/**
 * Lista todos los movimientos de inventario
 */
const getMovimientosService = async () => {
  return prisma.movimientos_inventario.findMany({
    orderBy: { fecha_movimiento: "desc" },
    include: {
      productos: {
        select: { id: true, nombre: true },
      },
      usuarios: {
        select: { id: true, nombre: true, usuario: true },
      },
    },
  });
};

/**
 * Ajuste manual de inventario (ADMIN)
 * cantidad puede ser positiva o negativa
 */
const createAjusteInventarioService = async ({
  producto_id,
  cantidad,
  usuario_id,
  motivo,
}) => {
  return prisma.$transaction(async (tx) => {
    const producto = await tx.productos.findUnique({
      where: { id: producto_id },
    });

    if (!producto || !producto.activo) {
      throw new Error("Producto no encontrado o inactivo");
    }

    const cantidad_anterior = producto.cantidad_actual;
    const cantidad_nueva = cantidad_anterior + cantidad;

    if (cantidad_nueva < 0) {
      throw new Error("El stock no puede ser negativo");
    }

    const movimiento = await tx.movimientos_inventario.create({
      data: {
        producto_id,
        usuario_id,
        tipo_movimiento: "AJUSTE",
        cantidad,
        cantidad_anterior,
        cantidad_nueva,
        motivo: motivo || "Ajuste manual",
      },
    });

    await tx.productos.update({
      where: { id: producto_id },
      data: {
        cantidad_actual: cantidad_nueva,
      },
    });

    return movimiento;
  });
};

module.exports = {
  getMovimientosService,
  createAjusteInventarioService,
};
