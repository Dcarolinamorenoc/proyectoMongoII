const express = require('express');
const { query, body, validationResult } = require('express-validator');
const Reserva = require('../module/reserva');
const appReserva = express.Router();


appReserva.post('/reservar', [
    body('id').notEmpty().isString(),
    body('id_pelicula').notEmpty().isString(),
    body('id_horario_proyeccion').notEmpty().isString(),
    body('id_usuario').notEmpty().isString(),
    body('asientos_reservados').isArray(),
    body('fecha_reserva').optional().isString(),
    body('estado').optional().isString(),
    body('fecha_expiracion').optional().isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let obj = new Reserva();
    res.send(await obj.reservarAsientos(req.body));
});


appReserva.put('/cancelar', [
    body('id').notEmpty().isString(),
    body('id_usuario').notEmpty().isString(),
    body('asientos_reservados').isArray()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let obj = new Reserva();
    res.send(await obj.cancelarReserva(req.body));
});

module.exports = appReserva;