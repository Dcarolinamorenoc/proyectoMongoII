const Usuario = require('../module/usuario');

const crearUsuario = async (req, res) => {
    let obj = new Usuario();
    const resultado = await obj.crearUsuario(req.body);
    res.status(200).json(resultado);
};

const crearTarjetaVIP = async (req, res) => {
    let obj = new Usuario();
    const resultado = await obj.crearTarjetaVIP(req.body);
    res.status(200).json(resultado);
};

const consultarUsuarioDetallado = async (req, res) => {
    let obj = new Usuario();
    const resultado = await obj.consultarUsuarioDetallado(req.body);
    res.status(200).json(resultado);
};

const actualizarRolUsuario = async (req, res) => {
    let obj = new Usuario();
    const resultado = await obj.actualizarRolUsuario(req.body);
    res.status(200).json(resultado);
};

const consultarUsuarios = async (req, res) => {
    let obj = new Usuario();
    const resultado = await obj.consultarUsuarios(req.query);
    res.send(resultado);
};

module.exports = {
    crearUsuario,
    crearTarjetaVIP,
    consultarUsuarioDetallado,
    actualizarRolUsuario,
    consultarUsuarios
};