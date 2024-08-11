const express = require('express');
const peliculaRoutes = require('./router/pelicula.routes');
const boletoRoutes = require('./router/boleto.routes');
const app = express();


app.use(express.json());


app.use('/pelicula', peliculaRoutes);

app.use('/boleto', boletoRoutes);


const host = process.env.EXPRESS_HOST || 'localhost';
const port = parseInt(process.env.EXPRESS_PORT) || 3000;

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});