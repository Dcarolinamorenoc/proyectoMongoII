import { pelicula } from './js/modules/pelicula.js';
import { boleto } from './js/modules/boleto.js';
import { reserva } from './js/modules/reserva.js';
import { TarjetaVip } from './js/modules/tarjetaVip.js';
import { Usuario } from './js/modules/usuario.js';




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



//--------------------------------------------------------------------------------------------------------

let objUsuario = new Usuario();

// Caso de uso 5: Roles Definidos (Diana Carolina Moreno Cárdenas)

// Crear un nuevo usuario

const datosUsuarioEstandar = {
    id: 22,
    nombre_completo: "Catalina del Carmen",
    identificacion: "109783432",
    nickname: "Cata",
    celular: "3131423905",
    email: "cata.carmen@email.com",
    telefono: "6019834543",
    rol: "Administrador"
};

const usuario = new Usuario();
const resultado = await usuario.crearUsuario(datosUsuarioEstandar);
console.log(resultado);



// Si el Usuario nuevo es registrado con un rol VIP es necesario crear su tarjeta Vip

// const datosTarjetaVip = {
//     identificacion: "109785312"
// };

// console.log(await objUsuario.crearTarjetaVIP(datosTarjetaVip));


// ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗

// Consultar información detallada sobre un usuario, incluyendo su rol y estado de tarjeta VIP.

// const datosConsulta = {
//     identificacion: "1087654321"

// };

// console.log(await objUsuario.consultarUsuarioDetallado(datosConsulta));

// ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗


// Actualización del rol de un usuario 

// const datosActualizacion1 = {
//     id: 20,
//     nuevoRol: 'Estandar'
// };
// console.log(await objUsuario.actualizarRolUsuario(datosActualizacion1));


// ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗⋅✧⋅∗ ──── ∗⋅✧⋅∗ ──── ∗⋅✧⋅∗

// Permitir la consulta de todos los usuarios del sistema, con la posibilidad de filtrar por rol

// console.log(await objUsuario.consultarUsuarios({ rol: 'VIP' }));


objUsuario.destructor();


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