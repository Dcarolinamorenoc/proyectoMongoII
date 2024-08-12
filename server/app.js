require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const peliculaRoutes = require('./router/pelicula.routes');
const boletoRoutes = require('./router/boleto.routes');
const reservaRoutes = require('./router/reserva.routes');
const tarjetaVipRoutes = require('./router/tarjetaVip.routes');
const usuarioRoutes = require('./router/usuario.routes');

const app = express();

app.use(express.static(process.env.EXPRESS_STATIC));

// Habilitar CORS para todas las rutas
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api/pelicula', peliculaRoutes);
app.use('/api/boleto', boletoRoutes);
app.use('/api/reserva', reservaRoutes);
app.use('/api/tarjeta-vip', tarjetaVipRoutes);
app.use('/api/usuario', usuarioRoutes);

app.get("/", function (req, res) {
    res.sendFile(`${process.env.EXPRESS_STATIC}/index.html`, { root: __dirname });
});


app.listen({
    host: process.env.EXPRESS_HOST, 
    port: parseInt(process.env.EXPRESS_PORT)
}, () => {
    
    console.log(`Servidor corriendo en: http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`);
});