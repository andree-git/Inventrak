const {
  getMovimientosService,
  createAjusteInventarioService,
} = require("./movimientos.service");

const getMovimientos = async (req, res) => {
  try {
    const movimientos = await getMovimientosService();
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener movimientos",
    });
  }
};

const createAjusteInventario = async (req, res) => {
  try {
    const { producto_id, cantidad, motivo } = req.body;
    const usuario_id = req.user.id;

    if (!producto_id || cantidad === undefined) {
      return res.status(400).json({
        message: "producto_id y cantidad son requeridos",
      });
    }

    const movimiento = await createAjusteInventarioService({
      producto_id,
      cantidad,
      usuario_id,
      motivo,
    });

    res.status(201).json(movimiento);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getMovimientos,
  createAjusteInventario,
};
