import { modeloHabitacion } from "../models/modeloHabitacion.js";

export class ServicioHabitacion{
    constructor(){}
    async registrar(datosHabitacion){
        let habitacionNueva = new modeloHabitacion(datosHabitacion)
        return await habitacionNueva.save()
    }
    async buscarTodas(){
        let habitaciones=await modeloHabitacion.find()
        return habitaciones
    }
    async buscarPorId(idhabitacion){
        let habitacion = await modeloHabitacion.findById(idhabitacion)
        return habitacion
    }
    async editar(idhabitacion, datosHabitacion){
        return await modeloHabitacion.findByIdAndUpdate(idhabitacion,datosHabitacion)
    }
}