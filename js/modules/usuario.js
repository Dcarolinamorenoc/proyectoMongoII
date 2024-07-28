import { connect } from "../../helpers/db/connect.js";

export class Usuario extends connect {
    static instanceUsuario;
    db;
    collectionUsuario;
    collectionTarjetaVip;
  
    constructor() {
        if (Usuario.instanceUsuario) {
            return Usuario.instanceUsuario;
        }
        super();
        this.db = this.conexion.db(this.getDbName);
        this.collectionUsuario = this.db.collection('usuario');
        this.collectionTarjetaVip = this.db.collection('tarjeta_vip');
        Usuario.instanceUsuario = this;
    }
  
    destructor() {
        Usuario.instanceUsuario = undefined;
        connect.instanceConnect = undefined;
    }


//--------------------------------------------------------------------------------------------------------

    async crearUsuario(datosUsuario) {
        try {
            await this.conexion.connect();
    
            
            const camposUnicos = ['id', 'nickname', 'email', 'celular', 'identificacion'];
            for (let campo of camposUnicos) {
                const usuarioExistente = await this.collectionUsuario.findOne({ [campo]: datosUsuario[campo] });
                if (usuarioExistente) {
                    throw new Error(`Ya existe un usuario con el mismo ${campo}.`);
                }
            }
    
            
            const usuarioNombreExistente = await this.collectionUsuario.findOne({
                nombre_completo: { $regex: new RegExp('^' + datosUsuario.nombre_completo + '$', 'i') }
            });
            if (usuarioNombreExistente) {
                throw new Error('Ya existe un usuario con el mismo nombre completo.');
            }
    
            
            await this.collectionUsuario.insertOne(datosUsuario);
    
            
            const respuesta = { ...datosUsuario };
            delete respuesta._id;
    
            await this.conexion.close();
            return { mensaje: 'Usuario creado con éxito', usuario: respuesta };
        } catch (error) {
            await this.conexion.close();
            return { error: `Error al crear el usuario: ${error.message}` };
        }
    }



//--------------------------------------------------------------------------------------------------------


    async crearTarjetaVIP(datosTarjetaVip) {
        try {
            await this.conexion.connect();

            let usuario;
            if (datosTarjetaVip.id_usuario) {
                usuario = await this.collectionUsuario.findOne({ id: datosTarjetaVip.id_usuario });
            } else if (datosTarjetaVip.nickname) {
                usuario = await this.collectionUsuario.findOne({ nickname: datosTarjetaVip.nickname });
            } else if (datosTarjetaVip.identificacion) {
                usuario = await this.collectionUsuario.findOne({ identificacion: datosTarjetaVip.identificacion });
            } else {
                throw new Error('Se requiere id_usuario, nickname o identificacion para crear la tarjeta VIP.');
            }

            if (!usuario) {
                throw new Error('Usuario no registrado en la base de datos.');
            }

            if (usuario.rol !== 'VIP') {
                throw new Error('El usuario no tiene el rol VIP. No se puede crear la tarjeta VIP.');
            }

            const tarjetaExistente = await this.collectionTarjetaVip.findOne({ id_usuario: usuario.id });
            if (tarjetaExistente) {
                throw new Error('El usuario ya tiene una tarjeta VIP.');
            }

            const nuevaTarjeta = {
                id: await this.generarIdTarjeta(),
                id_usuario: usuario.id,
                numero: await this.generarNumeroTarjeta(),
                porcentaje_descuento: 15,
                fecha_expiracion: this.generarFechaExpiracion(),
                estado: 'activa'
            };

            await this.collectionTarjetaVip.insertOne(nuevaTarjeta);
            await this.conexion.close();
            return nuevaTarjeta;
        } catch (error) {
            await this.conexion.close();
            return { error: error.message };
        }
    }
    async generarIdTarjeta() {
        const ultimaTarjeta = await this.collectionTarjetaVip.findOne({}, { sort: { id: -1 } });
        return ultimaTarjeta ? ultimaTarjeta.id + 1 : 1;
    }
    
    async generarNumeroTarjeta() {
        let numero;
        do {
        numero = 'VIP' + Math.floor(1000 + Math.random() * 9000).toString();
        } while (await this.collectionTarjetaVip.findOne({ numero: numero }));
        return numero;
    }
    
    generarFechaExpiracion() {
        const fecha = new Date();
        fecha.setFullYear(fecha.getFullYear() + 1);
        return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '/');
    }




    async consultarUsuarioDetallado(datosConsulta) {
        try {
          await this.conexion.connect();
      
          let filtro = {};
          if (datosConsulta.id) {
            filtro.id = datosConsulta.id

          } else if (datosConsulta.identificacion) {
            filtro.identificacion = datosConsulta.identificacion;

          } else if (datosConsulta.nickname) {
            filtro.nickname = datosConsulta.nickname;

          } else if (datosConsulta.nombre_completo) {
            filtro.nombre_completo = datosConsulta.nombre_completo;

          } else {
            throw new Error('Se requiere id, identificacion, nickname o nombre_completo para consultar el usuario.');
          }
      
          const usuario = await this.collectionUsuario.findOne(filtro);
          if (!usuario) {
            throw new Error('Usuario no encontrado en la base de datos.');
          }
      
          let tarjetaVIP = null;
          let mensajeTarjetaVIP = '';
      
          switch(usuario.rol) {
            case 'VIP':
              tarjetaVIP = await this.collectionTarjetaVip.findOne({ id_usuario: usuario.id });
              if (tarjetaVIP) {
                if (tarjetaVIP.estado === 'activa') {
                  mensajeTarjetaVIP = 'Felicidades, eres un usuario VIP con tarjeta activa. Sigue disfrutando de nuestros descuentos.';

                } else if (tarjetaVIP.estado === 'expirada') {
                  mensajeTarjetaVIP = 'Querido usuario, lamentamos que tengas tu tarjeta expirada. ¿Qué esperas para volver a activarla?';

                } else {
                  mensajeTarjetaVIP = `Tu tarjeta VIP está en estado: ${tarjetaVIP.estado}. Por favor, contacta con soporte para más información.`;

                }
              } else {
                mensajeTarjetaVIP = 'Eres usuario VIP pero no tienes una tarjeta VIP asignada. Por favor, contacta con soporte.';

              }
              break;
            case 'administrador':
              mensajeTarjetaVIP = 'Eres un administrador sin acceso a una tarjeta VIP.';

              break;
            default: 
              mensajeTarjetaVIP = 'Eres usuario estándar. No tienes una tarjeta VIP. Si deseas una, puedes adquirirla.';
              
          }
      
          const usuarioDetallado = {
            id: usuario.id,
            nombre_completo: usuario.nombre_completo,
            identificacion: usuario.identificacion,
            nickname: usuario.nickname,
            celular: usuario.celular,
            email: usuario.email,
            telefono: usuario.telefono,
            rol: usuario.rol,
            tarjetaVIP: tarjetaVIP ? {
              numero: tarjetaVIP.numero,
              porcentaje_descuento: tarjetaVIP.porcentaje_descuento,
              fecha_expiracion: tarjetaVIP.fecha_expiracion,
              estado: tarjetaVIP.estado
            } : null,
            mensajeTarjetaVIP: mensajeTarjetaVIP
          };
      
          await this.conexion.close();
          return usuarioDetallado;
        } catch (error) {
          await this.conexion.close();
          return { error: error.message };
        }
      }
}

