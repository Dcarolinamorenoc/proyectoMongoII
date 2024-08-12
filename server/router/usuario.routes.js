const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Usuario = require('../module/usuario');
const appUsuario = express.Router();


appUsuario.post('/crear', [
    body('id').isNumeric(),
    body('nombre_completo').notEmpty(),
    body('nickname').notEmpty(),
    body('email').isEmail(),
    body('celular').notEmpty(),
    body('identificacion').notEmpty(),
    body('telefono').optional(),
    body('rol').isIn(['VIP', 'Estandar', 'Administrador'])
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let obj = new Usuario();
    res.send(await obj.crearUsuario(req.body));
});


appUsuario.post('/crear-tarjeta-vip', [
    body('id_usuario').optional().isNumeric(),
    body('nickname').optional(),
    body('identificacion').optional()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let obj = new Usuario();
    res.send(await obj.crearTarjetaVIP(req.body));
});

appUsuario.get('/consultar', [
    query('admin_nickname').notEmpty(),
    query('admin_identificacion').notEmpty(),
    query('id').optional().isNumeric(),
    query('identificacion').optional(),
    query('nickname').optional(),
    query('nombre_completo').optional()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let obj = new Usuario();
    res.send(await obj.consultarUsuarioDetallado(req.query));
});


appUsuario.put('/actualizar-rol', [
    body('id').isNumeric(),
    body('nuevoRol').isIn(['VIP', 'Estandar'])
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let obj = new Usuario();
    res.send(await obj.actualizarRolUsuario(req.body));
});


appUsuario.get('/consultar-todos', [
    query('nickname').notEmpty(),
    query('identificacion').notEmpty(),
    query('rol').optional(),
    query('nombre').optional()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let obj = new Usuario();
    res.send(await obj.consultarUsuarios(req.query));
});



module.exports = appUsuario;