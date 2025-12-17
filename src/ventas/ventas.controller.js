const {
  createVentaService,
  getVentasService,
  getVentaByIdService,
} = require("./ventas.service");

const createVenta = async (req, res) => {
  try {
    const venta = await createVentaService(req.user, req.body);
    res.status(201).json(venta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getVentas = async (req, res) => {
  try {
    const ventas = await getVentasService();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ventas" });
  }
};

const getVentaById = async (req, res) => {
  try {
    const venta = await getVentaByIdService(Number(req.params.id));
    if (!venta) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }
    res.json(venta);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener venta" });
  }
};

module.exports = {
  createVenta,
  getVentas,
  getVentaById,
};
