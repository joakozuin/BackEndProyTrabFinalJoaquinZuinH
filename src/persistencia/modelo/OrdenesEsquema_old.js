import mongoose from "mongoose";


export const ordenesEsquema = new mongoose.Schema({
            fecha: {type:String, required:true},
            //g:generada, sg:sin generar
            estado: {type:String, required:true},
            //Deberia ser el id del usuario tipo cliente
            correoCliente:{type:String, required:true},
            NroOrden:{type: Number,required:true,default:1},
            Productos:[{
                        idP:{type: mongoose.Schema.Types.ObjectId,ref: "productos"},
                       fecha:{type:String, required:true},
                    cantidad:{type: Number,required:true,default:1},
                      }],
        
                    }
                    );
