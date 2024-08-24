const express = require('express');
const router = express.Router();
const { reservarAsientos, cancelarReserva } = require('../controllers/reservaController');

// Ruta para reservar asientos
router.post('/reservas', reservarAsientos);

// Ruta para cancelar o modificar una reserva
router.put('/reservas/cancelar', cancelarReserva);

module.exports = router;
