import express from 'express'
import { ControladorHabitaciones } from '../controllers/ControladorHabitaciones.js'
import { ControladorReservas } from '../controllers/ControladorReservas.js'

let controladorHabitacion = new ControladorHabitaciones()
let controladorReserva = new ControladorReservas()

//Voy a separar y personalizar las rutas de cada servicio del API REST
export let rutas = express.Router()


        //Enrutando las peticiones ó servicios de mi servidor
        //buscarhabitaciones sería el end point
        rutas.get('/buscarhabitaciones',controladorHabitacion.buscandoHabitaciones)
  
        rutas.get('/buscarhabitacion/:idhabitacion',controladorHabitacion.buscandoHabitacion)
  
        rutas.post('/registrarhabitacion',controladorHabitacion.registrandoHabitacion)
  
        rutas.put('/editarhabitacion/:idhabitacion',controladorHabitacion.editandoHabitaciones)
    
        rutas.post('/registrarreserva',controladorReserva.registrandoReserva)
  
        rutas.put('/actualizarreserva/:idReserva',controladorReserva.actualizandoReserva)
  
        rutas.get('/buscarreserva/:idReserva',controladorReserva.buscandoReserva)
  
        rutas.get('/buscarreservas',controladorReserva.buscandoReservas)
  
        rutas.delete('/eliminarreserva/:idReserva',controladorReserva.eliminandoReserva)