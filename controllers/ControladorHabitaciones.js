import { ServicioHabitacion } from "../services/ServicioHabitacion.js"; 


export class ControladorHabitaciones{
    constructor(){}

    async registrandoHabitacion(peticion,respuesta){
        let datosHabitacion = peticion.body
        let objetoServicioHabitacion = new ServicioHabitacion()
        try{

            if(datosHabitacion.precio<100 && datosHabitacion.numeropersonas <2){
                respuesta.status(400).json({
                    "mensaje":"Revisa el precio por noche y la cantidad máxima de personas ingresadas"
                })
            }else if(datosHabitacion.precio<100){
                respuesta.status(400).json({
                    "mensaje":"Revisa el precio por noche"
                })
            }else if (datosHabitacion.numeropersonas <2){
                respuesta.status(400).json({
                    "mensaje":"Muy poca gente en la habitación"
                })
            }else{
                await objetoServicioHabitacion.registrar(datosHabitacion)
                respuesta.status(200).json({
                "mensaje":"Exito registrando habitación"
                })
            }            
        }
        catch(error){
            respuesta.status(400).json({
                "mensaje":"fallamos en la operación"+error
            })
        }
    }


    async buscandoHabitacion(peticion,respuesta){
        let objetoServicioHabitacion = new ServicioHabitacion()
        try{
            let idHabitacion = peticion.params.idhabitacion
            respuesta.status(200).json({
                "mensaje":"Exito buscando la habitación",
                "habitacion":await objetoServicioHabitacion.buscarPorId(idHabitacion)
            })
        }
        catch(error){
            respuesta.status(400).json({
                "mensaje":"fallamos en la operación"+error
            })
        }
    }
    async buscandoHabitaciones(peticion,respuesta){
        let objetoServicioHabitacion = new ServicioHabitacion()
        try{
            respuesta.status(200).json({
                "mensaje":"Exito buscando las habitaciones",
                "habitaciones": await objetoServicioHabitacion.buscarTodas()
            })
        }
        catch(error){
            respuesta.status(400).json({
                "mensaje":"fallamos en la operación"+error
            })
        }
    }
    async editandoHabitaciones(peticion,respuesta){
        let idhabitacion = peticion.params.idhabitacion
        let datosHabitacion = peticion.body
        let objetoServicioHabitacion = new ServicioHabitacion()
        try{
            await objetoServicioHabitacion.editar(idhabitacion,datosHabitacion)
            respuesta.status(200).json({
                "mensaje":"Exito editando las habitaciones"
            })
        }
        catch(error){
            respuesta.status(400).json({
                "mensaje":"fallamos en la operación"+error
            })
        }
    }
}