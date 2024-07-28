import { pelicula } from './js/modules/pelicula.js';
import { boleto } from './js/modules/boleto.js';
import { reserva } from './js/modules/reserva.js';
import { TarjetaVip } from './js/modules/tarjetaVip.js';

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


// let objBoleto = new boleto();

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

// console.log(await objBoleto.consultarDisponibilidadAsientos(1));


// ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗

// objBoleto.destructor();



//--------------------------------------------------------------------------------------------------------


// let objReserva = new reserva();

//Caso de uso 3: Asignación de Asientos(Diana Carolina Moreno Cárdenas)


// Reservar asientos para una película

// const datosReserva = {
//     id: 7,
//     id_pelicula: 1,
//     id_horario_proyeccion: 2,
//     id_usuario: 2,
//     asientos_reservados: [60, 61],
// };

// console.log(await objReserva.reservarAsientos(datosReserva));

// ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗

// Cancelar parcialmente una reserva 

// const datosCancelacionParcial = {
//     id: 7,
//     id_pelicula: 1,
//     id_horario_proyeccion: 2,
//     id_usuario: 2,
//     asientos_reservados: [60],
// };

// console.log(await objReserva.cancelarReserva(datosCancelacionParcial));


// objReserva.destructor();



//--------------------------------------------------------------------------------------------------------

// let objTarjetaVip = new TarjetaVip();

//Caso de uso 4: Descuentos y Tarjetas VIP (Diana Carolina Moreno Cárdenas)

// Descuento en boletos para Usuarios VIP

// const datosBoletoVip = {
//     id: 20,
//     id_pelicula: 4,
//     id_horario_proyeccion: 11,
//     id_usuario: 4,
//     asientos_comprados: [107,108], 
//     modo_compra: "virtual",
//     metodo_pago: "efectivo",
//     id_reserva: null
// };

// console.log(await objTarjetaVip.comprarBoletosVIP(datosBoletoVip));


// ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗

// Verificación de la validez de una tarjeta VIP durante el proceso de compra

// const datosBoletoVip = {
//     id: 20,
//     id_pelicula: 6,
//     id_horario_proyeccion: 18,
//     id_usuario: 3,
//     asientos_comprados: [86,87], 
//     modo_compra: "virtual",
//     metodo_pago: "efectivo",
//     id_reserva: null
// };

// console.log(await objTarjetaVip.comprarBoletosVIPConVerificacionTarjeta(datosBoletoVip));


// objTarjetaVip.destructor();