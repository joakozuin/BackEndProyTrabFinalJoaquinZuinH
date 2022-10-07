import mongoose from "mongoose"

export const mensajeEsquema = new mongoose.Schema({
    email:{type:String, Default:''},
    tipoUsuario:{type:String, Default:''},
    fecha:{type:String, Default:''},
    mensaje:{type:String, Default:''},
   
})



