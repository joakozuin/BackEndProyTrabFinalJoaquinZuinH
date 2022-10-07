import MongoClass from '../../contenedor/MongoClass.js'
import { mensajeEsquema } from "../../modelo/mensajeEsquema.js"

export class MongoDBChats extends MongoClass{

  constructor(){
      //nombre de la coleccion y el esquema
      //
      super('mensaje',mensajeEsquema)
  }

}