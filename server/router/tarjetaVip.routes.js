const express = require('express');
const { body, validationResult } = require('express-validator');
const TarjetaVip = require('../module/tarjetaVip');
const appTarjetaVip = express.Router();


appTarjetaVip.post('/comprar-vip', [
    body('id').notEmpty().isNumeric(),
    body('id_pelicula').notEmpty().isNumeric(),
    body('id_horario_proyeccion').notEmpty().isNumeric(),
    body('id_usuario').notEmpty().isNumeric(),
    body('asientos_comprados').isArray(),
    body('modo_compra').notEmpty().isString(),
    body('metodo_pago').notEmpty().isString(),
    body('id_reserva').optional().isNumeric()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let obj = new TarjetaVip();
    res.send(await obj.comprarBoletosVIP(req.body));
});


appTarjetaVip.post('/comprar-vip-verificacion', [
    body('id').notEmpty().isNumeric(),
    body('id_pelicula').notEmpty().isNumeric(),
    body('id_horario_proyeccion').notEmpty().isNumeric(),
    body('id_usuario').notEmpty().isNumeric(),
    body('asientos_comprados').isArray(),
    body('modo_compra').notEmpty().isString(),
    body('metodo_pago').notEmpty().isString(),
    body('id_reserva').optional().isNumeric()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let obj = new TarjetaVip();
    res.send(await obj.comprarBoletosVIPConVerificacionTarjeta(req.body));
});

module.exports = appTarjetaVip;