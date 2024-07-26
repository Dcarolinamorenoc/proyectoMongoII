import { pelicula } from './js/modules/pelicula.js';


//--------------------------------------------------------------------------------------------------------


let objPelicula = new pelicula();

// Caso de uso 1: Selección de Películas (Diana Carolina Moreno Cárdenas)

// Listar todas las películas

console.log(await objPelicula.listarPeliculas());



objPelicula.destructor();