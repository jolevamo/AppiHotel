import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Reserva = new Schema({
    nombreCliente:{
        type:String,
        required:true
    },
    apellidoCliente:{
        type:String,
        required:true
    },
    telefonoCliente:{
        type:Number,
        required:true
    },
    fechaInicioReserva:{
        type:Date,
        required:true
    },
    fechaFinReserva:{
        type:Date,
        required:true
    },
    numeroAdultos:{
        type:Number,
        required:true
    },
    numeroNiños:{
        type:Number,
        required:true
    },
    idRoom:{
        type: String,
        required:true
    },
    costoReserva:{
        type:Number
    }
})

export const modeloReserva = mongoose.model('reservas',Reserva)