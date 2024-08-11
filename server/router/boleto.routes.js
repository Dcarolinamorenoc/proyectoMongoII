const express = require('express');
const { query, body, validationResult } = require('express-validator');
const Boleto = require('../module/boleto');
const appBoleto = express.Router();


appBoleto.get('/disponibilidad', [
    query('idHorarioProyeccion').notEmpty().isNumeric()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let obj = new Boleto();
    res.send(await obj.consultarDisponibilidadAsientos(parseInt(req.query.idHorarioProyeccion)));
});


appBoleto.post('/comprar', [
    body('id').notEmpty().isNumeric(),
    body('id_pelicula').notEmpty().isNumeric(),
    body('id_horario_proyeccion').notEmpty().isNumeric(),
    body('id_usuario').notEmpty().isNumeric(),
    body('asientos_comprados').isArray(),
    body('modo_compra').notEmpty().isIn(['virtual', 'presencial']),
    body('metodo_pago').notEmpty(),
    body('id_reserva').optional().isNumeric()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let obj = new Boleto();
    res.send(await obj.comprarBoletos(req.body));
});


appBoleto.post('/pago-online', [
    body('id').notEmpty().isNumeric(),
    body('id_pelicula').notEmpty().isNumeric(),
    body('id_horario_proyeccion').notEmpty().isNumeric(),
    body('id_usuario').notEmpty().isNumeric(),
    body('asientos_comprados').isArray(),
    body('modo_compra').notEmpty().isIn(['virtual', 'presencial']),
    body('id_reserva').optional().isNumeric()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let obj = new Boleto();
    res.send(await obj.pagosEnLinea(req.body));
});


appBoleto.post('/confirmar', [
    body('id').notEmpty().isNumeric(),
    body('id_pelicula').notEmpty().isNumeric(),
    body('id_horario_proyeccion').notEmpty().isNumeric(),
    body('id_usuario').notEmpty().isNumeric(),
    body('asientos_comprados').isArray(),
    body('modo_compra').notEmpty().isIn(['virtual', 'presencial']),
    body('id_reserva').optional().isNumeric()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let obj = new Boleto();
    res.send(await obj.confirmacionCompra(req.body));
});

module.exports = appBoleto;