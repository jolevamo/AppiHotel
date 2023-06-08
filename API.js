
import express from 'express'
import { rutas } from './routes/rutas.js'
import { establecerConexion } from './database/conexion.js'
import cors from 'cors'
export class API {

    constructor(){
        this.app = express()
        this.conectarConBd()
        this.enrutarPerticiones()
    }
    LevantarServidor(){
        //Levantando un servidor, se asigna un puerto, en este caso sería 3000
        this.app.listen(process.env.PORT,()=>console.log(`encendido en ${process.env.PORT}`)
        )
    }
    enrutarPerticiones(){
        //Función para consummir todo tipo de Apis desde el NodeJs
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use('/',rutas)
    }
    conectarConBd(){
        establecerConexion()
    }

}