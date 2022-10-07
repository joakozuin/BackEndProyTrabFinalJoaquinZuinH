import mongoose from "mongoose";


export const ordenesEsquema = new mongoose.Schema({
            fecha: {type:String, required:true},
            //g:generada, sg:sin generar
            estado: {type:String, required:true},
            //Deberia ser el id del usuario tipo cliente
            correoCliente:{type:String, required:true},
            NroOrden:{type: Number,required:true,default:1},
            productos:[{type:String, required:true}],
        
        });
