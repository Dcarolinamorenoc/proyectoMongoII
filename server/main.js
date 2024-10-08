import { pelicula } from'./module/pelicula.js';

import  { boleto}  from './module/boleto.js';

import  { reserva } from './module/reserva.js';

import  { TarjetaVip }  from './module/tarjetaVip.js';

import  { Usuario } from './module/usuario.js';





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

// Peliculas por estado:

// console.log(await objPelicula.obtenerPeliculasPorEstado({ estado: "En cartelera" }));

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
//     asientos_comprados: [3,4], 
//     modo_compra: "virtual",
//     metodo_pago: "tarjeta de crédito",
//     id_reserva: null
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
//     asientos_reservados: [31, 32],
// };

// console.log(await objReserva.reservarAsientos(datosReserva));

// ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗

// Cancelar parcialmente una reserva 

// const datosCancelacionParcial = {
//         id: 7,
//         id_pelicula: 1,
//         id_horario_proyeccion: 2,
//         id_usuario: 2,
//         asientos_reservados: [31, 32],
//     };

// console.log(await objReserva.cancelarReserva(datosCancelacionParcial));


// objReserva.destructor();



//--------------------------------------------------------------------------------------------------------

// let objTarjetaVip = new TarjetaVip();

//Caso de uso 4: Descuentos y Tarjetas VIP (Diana Carolina Moreno Cárdenas)

// Descuento en boletos para Usuarios VIP

// const datosBoletoVip = {
//     id: 20,
//     id_pelicula: 4,
//     id_horario_proyeccion: 12,
//     id_usuario: 4,
//     asientos_comprados: [276,277], 
//     modo_compra: "virtual",
//     metodo_pago: "efectivo",
//     id_reserva: null
// };

// console.log(await objTarjetaVip.comprarBoletosVIP(datosBoletoVip));


// ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗

// Verificación de la validez de una tarjeta VIP durante el proceso de compra

// const datosBoletoVip = {
//     id: 20,
//     id_pelicula: 1,
//     id_horario_proyeccion: 2,
//     id_usuario: 3,
//     asientos_comprados: [28,29], 
//     modo_compra: "virtual",
//     metodo_pago: "efectivo",
//     id_reserva: null
// };

// console.log(await objTarjetaVip.comprarBoletosVIPConVerificacionTarjeta(datosBoletoVip));


// objTarjetaVip.destructor();



//--------------------------------------------------------------------------------------------------------

// let objUsuario = new Usuario();

// Caso de uso 5: Roles Definidos (Diana Carolina Moreno Cárdenas)

// Crear un nuevo usuario

// const datosUsuarioEstandar = {
//     id: 61,
//     nombre_completo: "Marta Susana Gomez",
//     identificacion: "1097134756",
//     nickname: "martica",
//     celular: "3318226783",
//     email: "martica.go@email.com",
//     telefono: "6945389210",
//     rol: "VIP",
//     imagen_user: "https://i.pinimg.com/736x/f4/84/a0/f484a00c48c7013ee2dc56662697c262.jpg"

// };

// console.log(await objUsuario.crearUsuario(datosUsuarioEstandar));


// Si el Usuario nuevo es registrado con un rol VIP es necesario crear su tarjeta Vip

// const datosTarjetaVip = {
//     identificacion: "1097134756"
// };

// console.log(await objUsuario.crearTarjetaVIP(datosTarjetaVip));


// ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗

// Consultar información detallada sobre un usuario, incluyendo su rol y estado de tarjeta VIP.

// console.log(await objUsuario.consultarUsuarioDetallado({
//     admin_nickname: 'FelixCB',
//     admin_identificacion: '1098672134',
//     id: 2
// }));

// ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗


// Actualización del rol de un usuario 

// const datosActualizacion1 = {
//     id: 5,
//     nuevoRol: 'Estandar'
// };
// console.log(await objUsuario.actualizarRolUsuario(datosActualizacion1));


// ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗

// Permitir la consulta de todos los usuarios del sistema, con la posibilidad de filtrar por rol

// console.log(await objUsuario.consultarUsuarios({ 
//     nickname: 'FelixCB', 
//     identificacion: '1098672134', 
//     rol: 'VIP' 
// }));

// objUsuario.destructor();


//--------------------------------------------------------------------------------------------------------


// let objBoleto = new boleto();

// Caso de uso 6: Compras en Línea (Diana Carolina Moreno Cárdenas)

// Procesamiento de pagos en línea

// const datosPagoLinea = {
//     id: 28,
//     id_pelicula: 7,
//     id_horario_proyeccion: 20,
//     id_usuario: 5,
//     asientos_comprados: [107, 108], 
//     modo_compra: "virtual",
//     metodo_pago: "tarjeta_credito",
//     id_reserva: null
// };

// console.log(await objBoleto.pagosEnLinea(datosPagoLinea));



// ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗

// Confirmación de la compra y los detalles del boleto al usuario

// const detallesBoletoUser = {
//     id: 30,
//     id_pelicula: 1,
//     id_horario_proyeccion: 1,
//     id_usuario: 5,
//     asientos_comprados: [31], 
//     modo_compra: "virtual",
//     metodo_pago: "tarjeta_credito",
//     id_reserva: null
// };

// console.log(await objBoleto.confirmacionCompra(detallesBoletoUser));


// objBoleto.destructor();