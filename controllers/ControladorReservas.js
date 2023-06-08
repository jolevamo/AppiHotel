
import { ServicioReserva } from "../services/ServicioReserva.js"
import { ServicioHabitacion } from "../services/ServicioHabitacion.js"; 

export class ControladorReservas {
    constructor(){}
    async registrandoReserva(peticion,respuesta){
        let datosReserva = peticion.body
        let objetoServicioReserva = new ServicioReserva()
        let objetoServicioHabitacion = new ServicioHabitacion()
        let encontrarHabitacion = await objetoServicioHabitacion.buscarPorId(datosReserva.idRoom)
        let sumaPersonas = datosReserva.numeroAdultos + datosReserva.numeroNiños
        //let capacidadHabitacion = await objetoServicioHabitacion.numeropersonas
        console.log(encontrarHabitacion);
        let fecha = new Date()
        let dia = fecha.getDate()
        let mes = fecha.getMonth()+1
        let anio = fecha.getFullYear()
        if (dia<10){
            dia = "0"+dia
        }
        if (mes<10){
            mes = "0"+mes
        }
        let fechaActual = anio+"-"+mes+"-"+dia
        let fechaSalida = new Date(datosReserva.fechaFinReserva)
        let fechaSalidaDia = fechaSalida.getDate()+1
        let fechaSalidaMes = fechaSalida.getMonth()+1
        let fechaSalidaAnio = fechaSalida.getFullYear()
        if (fechaSalidaDia<10){
            fechaSalidaDia = "0"+fechaSalidaDia
        }
        if (fechaSalidaMes<10){
            fechaSalidaMes = "0"+fechaSalidaMes
        }
        fechaSalida = fechaSalidaAnio+"-"+fechaSalidaMes+"-"+fechaSalidaDia

        let fechaIngreso = new Date(datosReserva.fechaInicioReserva)
        let fechaIngresoDia = fechaIngreso.getDate()+1
        let fechaIngresoMes = fechaIngreso.getMonth()+1
        let fechaIngresoAnio = fechaIngreso.getFullYear()
        if (fechaIngresoDia<10){
            fechaIngresoDia = "0"+fechaIngresoDia
        }
        if (fechaIngresoMes<10){
            fechaIngresoMes = "0"+fechaIngresoMes
        }

        let costoReserva;

        if(encontrarHabitacion){
            fechaIngreso = fechaIngresoAnio+"-"+fechaIngresoMes+"-"+fechaIngresoDia
            let cantidadDias = new Date(fechaSalida) - new Date(fechaIngreso).getTime()
            let diasDeReserva = cantidadDias/1000/60/60/24
            costoReserva = diasDeReserva * encontrarHabitacion.precio
            console.log (new Date(fechaSalida).getTime());
            console.log (new Date(fechaIngreso).getTime());
            console.log(fechaIngreso);
            console.log(fechaSalida);
            console.log(diasDeReserva);
            console.log("oeeeee"+costoReserva);
            console.log(encontrarHabitacion.precio);
            console.log(sumaPersonas);
            console.log(encontrarHabitacion.numeropersonas);
            console.log(encontrarHabitacion)

        }

        
        try{
            if (encontrarHabitacion==null){
                respuesta.status(400).json({
                    "mensaje":"Revisa la habitación en la que quieres realizar la reserva, al parecer no existe"
                })
            }else if (sumaPersonas<2){
                respuesta.status(400).json({
                    "mensaje":"Revisa la cantidad de personas, minimo deben ser 2"
                })
            }else if (datosReserva.numeroAdultos==0){
                respuesta.status(400).json({
                    "mensaje":"Revisa la cantidad de adultos, minimo debe haber 1 adulto"
            })
            }else if (sumaPersonas>encontrarHabitacion.numeropersonas){
                respuesta.status(400).json({
                "mensaje":"Capacidad de habitación no es suficiente para las personas que desea reservar"
            })
            }else if(fechaIngreso<fechaActual){
                respuesta.status(400).json({
                    "mensaje":"Revisar la fecha de ingreso, se encuentra en el pasado"
            })
            // }else if(fechaSalida<fechaActual){
            //     respuesta.status(400).json({
            //         "mensaje":"Revisar la fecha de salida, se encuentra en el pasado"
            // })
            }else if(fechaIngreso==fechaSalida){
                respuesta.status(400).json({
                    "mensaje":"La fecha de ingreso debe ser diferente a la fecha de salida"
            })
            }else if(fechaIngreso>fechaSalida){
                respuesta.status(400).json({
                    "mensaje":"La fecha de salida debe ser posterior a la fecha de ingreso"
            })
            }else{
                datosReserva.costoReserva = costoReserva
                await objetoServicioReserva.registrar(datosReserva)
                respuesta.status(200).json({
                    "mensaje":"Exito registrando reserva"
                })
            }                      
        }
        catch(error){
            respuesta.status(400).json({
                "mensaje":"fallamos en la operación"+error
            })
        }
            
            
        }
       
    async actualizandoReserva(peticion,respuesta){
        let idReserva = peticion.params.idReserva
        let  datosReserva = peticion.body
        let objetoServicioReserva = new ServicioReserva()
        try{
            await objetoServicioReserva.actualizarReserva(idReserva,datosReserva)            
            respuesta.status(200).json({
                "mensaje":"Exito actualizando reserva"
            })
        }
        catch(error){
            respuesta.status(400).json({
                "mensaje":"fallamos en la operación"+error
            })
        }
    }
    async buscandoReserva(peticion,respuesta){
        let objetoServicioReserva = new ServicioReserva()
        try{
            let idReserva = peticion.params.idReserva
            respuesta.status(200).json(
                {
                "mensaje":"Exito buscando reserva",
                "reserva":await objetoServicioReserva.buscarReserva(idReserva)
                }
            )
        }
        catch(error){
            respuesta.status(400).json({
                "mensaje":"fallamos en la operación"+error
            })
        }
    }

    async buscandoReservas(peticion,respuesta){
        let objetoServicioReserva = new ServicioReserva()
        try{
            respuesta.status(200).json(
                {
                "mensaje":"Exito buscando reserva",
                "reservas":await objetoServicioReserva.buscarReservas()
                }
            )
        }
        catch(error){
            respuesta.status(400).json({
                "mensaje":"fallamos en la operación"+error
            })
        }
    }
    async eliminandoReserva(peticion,respuesta){
        let objetoServicioReserva = new ServicioReserva()
        try{
            let idReserva = peticion.params.idReserva
            respuesta.status(200).json({
                "mensaje":"Exito eliminando reserva",
                "reserva": await objetoServicioReserva.eliminarReserva(idReserva)
            })
        }
        catch(error){
            respuesta.status(400).json({
                "mensaje":"fallamos en la operación"+error
            })
        }
    }
}