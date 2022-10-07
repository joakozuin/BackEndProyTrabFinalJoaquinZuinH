import mongoose from "mongoose"

export const usuariosEsquema = new mongoose.Schema({
    nombre:{type:String, Default:''},
    direccion:{type:String, Default:''},
    edad:{type:String,Default:'0'},
    telefono:{type:String, Default:''},
    urlFoto:{type:String, Default:''},
    //tipo: cliente, administrador
    tipo:{type:String, Default:'SinAutorizar'},
    correo:{type:String, Default:''},
    password:{type:String, Default:''},
   
})



