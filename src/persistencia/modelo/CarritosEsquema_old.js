import mongoose from "mongoose";


export const carritosEsquema = new mongoose.Schema({
            fecha: {type:String, required:true},
            //Deberia ser el id del usuario tipo cliente
            idUsuario:{type: mongoose.Schema.Types.ObjectId,ref: "usuarios"},
            Productos:[{
                        idP:{type:String, required:true},
                       fecha:{type:String, required:true},
                    cantidad:{type: Number,required:true,default:1}
                      }]
        }
    );

