const express = require('express');
const router = express.Router();
const { query, validationResult } = require('express-validator');
const { crearUsuario, crearTarjetaVIP, consultarUsuarioDetallado, actualizarRolUsuario, consultarUsuarios } = require("../controllers/usuarioControllers");


router.use(express.json());

router.post('/usuarios', crearUsuario);
router.post('/usuarios/tarjeta-vip', crearTarjetaVIP);
router.get('/usuarios/detalle', consultarUsuarioDetallado);
router.put('/usuarios/rol', actualizarRolUsuario);

router.get('/consultar-todos', [
    query('nickname').notEmpty(),
    query('identificacion').notEmpty(),
    query('rol').optional(),
    query('nombre').optional()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    await consultarUsuarios(req, res);
});

module.exports = router;