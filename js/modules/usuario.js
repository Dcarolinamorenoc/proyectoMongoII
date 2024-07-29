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

    /**
     * Crea un nuevo usuario en la base de datos.
     *
     * @async
     * @param {Object} datosUsuario - Datos del usuario a crear.
     * @param {number} datosUsuario.id - ID único del usuario.
     * @param {string} datosUsuario.nombre_completo - Nombre completo del usuario.
     * @param {string} datosUsuario.nickname - Apodo único del usuario.
     * @param {string} datosUsuario.email - Correo electrónico único del usuario.
     * @param {string} datosUsuario.celular - Número de celular único del usuario.
     * @param {string} datosUsuario.identificacion - Número de identificación único del usuario.
     * @param {string} [datosUsuario.telefono] - Número de teléfono del usuario (opcional).
     * @param {string} [datosUsuario.rol] - Rol del usuario (por defecto: 'estándar').
     * @returns {Promise<Object>} Objeto con el resultado de la operación.
     * @property {string} [mensaje] - Mensaje de éxito si el usuario se crea correctamente.
     * @property {Object} [usuario] - Detalles del usuario creado si la operación es exitosa.
     * @property {string} [error] - Mensaje de error si la creación falla.
     * @throws {Error} Si ocurre algún error durante el proceso de creación.
     */


    // Crear un nuevo usuario

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

    /**
     * Crea una nueva tarjeta VIP para un usuario.
     *
     * @async
     * @param {Object} datosTarjetaVip - Datos para crear la tarjeta VIP.
     * @param {number} [datosTarjetaVip.id_usuario] - ID del usuario (opcional).
     * @param {string} [datosTarjetaVip.nickname] - Nickname del usuario (opcional).
     * @param {string} [datosTarjetaVip.identificacion] - Identificación del usuario (opcional).
     * @returns {Promise<Object>} Objeto con el resultado de la operación.
     * @property {number} [id] - ID de la tarjeta VIP creada.
     * @property {number} [id_usuario] - ID del usuario al que se asignó la tarjeta.
     * @property {string} [numero] - Número único de la tarjeta VIP.
     * @property {number} [porcentaje_descuento] - Porcentaje de descuento de la tarjeta.
     * @property {string} [fecha_expiracion] - Fecha de expiración de la tarjeta.
     * @property {string} [estado] - Estado de la tarjeta (por defecto: 'activa').
     * @property {string} [error] - Mensaje de error si la creación falla.
     * @throws {Error} Si ocurre algún error durante el proceso de creación.
     */


    // Si el Usuario nuevo es registrado con un rol VIP es necesario crear su tarjeta Vip
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



//--------------------------------------------------------------------------------------------------------

    /**
     * Consulta información detallada de un usuario, incluyendo su rol y estado de tarjeta VIP.
     *
     * @async
     * @param {Object} datosConsulta - Datos para realizar la consulta.
     * @param {number} [datosConsulta.id] - ID del usuario (opcional).
     * @param {string} [datosConsulta.identificacion] - Identificación del usuario (opcional).
     * @param {string} [datosConsulta.nickname] - Nickname del usuario (opcional).
     * @param {string} [datosConsulta.nombre_completo] - Nombre completo del usuario (opcional).
     * @returns {Promise<Object>} Objeto con la información detallada del usuario.
     * @property {number} id - ID del usuario.
     * @property {string} nombre_completo - Nombre completo del usuario.
     * @property {string} identificacion - Identificación del usuario.
     * @property {string} nickname - Nickname del usuario.
     * @property {string} celular - Número de celular del usuario.
     * @property {string} email - Correo electrónico del usuario.
     * @property {string} [telefono] - Número de teléfono del usuario (si está disponible).
     * @property {string} rol - Rol del usuario.
     * @property {Object} [tarjetaVIP] - Detalles de la tarjeta VIP (si el usuario tiene una).
     * @property {string} [tarjetaVIP.numero] - Número de la tarjeta VIP.
     * @property {number} [tarjetaVIP.porcentaje_descuento] - Porcentaje de descuento de la tarjeta VIP.
     * @property {string} [tarjetaVIP.fecha_expiracion] - Fecha de expiración de la tarjeta VIP.
     * @property {string} [tarjetaVIP.estado] - Estado actual de la tarjeta VIP.
     * @property {string} mensajeTarjetaVIP - Mensaje sobre el estado de la tarjeta VIP o el rol del usuario.
     * @property {string} [error] - Mensaje de error si la consulta falla.
     * @throws {Error} Si ocurre algún error durante el proceso de consulta.
     */


    // Consultar información detallada sobre un usuario, incluyendo su rol y estado de tarjeta VIP.

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

//--------------------------------------------------------------------------------------------------------


    /**
     * Actualiza el rol de un usuario y gestiona su tarjeta VIP si es necesario.
     *
     * @async
     * @param {Object} datosActualizacion - Datos para realizar la actualización.
     * @param {number} datosActualizacion.id - ID del usuario.
     * @param {string} datosActualizacion.nuevoRol - Nuevo rol a asignar al usuario ("VIP" o "Estandar").
     * @returns {Promise<Object>} Objeto con un mensaje indicando el resultado de la operación.
     * @property {string} mensaje - Mensaje describiendo el resultado de la actualización.
     * @throws {Error} Si el usuario no se encuentra en la base de datos.
     */


    // Actualización del rol de un usuario 

    async actualizarRolUsuario(datosActualizacion)  {
        const { id, nuevoRol } = datosActualizacion;


        const usuario = await this.collectionUsuario.findOne({ id });
        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }

        if (usuario.rol === nuevoRol) {
            if (nuevoRol === "VIP") {
                const tarjetaVIP = await this.collectionTarjetaVip.findOne({ id_usuario: id });
                if (tarjetaVIP && tarjetaVIP.estado === "activa") {
                    return { mensaje: 'El usuario ya tiene el rol VIP.' };
                }
            }
            return { mensaje: 'El usuario ya tiene el rol especificado.' };
        }

        await this.collectionUsuario.updateOne(
            { id },
            { $set: { rol: nuevoRol } }
        );

        if (nuevoRol === "VIP") {

            const tarjetaVIP = await this.collectionTarjetaVip.findOne({ id_usuario: id });
            
            if (tarjetaVIP) {

                await this.collectionTarjetaVip.updateOne(
                    { id_usuario: id },
                    { $set: { estado: "activa" } }
                );
                return { mensaje: 'Eres un usuario Vip, Tu tarjeta VIP ha sido reactivada.' };
            } else {

                return { mensaje: 'Ya eres un usuario Vip, Felicidades has obtenido acceso a la tarjeta premium. El siguiente paso es registrar tu tarjeta.' };
            }
        } else if (nuevoRol === "Estandar") {

            const tarjetaVIP = await this.collectionTarjetaVip.findOne({ id_usuario: id });
            if (tarjetaVIP) {
                await this.collectionTarjetaVip.updateOne(
                    { id_usuario: id },
                    { $set: { estado: "cancelada" } }
                );
                return { mensaje: 'Tu rol ha sido actualizado a Estándar y tu tarjeta VIP ha sido cancelada.' };
            } else {
                return { mensaje: 'Tu rol ha sido actualizado a Estándar.' };
            }
        }

        return { mensaje: 'Rol actualizado exitosamente.' };
    }


//--------------------------------------------------------------------------------------------------------

    /**
     * Consulta todos los usuarios del sistema con opción de filtrar por rol.
     *
     * @async
     * @param {Object} [opciones] - Opciones para la consulta.
     * @param {string} [opciones.rol] - Rol para filtrar los usuarios ('VIP', 'Estandar', 'administrador').
     * @returns {Promise<Object>} Objeto con la lista de usuarios y mensaje de estado.
     * @property {Array} usuarios - Lista de usuarios que cumplen con los criterios de búsqueda.
     * @property {string} mensaje - Mensaje indicando el resultado de la operación.
     * @throws {Error} Si ocurre algún error durante la consulta.
     */

    // Permitir la consulta de todos los usuarios del sistema, con la posibilidad de filtrar por rol
    
    async consultarUsuarios(opciones = {}) {
        const rolesValidos = ['VIP', 'Estandar', 'Administrador'];

        try {
            if (opciones.rol) {
                const rolNormalizado = opciones.rol.toUpperCase();
                if (!rolesValidos.includes(rolNormalizado)) {
                    return {
                        usuarios: [],
                        mensaje: `El rol "${opciones.rol}" no está incluido en la base de datos. Los roles válidos son: ${rolesValidos.join(', ')}.`
                    };
                }
                opciones.rol = rolNormalizado;
            }

            await this.conexion.connect();

            let filtro = {};
            if (opciones.rol) {
                filtro.rol = opciones.rol;
            }
            if (opciones.nombre) {
                filtro.nombre_completo = { $regex: new RegExp(opciones.nombre, 'i') };
            }

            const usuarios = await this.collectionUsuario.find(filtro).toArray();

            let mensaje;
            if (usuarios.length === 0) {
                mensaje = 'No se encontraron usuarios que coincidan con los criterios de búsqueda.';
                if (opciones.rol) {
                    mensaje += ` Rol buscado: ${opciones.rol}.`;
                }
                if (opciones.nombre) {
                    mensaje += ` Nombre buscado: ${opciones.nombre}.`;
                }
                return { usuarios: [], mensaje };
            }

            mensaje = `Se encontraron ${usuarios.length} usuario(s)`;
            if (opciones.rol) {
                mensaje += ` con rol ${opciones.rol}`;
            }
            if (opciones.nombre) {
                mensaje += ` que coinciden con el nombre "${opciones.nombre}"`;
            }
            mensaje += '.';

            await this.conexion.close();

            return {
                usuarios: usuarios.map(usuario => ({
                    id: usuario.id,
                    nombre_completo: usuario.nombre_completo,
                    identificacion: usuario.identificacion,
                    nickname: usuario.nickname,
                    email: usuario.email,
                    rol: usuario.rol
                })),
                mensaje: mensaje
            };
        } catch (error) {
            await this.conexion.close();
            return {
                usuarios: [],
                mensaje: `Error al consultar usuarios: ${error.message}`
            };
        }
    }
}
