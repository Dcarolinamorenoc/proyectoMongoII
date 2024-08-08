const express = require('express');
const app = express();
const peliculaRoutes = require("./server/router/pelicula.routes");
const usuarioRoutes = require("./server/router/usuario.routes");
require('dotenv').config();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(`${process.env.EXPRESS_STATIC}/index.html`, { root: __dirname });
});

app.use('/api', peliculaRoutes);
app.use('/api', usuarioRoutes);

app.listen({
    host: process.env.EXPRESS_HOST,
    port: parseInt(process.env.EXPRESS_PORT)
}, () => {
    console.log(`Servidor corriendo en: http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`);
});