import mongoose from 'mongoose'

export async function establecerConexion(){
    try{
        await mongoose.connect(process.env.DATABASE)
        console.log("Exito conectandonos a BD");
    }catch(error){
        console.log("Fallamos en la conexión a BD "+error);
    }
}