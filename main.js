import { pelicula } from './js/modules/pelicula.js';
import { boleto } from './js/modules/boleto.js';

//--------------------------------------------------------------------------------------------------------


// let objPelicula = new pelicula();

// Caso de uso 1: Selección de Películas (Diana Carolina Moreno Cárdenas)


// Listar todas las películas

// console.log(await objPelicula.listarPeliculas());


// ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗


// Obtener detalles de una película específica por título

// console.log(await objPelicula.obtenerDetallesPelicula("Intensamente 2"));


// ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗


// Obtener detalles de una película específica por ID

// console.log(await objPelicula.obtenerDetallesPelicula(2));


// ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗

// objPelicula.destructor();



//--------------------------------------------------------------------------------------------------------


let objBoleto = new boleto();

//Caso de uso 2: Compra de Boletos (Diana Carolina Moreno Cárdenas)

// Comprar un boleto para una pelicula 

// const datosBoleto = {
//     id: 15,
//     id_pelicula: 1,
//     id_horario_proyeccion: 1,
//     id_usuario: 1,
//     asientos_comprados: [48,49], 
//     modo_compra: "virtual",
//     metodo_pago: "tarjeta de crédito",
//     id_reserva: 1
// };

// console.log(await objBoleto.comprarBoletos(datosBoleto));


// ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗


// Consultar disponibilidad de asientos en una sala específica

console.log(await objBoleto.consultarDisponibilidadAsientos(1));


// ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗

objBoleto.destructor();