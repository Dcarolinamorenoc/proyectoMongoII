import { connect } from "../../helpers/db/connect.js";

export class TarjetaVip extends connect {
    static instanceTarjetaVip;
    db;
    collection;
  
    constructor() {
      if (TarjetaVip.instanceTarjetaVip) {
        return TarjetaVip.instanceTarjetaVip;
      }
      super();
      this.db = this.conexion.db(this.getDbName);
      this.collection = this.db.collection('boleto');
      TarjetaVip.instanceTarjetaVip = this;
    }
  
    destructor() {
      TarjetaVip.instanceTarjetaVip = undefined;
      connect.instanceConnect = undefined;
    }

    
//--------------------------------------------------------------------------------------------------------

    // Descuento en boletos para Usuarios VIP

    async comprarBoletosVIP(datosBoletoVip) {

        try {
            await this.conexion.connect();
    
            
            const boletoExistente = await this.collection.findOne({ id: datosBoletoVip.id });
            if (boletoExistente) {
                throw new Error('El ID del boleto ya existe.');
            }
    
            
            const pelicula = await this.db.collection('pelicula').findOne({ 
                id: datosBoletoVip.id_pelicula, 
                estado: { $in: ["En cartelera", "Próximo estreno"] } 
            });
            if (!pelicula) {
                throw new Error('La película no existe o no está disponible para compra de boletos.');
            }
    
            
            const horarioProyeccion = await this.db.collection('horario_proyeccion').findOne({ 
                id: datosBoletoVip.id_horario_proyeccion, 
                id_pelicula: datosBoletoVip.id_pelicula 
            });
            if (!horarioProyeccion) {
                throw new Error('El horario de proyección no es válido para esta película.');
            }
    
            
            const usuario = await this.db.collection('usuario').findOne({ id: datosBoletoVip.id_usuario });
            if (!usuario) {
                throw new Error('El usuario especificado no existe.');
            }
    
            
            const sala = await this.db.collection('sala').findOne({ id: horarioProyeccion.id_sala });
            if (!sala) {
                throw new Error('No se encontró la sala asociada a este horario de proyección.');
            }
    
            
            const asientosValidos = datosBoletoVip.asientos_comprados.every(asientoId => sala.asientos.includes(asientoId));
            if (!asientosValidos) {
                throw new Error('Uno o más asientos seleccionados no pertenecen a la sala de esta proyección.');
            }
    
            
            const asientosDisponibles = await this.db.collection('asiento').countDocuments({ 
                id: { $in: datosBoletoVip.asientos_comprados }, 
                estado: 'disponible' 
            });
            if (asientosDisponibles !== datosBoletoVip.asientos_comprados.length) {
                throw new Error('Uno o más asientos seleccionados no están disponibles.');
            }
    
            
            if (datosBoletoVip.id_reserva !== null) {
                const reserva = await this.db.collection('reserva').findOne({ id: datosBoletoVip.id_reserva });
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
                mensajeVIP = `Eres un cliente VIP y por eso te hemos otorgado un descuento de: ${descuento}%`;
            } else {
                mensajeVIP = 'Eres un cliente VIP, pero no tienes una tarjeta activa. No se aplicó descuento.';
            }
        }
    
            
            const precioBase = horarioProyeccion.precio_pelicula * datosBoletoVip.asientos_comprados.length;
            const total = precioBase - (precioBase * (descuento / 100));
    
            
            const nuevoBoleto = {
                ...datosBoletoVip,
                total: total,
                descuento_aplicado: descuento,
                fecha_compra: new Date().toLocaleDateString('es-ES'),
                estado_compra: 'completada'
            };
    
            
            await this.collection.insertOne(nuevoBoleto);
    
            
            await this.db.collection('asiento').updateMany(
                { id: { $in: datosBoletoVip.asientos_comprados } },
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

}