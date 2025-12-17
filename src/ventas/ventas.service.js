const prisma = require("../prisma/client");

/**
 * Crear venta:
 * - calcula totales
 * - descuenta stock
 * - registra movimientos
 */
const createVentaService = async (user, data) => {
  const { items } = data;
  // items = [{ producto_id, cantidad }]

  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error("La venta debe tener productos");
  }

  return prisma.$transaction(async (tx) => {
    let total = 0;
    const detalles = [];

    for (const item of items) {
      const producto = await tx.productos.findUnique({
        where: { id: item.producto_id },
      });

      if (!producto || !producto.activo) {
        throw new Error("Producto no válido");
      }

      if (producto.cantidad_actual < item.cantidad) {
        throw new Error(
          `Stock insuficiente para ${producto.nombre}`
        );
      }

      const subtotal =
        Number(producto.precio_venta) * item.cantidad;

      total += subtotal;

      detalles.push({
        producto_id: producto.id,
        cantidad: item.cantidad,
        precio_unitario: producto.precio_venta,
        subtotal,
      });

      // actualizar stock
      await tx.productos.update({
        where: { id: producto.id },
        data: {
          cantidad_actual:
            producto.cantidad_actual - item.cantidad,
        },
      });

      // movimiento inventario
      await tx.movimientos_inventario.create({
        data: {
          producto_id: producto.id,
          usuario_id: user.id,
          tipo_movimiento: "SALIDA",
          cantidad: item.cantidad,
          cantidad_anterior: producto.cantidad_actual,
          cantidad_nueva:
            producto.cantidad_actual - item.cantidad,
        },
      });
    }

    // crear venta
    const venta = await tx.ventas.create({
      data: {
        vendedor_id: user.id,
        total,
        detalle_ventas: {
          create: detalles,
        },
      },
      include: {
        detalle_ventas: {
          include: { productos: true },
        },
      },
    });

    return venta;
  });
};

/**
 * Listar ventas
 */
const getVentasService = async () => {
  return prisma.ventas.findMany({
    include: {
      usuarios: {
        select: { id: true, nombre: true, usuario: true },
      },
      detalle_ventas: {
        include: {
          productos: { select: { nombre: true } },
        },
      },
    },
    orderBy: { fecha_venta: "desc" },
  });
};

/**
 * Venta por ID
 */
const getVentaByIdService = async (id) => {
  return prisma.ventas.findUnique({
    where: { id },
    include: {
      usuarios: true,
      detalle_ventas: {
        include: { productos: true },
      },
    },
  });
};

module.exports = {
  createVentaService,
  getVentasService,
  getVentaByIdService,
};
