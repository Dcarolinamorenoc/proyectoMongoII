const express = require('express');
const peliculaRoutes = require('./router/pelicula.routes');
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Use the pelicula routes
app.use('/pelicula', peliculaRoutes);

const host = process.env.EXPRESS_HOST || 'localhost';
const port = parseInt(process.env.EXPRESS_PORT) || 3000;

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});