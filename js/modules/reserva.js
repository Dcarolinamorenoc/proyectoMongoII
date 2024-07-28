import { connect } from "../../helpers/db/connect.js";

export class reserva extends connect {
    static instanceReserva;
    db;
    collection;
  
    constructor() {
      if (reserva.instanceReserva) {
        return reserva.instanceReserva;
      }
      super();
      this.db = this.conexion.db(this.getDbName);
      this.collection = this.db.collection('reserva');
      reserva.instanceReserva = this;
    }
  
    destructor() {
      reserva.instanceReserva = undefined;
      connect.instanceConnect = undefined;
    }
  

//--------------------------------------------------------------------------------------------------------

// Reservar asientos para una película

  /**
   * Obtiene la fecha actual en formato DD/MM/YYYY.
   * 
   * @returns {string} Fecha actual formateada.
   */

    getFechaActual() {
      const fecha = new Date();
      return `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`;
    }

  /**
   * Calcula la fecha de expiración (3 días a partir de la fecha actual) en formato DD/MM/YYYY.
   * 
   * @returns {string} Fecha de expiración.
   */

    getFechaExpiracion() {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() + 3);
      return `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`;
    }
  
  /**
   * Realiza una reserva de asientos para una película en un horario específico.
   * 
   * @async
   * @param {Object} datosReserva - Datos de la reserva a realizar.
   * @param {string} datosReserva.id - ID único de la reserva.
   * @param {string} datosReserva.id_pelicula - ID de la película.
   * @param {string} datosReserva.id_horario_proyeccion - ID del horario de proyección.
   * @param {string} datosReserva.id_usuario - ID del usuario que realiza la reserva.
   * @param {Array<string>} datosReserva.asientos_reservados - Lista de IDs de asientos a reservar.
   * @param {string} [datosReserva.fecha_reserva] - Fecha de la reserva (opcional).
   * @param {string} [datosReserva.estado] - Estado de la reserva (opcional).
   * @param {string} [datosReserva.fecha_expiracion] - Fecha de expiración de la reserva (opcional).
   * @returns {Promise<Object>} Objeto con el resultado de la operación.
   * @property {string} mensaje - Mensaje de éxito si la reserva se realiza correctamente.
   * @property {Object} detallesReserva - Detalles de la reserva creada.
   * @property {Object} [error] - Objeto de error en caso de fallo.
   * @property {string} error.error - Mensaje de error detallado.
   * @throws {Error} Si ocurre algún error durante el proceso de reserva.
   */

    async reservarAsientos(datosReserva) {

      try {
        await this.conexion.connect();
  
        
        const reservaExistente = await this.collection.findOne({ id: datosReserva.id });
        if (reservaExistente) {
          throw new Error('El ID de la reserva ya existe.');
        }
  
        
        const pelicula = await this.db.collection('pelicula').findOne({ 
          id: datosReserva.id_pelicula, 
          estado: { $in: ["En cartelera", "Próximo estreno"] } 
        });
        if (!pelicula) {
          throw new Error('La película no existe o no está disponible para reserva.');
        }
  
        
        const horarioProyeccion = await this.db.collection('horario_proyeccion').findOne({ 
          id: datosReserva.id_horario_proyeccion, 
          id_pelicula: datosReserva.id_pelicula 
        });
        if (!horarioProyeccion) {
          throw new Error('El horario de proyección no es válido para esta película.');
        }
  
        
        const usuario = await this.db.collection('usuario').findOne({ id: datosReserva.id_usuario });
        if (!usuario) {
          throw new Error('El usuario especificado no existe.');
        }
  
        
        const sala = await this.db.collection('sala').findOne({ id: horarioProyeccion.id_sala });
        if (!sala) {
          throw new Error('No se encontró la sala asociada a este horario de proyección.');
        }
  
        
        const asientosValidos = datosReserva.asientos_reservados.every(asientoId => sala.asientos.includes(asientoId));
        if (!asientosValidos) {
          throw new Error('Uno o más asientos seleccionados no pertenecen a la sala de esta proyección.');
        }
  

        const asientosDisponibles = await this.db.collection('asiento').countDocuments({ 
          id: { $in: datosReserva.asientos_reservados }, 
          estado: 'disponible' 
        });
        if (asientosDisponibles !== datosReserva.asientos_reservados.length) {
          throw new Error('Uno o más asientos seleccionados no están disponibles.');
        }

        const nuevaReserva = {
          ...datosReserva,
          fecha_reserva: datosReserva.fecha_reserva || this.getFechaActual(),
          estado: datosReserva.estado || 'activa',
          fecha_expiracion: datosReserva.fecha_expiracion || this.getFechaExpiracion()
        };

        await this.collection.insertOne(nuevaReserva);
  

        await this.db.collection('asiento').updateMany(
          { id: { $in: datosReserva.asientos_reservados } },
          { $set: { estado: 'reservado' } }
        );
  
        await this.conexion.close();
        
        return { 
          mensaje: 'Reserva realizada con éxito', 
          detallesReserva: nuevaReserva 
        };
      } catch (error) {
        await this.conexion.close();
        return { error: `Error al realizar la reserva: ${error.message}` };
      }
    }

//--------------------------------------------------------------------------------------------------------

  async cancelarReserva(datosReserva) {

    try {
      await this.conexion.connect();


      const reservaExistente = await this.collection.findOne({ id: datosReserva.id });
      if (!reservaExistente) {
        throw new Error('La reserva no existe.');
      }


      if (reservaExistente.id_usuario !== datosReserva.id_usuario) {
        throw new Error('No tienes permiso para modificar esta reserva.');
      }

      let nuevoEstado;
      let nuevosAsientos;

      if (datosReserva.asientos_reservados.length === 0) {

        nuevoEstado = 'cancelada';
        nuevosAsientos = [];
      } else {

        nuevoEstado = 'activa';
        nuevosAsientos = datosReserva.asientos_reservados;
      }


      const resultado = await this.collection.updateOne(
        { id: datosReserva.id },
        { 
          $set: { 
            estado: nuevoEstado,
            asientos_reservados: nuevosAsientos
          }
        }
      );

      if (resultado.modifiedCount === 0) {
        throw new Error('No se pudo actualizar la reserva.');
      }


      const asientosALiberar = reservaExistente.asientos_reservados.filter(
        asiento => !nuevosAsientos.includes(asiento)
      );

      if (asientosALiberar.length > 0) {
        await this.db.collection('asiento').updateMany(
          { id: { $in: asientosALiberar } },
          { $set: { estado: 'disponible' } }
        );
      }

      await this.conexion.close();

      return { 
        mensaje: nuevoEstado === 'cancelada' ? 'Reserva cancelada con éxito' : 'Reserva actualizada con éxito',
        detallesReserva: {
          ...reservaExistente,
          estado: nuevoEstado,
          asientos_reservados: nuevosAsientos
        }
      };
    } catch (error) {
      await this.conexion.close();
      return { error: `Error al cancelar/actualizar la reserva: ${error.message}` };
    }
  }
}
  
