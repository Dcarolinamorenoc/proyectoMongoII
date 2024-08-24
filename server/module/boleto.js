const connect = require ("../helpers/connect.js")
const { ObjectId } = require ("mongodb")

module.exports = class boleto extends connect {

  static instanceBoleto;
  db;
  collection;

  constructor() {
    if (boleto.instanceBoleto) {
      return boleto.instanceBoleto;
    }
    super();
    this.db = this.conexion.db(process.env.MONGO_DB);
    this.collection = this.db.collection('boleto');
    boleto.instanceBoleto = this;
  }

  destructor() {
    boleto.instanceBoleto = undefined;
    connect.instanceConnect = undefined;
  }


//--------------------------------------------------------------------------------------------------------


    /**
     * Realiza la compra de boletos para una película.
     *
     * @async
     * @param {Object} datosBoleto - Datos del boleto a comprar.
     * @param {number} datosBoleto.id - ID único del boleto.
     * @param {number} datosBoleto.id_pelicula - ID de la película.
     * @param {number} datosBoleto.id_horario_proyeccion - ID del horario de proyección.
     * @param {number} datosBoleto.id_usuario - ID del usuario que realiza la compra.
     * @param {Array<number>} datosBoleto.asientos_comprados - Array de IDs de los asientos comprados.
     * @param {string} datosBoleto.modo_compra - Modo de compra (ej. "virtual", "presencial").
     * @param {string} datosBoleto.metodo_pago - Método de pago utilizado.
     * @param {number|null} datosBoleto.id_reserva - ID de la reserva (si aplica), puede ser null.
     * @returns {Promise<Object>} Objeto con el resultado de la operación.
     * @property {string} [mensaje] - Mensaje de éxito si la compra se realiza correctamente.
     * @property {Object} [detallesBoleto] - Detalles del boleto comprado si la operación es exitosa.
     * @property {number} detallesBoleto.id - ID del boleto.
     * @property {number} detallesBoleto.id_pelicula - ID de la película.
     * @property {number} detallesBoleto.id_horario_proyeccion - ID del horario de proyección.
     * @property {number} detallesBoleto.id_usuario - ID del usuario.
     * @property {Array<number>} detallesBoleto.asientos_comprados - IDs de los asientos comprados.
     * @property {string} detallesBoleto.modo_compra - Modo de compra.
     * @property {string} detallesBoleto.metodo_pago - Método de pago.
     * @property {number} detallesBoleto.total - Monto total de la compra.
     * @property {string} detallesBoleto.fecha_compra - Fecha de la compra.
     * @property {string} detallesBoleto.estado_compra - Estado de la compra.
     * @property {number} [detallesBoleto.id_reserva] - ID de la reserva (si aplica).
     * @property {string} [error] - Mensaje de error si la compra falla.
     * @throws {Error} Si ocurre algún error durante el proceso de compra.
     */


    // Compra de boletos para una película específica

    async comprarBoletos(datosBoleto) {

        try {
            await this.conexion.connect();
    
            
            const boletoExistente = await this.collection.findOne({ id: datosBoleto.id });
            if (boletoExistente) {
                throw new Error('El ID del boleto ya existe.');
            }
    
            
            const pelicula = await this.db.collection('pelicula').findOne({ 
                id: datosBoleto.id_pelicula, 
                estado: { $in: ["En cartelera", "Próximo estreno"] } 
            });
            if (!pelicula) {
                throw new Error('La película no existe o no está disponible para compra de boletos.');
            }
    
            
            const horarioProyeccion = await this.db.collection('horario_proyeccion').findOne({ 
                id: datosBoleto.id_horario_proyeccion, 
                id_pelicula: datosBoleto.id_pelicula 
            });
            if (!horarioProyeccion) {
                throw new Error('El horario de proyección no es válido para esta película.');
            }
    
            
            const usuario = await this.db.collection('usuario').findOne({ id: datosBoleto.id_usuario });
            if (!usuario) {
                throw new Error('El usuario especificado no existe.');
            }
    
            
            const sala = await this.db.collection('sala').findOne({ id: horarioProyeccion.id_sala });
            if (!sala) {
                throw new Error('No se encontró la sala asociada a este horario de proyección.');
            }
    
            
            const asientosValidos = datosBoleto.asientos_comprados.every(asientoId => sala.asientos.includes(asientoId));
            if (!asientosValidos) {
                throw new Error('Uno o más asientos seleccionados no pertenecen a la sala de esta proyección.');
            }
    
            
            const asientosDisponibles = await this.db.collection('asiento').countDocuments({ 
                id: { $in: datosBoleto.asientos_comprados }, 
                estado: 'disponible' 
            });
            if (asientosDisponibles !== datosBoleto.asientos_comprados.length) {
                throw new Error('Uno o más asientos seleccionados no están disponibles.');
            }
    
            
            if (datosBoleto.id_reserva !== null) {
                const reserva = await this.db.collection('reserva').findOne({ id: datosBoleto.id_reserva });
                if (!reserva) {
                    throw new Error('La reserva especificada no existe.');
                }
            }
    
            
            let descuento = 0;
            let mensajeVIP = '';
            if (usuario.rol === 'VIP') {
                const tarjetaVIP = await this.db.collection('tarjeta_vip').findOne({ 
                    id_usuario: usuario.id, 
                    estado: 'activa' 
                });
                if (tarjetaVIP) {
                    descuento = tarjetaVIP.porcentaje_descuento;
                } else {
                    mensajeVIP = 'Usuario VIP sin tarjeta activa. No se aplicó descuento.';
                }
            }
    
            
            const precioBase = horarioProyeccion.precio_pelicula * datosBoleto.asientos_comprados.length;
            const total = precioBase - (precioBase * (descuento / 100));
    
            
            const nuevoBoleto = {
                ...datosBoleto,
                total: total,
                descuento_aplicado: descuento,
                fecha_compra: new Date().toLocaleDateString('es-ES'),
                estado_compra: 'completada'
            };
    
            
            await this.collection.insertOne(nuevoBoleto);
    
            
            await this.db.collection('asiento').updateMany(
                { id: { $in: datosBoleto.asientos_comprados } },
                { $set: { estado: 'ocupado' } }
            );
    
            await this.conexion.close();
            
            let mensajeRespuesta = 'Compra realizada con éxito';
            if (mensajeVIP) {
                mensajeRespuesta += `. ${mensajeVIP}`;
            }
            
            return { 
                mensaje: mensajeRespuesta, 
                detallesBoleto: nuevoBoleto 
            };
        } catch (error) {
            await this.conexion.close();
            return { error: `Error al realizar la compra: ${error.message}` };
        }
    }



//--------------------------------------------------------------------------------------------------------

    /**
     * Consulta la disponibilidad de asientos en una sala específica para un horario de proyección.
     *
     * @async
     * @param {number} idHorarioProyeccion - ID del horario de proyección.
     * @returns {Promise<Object>} Objeto con la información de disponibilidad de asientos.
     * @property {number} idHorarioProyeccion - ID del horario de proyección.
     * @property {string} fechaProyeccion - Fecha de la proyección.
     * @property {string} horarioProyeccion - Horario de la proyección.
     * @property {number} idSala - ID de la sala.
     * @property {string} nombreSala - Nombre de la sala.
     * @property {number} capacidadTotal - Capacidad total de la sala.
     * @property {number} asientosDisponibles - Número de asientos disponibles.
     * @property {Array<Object>} asientos - Lista de asientos disponibles.
     * @property {number} asientos[].id - ID del asiento.
     * @property {string} asientos[].nombre - Nombre del asiento.
     * @property {string} asientos[].fila - Fila del asiento.
     * @property {number} asientos[].numero - Número del asiento.
     * @property {string} asientos[].tipo - Tipo del asiento.
     * @property {string} asientos[].estado - Estado del asiento.
     * @property {Object} [error] - Objeto de error en caso de fallo.
     * @property {string} error.message - Mensaje de error.
     * @throws {Error} Si ocurre algún error durante el proceso de consulta.
     */




    async consultarDisponibilidadAsientos(idHorarioProyeccion) {
        try {
            await this.conexion.connect();
            

            const idHorarioProyeccionNum = parseInt(idHorarioProyeccion);
            
            // Buscar por id numérico
            const horarioProyeccion = await this.db.collection('horario_proyeccion').findOne({ id: idHorarioProyeccionNum });
            if (!horarioProyeccion) {
                throw new Error('Horario de proyección no encontrado.');
            }
            
            const sala = await this.db.collection('sala').findOne({ id: horarioProyeccion.id_sala });
            if (!sala) {
                throw new Error('Sala no encontrada.');
            }
            
            const boletosVendidos = await this.collection.find({ id_horario_proyeccion: idHorarioProyeccionNum }).toArray();
            const asientosOcupados = boletosVendidos.flatMap(boleto => boleto.asientos_comprados);
            
            const asientosDisponibles = await this.db.collection('asiento').find(
                { 
                    id: { $in: sala.asientos, $nin: asientosOcupados },
                    estado: 'disponible'
                }
            ).toArray();
            
            const asientosDisponibilidad = asientosDisponibles.map(asiento => ({
                id: asiento.id,
                nombre: asiento.nombre_general,
                fila: asiento.fila,
                numero: asiento.numero,
                tipo: asiento.tipo,
                estado: asiento.estado
            }));
            
            await this.conexion.close();
    
            return {
                idHorarioProyeccion: horarioProyeccion.id,
                fechaProyeccion: horarioProyeccion.fecha_proyeccion,
                horarioProyeccion: horarioProyeccion.horario_proyeccion,
                idSala: sala.id,
                nombreSala: sala.nombre,
                capacidadTotal: sala.capacidad,
                asientosDisponibles: asientosDisponibilidad.length,
                asientos: asientosDisponibilidad
            };
    
        } catch (error) {
            await this.conexion.close();
            throw error; 
        }
    }

//--------------------------------------------------------------------------------------------------------

    /**
     * Procesa un pago en línea para la compra de boletos de cine.
     *
     * @async
     * @param {Object} datosPagoLinea - Datos del pago en línea.
     * @param {string} datosPagoLinea.id - ID del boleto.
     * @param {string} datosPagoLinea.id_pelicula - ID de la película.
     * @param {string} datosPagoLinea.id_horario_proyeccion - ID del horario de proyección.
     * @param {string} datosPagoLinea.id_usuario - ID del usuario.
     * @param {Array<string>} datosPagoLinea.asientos_comprados - Lista de IDs de asientos comprados.
     * @param {string|null} datosPagoLinea.id_reserva - ID de la reserva (si aplica).
     * @param {string} datosPagoLinea.modo_compra - Modo de compra ('virtual' o 'presencial').
     * @returns {Promise<Object>} Objeto con el resultado de la operación de pago.
     * @property {string} mensaje - Mensaje de confirmación de la compra.
     * @property {string} mensajeDescuento - Mensaje sobre el descuento aplicado.
     * @property {string} mensajeModoCompra - Mensaje sobre el modo de compra.
     * @property {Object} detallesBoleto - Detalles del boleto comprado.
     * @property {number} detallesBoleto.total - Total pagado.
     * @property {number} detallesBoleto.descuento_aplicado - Porcentaje de descuento aplicado.
     * @property {string} detallesBoleto.fecha_compra - Fecha de la compra.
     * @property {string} detallesBoleto.estado_compra - Estado de la compra.
     * @property {Object} [error] - Objeto de error en caso de fallo.
     * @property {string} error.message - Mensaje de error.
     * @throws {Error} Si ocurre algún error durante el proceso de pago.
     */

    // Procesamiento de pagos en línea

    async pagosEnLinea(datosPagoLinea) {
        try {
            await this.conexion.connect();

            
            const boletoExistente = await this.collection.findOne({ id: datosPagoLinea.id });
            if (boletoExistente) {
                throw new Error('El ID del boleto ya existe.');
            }

            
            const pelicula = await this.db.collection('pelicula').findOne({ 
                id: datosPagoLinea.id_pelicula, 
                estado: { $in: ["En cartelera", "Próximo estreno"] } 
            });
            if (!pelicula) {
                throw new Error('La película no existe o no está disponible para compra de boletos.');
            }

            
            const horarioProyeccion = await this.db.collection('horario_proyeccion').findOne({ 
                id: datosPagoLinea.id_horario_proyeccion, 
                id_pelicula: datosPagoLinea.id_pelicula 
            });
            if (!horarioProyeccion) {
                throw new Error('El horario de proyección no es válido para esta película.');
            }

            
            const usuario = await this.db.collection('usuario').findOne({ id: datosPagoLinea.id_usuario });
            if (!usuario) {
                throw new Error('El usuario especificado no existe.');
            }

            
            const sala = await this.db.collection('sala').findOne({ id: horarioProyeccion.id_sala });
            if (!sala) {
                throw new Error('No se encontró la sala asociada a este horario de proyección.');
            }

            
            const asientosValidos = datosPagoLinea.asientos_comprados.every(asientoId => sala.asientos.includes(asientoId));
            if (!asientosValidos) {
                throw new Error('Uno o más asientos seleccionados no pertenecen a la sala de esta proyección.');
            }

            
            const asientosDisponibles = await this.db.collection('asiento').countDocuments({ 
                id: { $in: datosPagoLinea.asientos_comprados }, 
                estado: 'disponible' 
            });
            if (asientosDisponibles !== datosPagoLinea.asientos_comprados.length) {
                throw new Error('Uno o más asientos seleccionados no están disponibles.');
            }

            
            if (datosPagoLinea.id_reserva !== null) {
                const reserva = await this.db.collection('reserva').findOne({ id: datosPagoLinea.id_reserva });
                if (!reserva) {
                    throw new Error('La reserva especificada no existe.');
                }
            }

            
            let descuento = 0;
            let mensajeDescuento = '';
            if (usuario.rol === 'VIP') {
                const tarjetaVIP = await this.db.collection('tarjeta_vip').findOne({ 
                    id_usuario: usuario.id
                });
                if (tarjetaVIP) {
                    if (tarjetaVIP.estado === 'activa') {
                        descuento = tarjetaVIP.porcentaje_descuento;
                        mensajeDescuento = `Querido usuario VIP tu tarjeta esta (${tarjetaVIP.estado}) y por eso te hemos otorgado un descuento de: ${descuento}%`;
                    } else {
                        mensajeDescuento = `Lo sentimos mucho querido usuario VIP pero tu tarjeta esta (${tarjetaVIP.estado}) por eso no hemos podido realizarte un descuento, te invitamos a que vuelvas a activar tu tarjeta`;
                    }
                } else {
                    mensajeDescuento = 'Eres un cliente VIP, pero no tienes una tarjeta registrada. No se aplicó descuento.';
                }
            } else if (usuario.rol === 'Estandar') {
                mensajeDescuento = 'No se aplicó descuento por no ser usuario VIP. Puedes adquirir una tarjeta VIP para obtener descuentos en futuras compras.';
            }

            
            const precioBase = horarioProyeccion.precio_pelicula * datosPagoLinea.asientos_comprados.length;
            const total = precioBase - (precioBase * (descuento / 100));

            
            const nuevoBoleto = {
                ...datosPagoLinea,
                total: total,
                descuento_aplicado: descuento,
                fecha_compra: new Date().toLocaleDateString('es-ES'),
                estado_compra: 'completada'
            };

            
            await this.collection.insertOne(nuevoBoleto);

            
            await this.db.collection('asiento').updateMany(
                { id: { $in: datosPagoLinea.asientos_comprados } },
                { $set: { estado: 'ocupado' } }
            );

            await this.conexion.close();
            
            let mensajeRespuesta = 'Compra realizada con éxito.';
            let mensajeModoCompra = datosPagoLinea.modo_compra === 'virtual' 
                ? 'Su compra virtual se ha realizado satisfactoriamente.'
                : 'Su compra presencial se ha realizado satisfactoriamente.';
            
            return { 
                mensaje: mensajeRespuesta,
                mensajeDescuento: mensajeDescuento,
                mensajeModoCompra: mensajeModoCompra,
                detallesBoleto: nuevoBoleto 
            };
        } catch (error) {
            await this.conexion.close();
            return { error: `Error al realizar la compra: ${error.message}` };
        }
    }


//--------------------------------------------------------------------------------------------------------

        /**
     * Procesa y confirma la compra de boletos de cine.
     *
     * @async
     * @param {Object} detallesBoletoUser - Detalles del boleto proporcionados por el usuario.
     * @param {string} detallesBoletoUser.id - ID del boleto.
     * @param {string} detallesBoletoUser.id_pelicula - ID de la película.
     * @param {string} detallesBoletoUser.id_horario_proyeccion - ID del horario de proyección.
     * @param {string} detallesBoletoUser.id_usuario - ID del usuario.
     * @param {Array<string>} detallesBoletoUser.asientos_comprados - Lista de IDs de asientos comprados.
     * @param {string|null} detallesBoletoUser.id_reserva - ID de la reserva (si aplica).
     * @param {string} detallesBoletoUser.modo_compra - Modo de compra ('virtual' o 'presencial').
     * @returns {Promise<Object>} Objeto con el resultado de la operación de compra.
     * @property {string} mensaje - Mensaje de confirmación de la compra.
     * @property {string} mensajeConfirmacion - Mensaje adicional de confirmación.
     * @property {string} mensajeDescuento - Mensaje sobre el descuento aplicado.
     * @property {string} mensajeModoCompra - Mensaje sobre el modo de compra.
     * @property {Object} detallesBoleto - Detalles del boleto comprado.
     * @property {number} detallesBoleto.total - Total pagado.
     * @property {number} detallesBoleto.descuento_aplicado - Porcentaje de descuento aplicado.
     * @property {string} detallesBoleto.fecha_compra - Fecha de la compra.
     * @property {string} detallesBoleto.estado_compra - Estado de la compra.
     * @property {Object} [error] - Objeto de error en caso de fallo.
     * @property {string} error.message - Mensaje de error.
     * @throws {Error} Si ocurre algún error durante el proceso de compra.
     */

    // Confirmación de la compra y los detalles del boleto al usuario


    async confirmacionCompra(detallesBoletoUser) {
        try {
          await this.conexion.connect();
      
          const boletoExistente = await this.collection.findOne({ id: parseInt(detallesBoletoUser.id, 10) });
          if (boletoExistente) {
            throw new Error('El ID del boleto ya existe.');
          }
      
          const pelicula = await this.db.collection('pelicula').findOne({
            id: parseInt(detallesBoletoUser.id_pelicula, 10),
            estado: { $in: ["En cartelera", "Próximo estreno"] }
          });
          if (!pelicula) {
            throw new Error('La película no existe o no está disponible para compra de boletos.');
          }
      
          const horarioProyeccion = await this.db.collection('horario_proyeccion').findOne({
            id: parseInt(detallesBoletoUser.id_horario_proyeccion, 10),
            id_pelicula: parseInt(detallesBoletoUser.id_pelicula, 10)
          });
          if (!horarioProyeccion) {
            throw new Error('El horario de proyección no es válido para esta película.');
          }
      
          const usuario = await this.db.collection('usuario').findOne({ id: parseInt(detallesBoletoUser.id_usuario, 10) });
          if (!usuario) {
            throw new Error('El usuario especificado no existe.');
          }
      
          const sala = await this.db.collection('sala').findOne({ id: parseInt(horarioProyeccion.id_sala, 10) });
          if (!sala) {
            throw new Error('No se encontró la sala asociada a este horario de proyección.');
          }
      
          const asientosValidos = detallesBoletoUser.asientos_comprados.every(asientoId => 
            sala.asientos.includes(parseInt(asientoId, 10))
          );
          if (!asientosValidos) {
            throw new Error('Uno o más asientos seleccionados no pertenecen a la sala de esta proyección.');
          }
      
          const asientosDisponibles = await this.db.collection('asiento').countDocuments({
            id: { $in: detallesBoletoUser.asientos_comprados.map(id => parseInt(id, 10)) },
            estado: 'disponible'
          });
          if (asientosDisponibles !== detallesBoletoUser.asientos_comprados.length) {
            throw new Error('Uno o más asientos seleccionados no están disponibles.');
          }
      
          const asiento = await this.db.collection('asiento').findOne({
            id: parseInt(detallesBoletoUser.asientos_comprados[0], 10)
          });
          const precioAsiento = asiento.Precio;
      
          let descuento = 0;
          let mensajeDescuento = '';
          if (usuario.rol === 'VIP') {
            const tarjetaVIP = await this.db.collection('tarjeta_vip').findOne({
              id_usuario: parseInt(usuario.id, 10)
            });
            if (tarjetaVIP) {
              if (tarjetaVIP.estado === 'activa') {
                descuento = tarjetaVIP.porcentaje_descuento;
                mensajeDescuento = `Querido usuario VIP tu tarjeta esta (${tarjetaVIP.estado}) y por eso te hemos otorgado un descuento de: ${descuento}%`;
              } else {
                mensajeDescuento = `Lo sentimos mucho querido usuario VIP pero tu tarjeta esta (${tarjetaVIP.estado}) por eso no hemos podido realizarte un descuento, te invitamos a que vuelvas a activar tu tarjeta`;
              }
            } else {
              mensajeDescuento = 'Eres un cliente VIP, pero no tienes una tarjeta registrada. No se aplicó descuento.';
            }
          } else if (usuario.rol === 'Estandar') {
            mensajeDescuento = 'No se aplicó descuento por no ser usuario VIP. Puedes adquirir una tarjeta VIP para obtener descuentos en futuras compras.';
          }
      
          const precioBase = (horarioProyeccion.precio_pelicula + precioAsiento) * detallesBoletoUser.asientos_comprados.length;
          const total = precioBase - (precioBase * (descuento / 100));
      
          const nuevoBoleto = {
            ...detallesBoletoUser,
            total: total,
            descuento_aplicado: descuento,
            fecha_compra: new Date().toLocaleDateString('es-ES'),
            estado_compra: 'completada'
          };
      
          await this.collection.insertOne(nuevoBoleto);
      
          await this.db.collection('asiento').updateMany(
            { id: { $in: detallesBoletoUser.asientos_comprados.map(id => parseInt(id, 10)) } },
            { $set: { estado: 'ocupado' } }
          );
      
          await this.conexion.close();
      
          let mensajeRespuesta = 'Compra realizada con éxito.';
          let mensajeModoCompra = detallesBoletoUser.modo_compra === 'virtual'
            ? 'Su compra virtual se ha realizado satisfactoriamente.'
            : 'Su compra presencial se ha realizado satisfactoriamente.';
          let mensajeConfirmacion = 'Su compra ha sido confirmada. Gracias por su preferencia.';
      
          return {
            mensaje: mensajeRespuesta,
            mensajeConfirmacion: mensajeConfirmacion,
            mensajeDescuento: mensajeDescuento,
            mensajeModoCompra: mensajeModoCompra,
            detallesBoleto: nuevoBoleto
          };
        } catch (error) {
          await this.conexion.close();
          return { error: `Error al realizar la compra: ${error.message}` };
        }
      }

      async obtenerInfoPeliculaCompleta(idPelicula) {
        try {
            await this.conexion.connect();
    
            const idPeliculaNum = parseInt(idPelicula);
            const pelicula = await this.db.collection('pelicula').findOne({ id: idPeliculaNum });
            if (!pelicula) {
                throw new Error('Película no encontrada.');
            }
    
            const horariosProyeccion = await this.db.collection('horario_proyeccion')
                .find({ id_pelicula: idPeliculaNum }).toArray();
    
            const infoCompleta = await Promise.all(horariosProyeccion.map(async (horario) => {
                const sala = await this.db.collection('sala').findOne({ id: horario.id_sala });
                if (!sala) {
                    throw new Error(`Sala no encontrada para el horario ${horario.id}.`);
                }
    
                const asientos = await this.db.collection('asiento')
                    .find({ id: { $in: sala.asientos } }).toArray();
    
                const boletosVendidos = await this.db.collection('boletos')
                    .find({ id_horario_proyeccion: horario.id }).toArray();
                const asientosOcupados = boletosVendidos.flatMap(boleto => boleto.asientos_comprados);
    
                const asientosConEstado = asientos.map(asiento => {
                    if (asiento.estado === 'reservado') {
                        // Si el asiento ya está reservado, mantenemos ese estado.
                        return asiento;
                    } else if (asientosOcupados.includes(asiento.id)) {
                        // Si no está reservado pero está en la lista de ocupados, lo marcamos como "ocupado".
                        return {
                            ...asiento,
                            estado: 'ocupado'
                        };
                    }
                    // Si no está ni ocupado ni reservado, se deja su estado como está (normalmente "disponible").
                    return asiento;
                });
    
                return {
                    horario: {
                        id: horario.id,
                        fecha_proyeccion: horario.fecha_proyeccion,
                        horario_proyeccion: horario.horario_proyeccion,
                        hora_finalizacion: horario.hora_finalizacion,
                        precio_pelicula: horario.precio_pelicula
                    },
                    sala: {
                        id: sala.id,
                        nombre: sala.nombre,
                        tipo: sala.tipo,
                        descripcion: sala.descripcion,
                        capacidad: sala.capacidad
                    },
                    asientos: asientosConEstado
                };
            }));
    
            await this.conexion.close();
    
            return {
                pelicula: {
                    id: pelicula.id,
                    titulo: pelicula.titulo,
                    sinopsis: pelicula.sinopsis,
                    fecha_estreno: pelicula.fecha_estreno,
                    genero: pelicula.genero,
                    duracion: pelicula.duracion,
                    estado: pelicula.estado,
                    pais_origen: pelicula.pais_origen,
                    imagen_pelicula: pelicula.imagen_pelicula,
                    imagen_banner: pelicula.imagen_banner,
                    reparto: pelicula.reparto,
                    trailer: pelicula.trailer
                },
                proyecciones: infoCompleta
            };
    
        } catch (error) {
            await this.conexion.close();
            throw error;
        }
    }


    async obtenerBoletosUsuario(idUsuario) {
        try {
            await this.conexion.connect();
    
            const boletos = await this.collection.find({ id_usuario: parseInt(idUsuario) }).toArray();
    
            if (boletos.length === 0) {
                return { mensaje: "El usuario no tiene boletos registrados." };
            }
    
            const boletosConDetalles = await Promise.all(boletos.map(async (boleto) => {
                const pelicula = await this.db.collection('pelicula').findOne({ id: boleto.id_pelicula });
                const horarioProyeccion = await this.db.collection('horario_proyeccion').findOne({ id: boleto.id_horario_proyeccion });
    
                return {
                    id_boleto: boleto.id,
                    pelicula: {
                        titulo: pelicula.titulo,
                        imagen_pelicula: pelicula.imagen_pelicula
                    },
                    fecha_compra: boleto.fecha_compra,
                    asientos_comprados: boleto.asientos_comprados,
                    fecha_proyeccion: horarioProyeccion.fecha_proyeccion,
                    horario_proyeccion: horarioProyeccion.horario_proyeccion,
                    total: boleto.total,
                    estado_compra: boleto.estado_compra
                };
            }));
    
            await this.conexion.close();
    
            return boletosConDetalles;
        } catch (error) {
            await this.conexion.close();
            throw new Error(`Error al obtener los boletos del usuario: ${error.message}`);
        }
    }
    
}