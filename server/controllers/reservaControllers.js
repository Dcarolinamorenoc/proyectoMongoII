const reserva = require('../module/reserva');

const reservarAsientos = async (req, res) => {
    try {
        const obj = new reserva();
        const resultado = await obj.reservarAsientos(req.body);
        obj.destructor(); 
        if (resultado.error) {
            return res.status(400).json({ error: resultado.error });
        }
        
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Define the cancelarReserva function
const cancelarReserva = async (req, res) => {
    let obj = new reserva();
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
