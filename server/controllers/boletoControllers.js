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
    try {
        const idHorarioProyeccion = req.params.idHorarioProyeccion;
        const resultado = await obj.consultarDisponibilidadAsientos(idHorarioProyeccion);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(404).json({ error: `Error al consultar disponibilidad de asientos: ${error.message}` });
    } finally {
        obj.destructor();
    }
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

const obtenerInfoPeliculaCompleta = async (req, res) => {
    let obj = new Boleto();
    try {
        const idPelicula = req.params.idPelicula;
        const resultado = await obj.obtenerInfoPeliculaCompleta(idPelicula);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(404).json({ error: `Error al obtener información completa de la película: ${error.message}` });
    } finally {
        obj.destructor();
    }
};

const obtenerBoletosUsuario = async (req, res) => {
    let obj = new Boleto();
    try {
        const idUsuario = req.params.idUsuario;
        const resultado = await obj.obtenerBoletosUsuario(idUsuario);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(404).json({ error: `Error al obtener los boletos del usuario: ${error.message}` });
    } finally {
        obj.destructor();
    }
};

module.exports = {
    listarBoletos,
    obtenerDetalleBoleto,
    comprarBoletos,
    consultarDisponibilidadAsientos,
    pagosEnLinea,
    confirmacionCompra,
    obtenerInfoPeliculaCompleta,
    obtenerBoletosUsuario
};