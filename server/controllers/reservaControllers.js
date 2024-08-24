const Reserva = require('../module/reserva');

const reservarAsientos = async (req, res) => {
    let obj = new Reserva();
    const datosReserva = req.body;
    const resultado = await obj.reservarAsientos(datosReserva);
    obj.destructor();
    if (resultado.error) {
        return res.status(400).json({ error: resultado.error });
    }
    res.status(200).json(resultado);
};

const cancelarReserva = async (req, res) => {
    let obj = new Reserva();
    const datosReserva = req.body;
    const resultado = await obj.cancelarReserva(datosReserva);
    obj.destructor();
    if (resultado.error) {
        return res.status(400).json({ error: resultado.error });
    }
    res.status(200).json(resultado);
};

module.exports = {
    reservarAsientos,
    cancelarReserva
};
