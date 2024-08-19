const express = require('express');
const router = express.Router();
const {
    listarBoletos,
    obtenerDetalleBoleto,
    comprarBoletos,
    consultarDisponibilidadAsientos,
    pagosEnLinea,
    confirmacionCompra,
    obtenerInfoPeliculaCompleta
} = require("../controllers/boletoControllers");

router.get('/boletos', listarBoletos);
router.get('/boletos/:id', obtenerDetalleBoleto);
router.post('/boletos/comprar', comprarBoletos);
router.get('/boletos/disponibilidad/:idHorarioProyeccion', consultarDisponibilidadAsientos);
router.post('/boletos/pago-en-linea', pagosEnLinea);
router.post('/boletos/confirmacion-compra', confirmacionCompra);
router.get('/peliculas/:idPelicula/info-completa', obtenerInfoPeliculaCompleta);

module.exports = router;