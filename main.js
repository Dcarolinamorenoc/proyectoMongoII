import { pelicula } from './js/modules/pelicula.js';


//--------------------------------------------------------------------------------------------------------


let objPelicula = new pelicula();

// Caso de uso 1: Selección de Películas (Diana Carolina Moreno Cárdenas)

// Listar todas las películas

// console.log(await objPelicula.listarPeliculas());

// Obtener detalles de una película específica por título

// console.log(await objPelicula.obtenerDetallesPelicula("Intensamente 2"));

// Obtener detalles de una película específica por ID

console.log(await objPelicula.obtenerDetallesPelicula(1));

objPelicula.destructor();