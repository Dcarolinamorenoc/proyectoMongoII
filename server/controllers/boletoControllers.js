const Boleto = require('../module/boleto');

const listarBoletos = async (req, res) => {
    let obj = new Boleto();
    const resultado = await obj.listarBoletos();
    obj.destructor();
    res.status(200).json(resultado);
};

const obtenerDetalleBoleto = async (req, res) => {
    let obj = new Boleto();
    const id = req.params.id;
    const resultado = await obj.obtenerDetalleBoleto(id);
    obj.destructor();
    res.status(200).json(resultado);
};

const comprarBoletos = async (req, res) => {
    let obj = new Boleto();
    const datosBoleto = req.body;
    const resultado = await obj.comprarBoletos(datosBoleto);
    obj.destructor();
    res.status(200).json(resultado);
};

const consultarDisponibilidadAsientos = async (req, res) => {
    let obj = new Boleto();
    const idHorarioProyeccion = req.params.idHorarioProyeccion;
    const resultado = await obj.consultarDisponibilidadAsientos(idHorarioProyeccion);
    obj.destructor();
    res.status(200).json(resultado);
};

const pagosEnLinea = async (req, res) => {
    let obj = new Boleto();
    const datosPagoLinea = req.body;
    const resultado = await obj.pagosEnLinea(datosPagoLinea);
    obj.destructor();
    res.status(200).json(resultado);
};

const confirmacionCompra = async (req, res) => {
    let obj = new Boleto();
    const detallesBoletoUser = req.body;
    const resultado = await obj.confirmacionCompra(detallesBoletoUser);
    obj.destructor();
    res.status(200).json(resultado);
};

module.exports = {
    listarBoletos,
    obtenerDetalleBoleto,
    comprarBoletos,
    consultarDisponibilidadAsientos,
    pagosEnLinea,
    confirmacionCompra
};