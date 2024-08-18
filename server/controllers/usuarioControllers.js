const Usuario = require('../module/usuario');

const crearUsuario = async (req, res) => {
    console.log('Datos recibidos en crearUsuario:', req.body);
    try {
        let obj = new Usuario();
        const resultado = await obj.crearUsuario(req.body);
        obj.destructor();
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error en crearUsuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const crearTarjetaVIP = async (req, res) => {
    try {
        let obj = new Usuario();
        const resultado = await obj.crearTarjetaVIP(req.body);
        obj.destructor();
        if (resultado.error) {
            res.status(400).json({ error: resultado.error });
        } else {
            res.status(200).json(resultado);
        }
    } catch (error) {
        console.error('Error en crearTarjetaVIP:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const consultarUsuarioDetallado = async (req, res) => {
    let obj = new Usuario();
    const resultado = await obj.consultarUsuarioDetallado(req.body);
    obj.destructor();
    res.status(200).json(resultado);
};

const actualizarRolUsuario = async (req, res) => {
    let obj = new Usuario();
    const resultado = await obj.actualizarRolUsuario(req.body);
    obj.destructor();
    res.status(200).json(resultado);
};

const consultarUsuarios = async (req, res) => {
    let obj = new Usuario();
    const resultado = await obj.consultarUsuarios(req.query);
    obj.destructor();
    res.send(resultado);
};

module.exports = {
    crearUsuario,
    crearTarjetaVIP,
    consultarUsuarioDetallado,
    actualizarRolUsuario,
    consultarUsuarios
};