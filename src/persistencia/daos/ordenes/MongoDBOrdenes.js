import MongoClass from '../../contenedor/MongoClass.js'
import { ordenesEsquema } from "../../modelo/OrdenesEsquema.js"
export class MongoDBOrdenes extends MongoClass{

  constructor(){
      //nombre de la coleccion y el esquema
      //
      super('ordenes',ordenesEsquema)
  }


}