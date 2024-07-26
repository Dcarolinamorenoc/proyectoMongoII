import { connect } from "../../helpers/db/connect.js";

export class pelicula extends connect {
    static instancePelicula;
    db;
    collection;

    constructor() {
        if (pelicula.instancePelicula) {
            return pelicula.instancePelicula;
        }
        super();
        this.db = this.conexion.db(this.getDbName);
        this.collection = this.db.collection('pelicula');
        pelicula.instancePelicula = this;
    }

    destructor() {
        pelicula.instancePelicula = undefined;
        connect.instanceConnect = undefined;
    }

    
//--------------------------------------------------------------------------------------------------------


    //  Listar Películas

    async listarPeliculas() {
        try {
            await this.conexion.connect();
            

            const peliculas = await this.collection.find({
                estado: { $in: ["En cartelera", "Próximo estreno"] }
            }, {
                projection: {
                    _id: 0,
                    id: 1,
                    titulo: 1,
                    sinopsis: 1,
                    fecha_estreno: 1,
                    genero: 1,
                    duracion: 1,
                    estado: 1,
                    pais_origen: 1
                }
            }).toArray();
    

            const peliculasConHorarios = [];
            for (const pelicula of peliculas) {
                const horarios = await this.db.collection('horario_proyeccion').find(
                    { id_pelicula: pelicula.id },
                    {
                        projection: {
                            _id: 0,
                            fecha_proyeccion: 1,
                            horario_proyeccion: 1,
                            hora_finalizacion: 1,
                            id_sala: 1,
                            precio_pelicula: 1
                        }
                    }
                ).toArray();
    
                peliculasConHorarios.push({
                    ...pelicula,
                    horarios_proyeccion: horarios
                });
            }
    
            await this.conexion.close();
            return peliculasConHorarios;
        } catch (error) {
            await this.conexion.close();
            return { error: `Error al listar las películas: ${error.message}` };
        }
    }

//--------------------------------------------------------------------------------------------------------


    // Obtener Detalles de Película

    async obtenerDetallesPelicula(idOTitulo) {
        try {
            await this.conexion.connect();
            let consulta;
            
            if (!isNaN(idOTitulo)) {

                consulta = { id: parseInt(idOTitulo) };
            } else {
                
                consulta = { titulo: { $regex: new RegExp(idOTitulo, 'i') } };
            }
    
            const pelicula = await this.collection.findOne(consulta, {
                projection: {
                    _id: 0,
                    id: 1,
                    titulo: 1,
                    sinopsis: 1,
                    fecha_estreno: 1,
                    genero: 1,
                    duracion: 1,
                    estado: 1,
                    pais_origen: 1
                }
            });
    
            if (!pelicula) {
                await this.conexion.close();
                return { error: `No se encontró una película con el ID o título ${idOTitulo}` };
            }
    
            const horarios = await this.db.collection('horario_proyeccion').find(
                { id_pelicula: pelicula.id },
                {
                    projection: {
                        _id: 0,
                        fecha_proyeccion: 1,
                        horario_proyeccion: 1,
                        hora_finalizacion: 1,
                        id_sala: 1,
                        precio_pelicula: 1
                    }
                }
            ).toArray();
    
            await this.conexion.close();
    
            return {
                ...pelicula,
                horarios_proyeccion: horarios
            };
        } catch (error) {
            await this.conexion.close();
            return { error: `Error al obtener los detalles de la película: ${error.message}` };
        }
    }
}