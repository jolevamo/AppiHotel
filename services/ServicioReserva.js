import { modeloReserva } from "../models/modeloReserva.js";

export class ServicioReserva{
    constructor(){}
    async registrar(datosReserva){
        let reservaNueva = new modeloReserva(datosReserva)
        return await reservaNueva.save()
    }
    async actualizarReserva(idReserva,datosReserva){
        return await modeloReserva.findByIdAndUpdate(idReserva,datosReserva)
    }
    async buscarReserva(idReserva){
        let reserva = await modeloReserva.findById(idReserva)
        return reserva
    }
    async buscarReservas(){
        let reservas = await modeloReserva.find()
        return reservas
    }
    async eliminarReserva(idReserva){
        return await modeloReserva.findByIdAndDelete(idReserva)
    }
    
}