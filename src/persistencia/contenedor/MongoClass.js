import mongoose from 'mongoose';
import config from '../../config.js'

mongoose.connect(config.mongoDB.URL,config.mongoDB.options)

class MongoClase {
  constructor(nombreColecc, esqDoc) {

    this.coleccion=mongoose.model(nombreColecc,esqDoc)

  }

  async findAllEmail(ema){

    try {
        const todos=await this.coleccion.find({email:ema})

        return todos

    } catch (error) {
        throw new Error('(Metodo findAllEmail)-Mensaje de Error:',error)
    }
  }

  

  async findNombre(nombre){
    try {
        const todos=await this.coleccion.findOne({nombre})

        /* console.log('mongoClass metodo findNombre respuesta sin error')
        console.log(todos) */
       if(todos){

          return {usuario:todos,error:false}

       }else{

          return {usuario:todos,error:true}
       }

    } catch (error) {
        throw new Error('(Metodo findNombre)-Mensaje de Error:',error)
        /* console.log('mongoClass metodo findNombre respuesta con error')
        return {usuario:false,error:error} */
    }
  }

  async findAll(){
    try {
        const todos=await this.coleccion.find({})
        return todos
    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async findById(id){
        //console.log('findById')
        //console.log(id)
    try {
        const uno=await this.coleccion.find({_id:id})
        return uno
    } catch (error) {
        throw new Error('(Metodo finById)-Mensaje de Error:',error)
    }
  }

  async findAllByCat(cat){
    try {
        const uno=await this.coleccion.find({categoria:cat})
        return uno
    } catch (error) {
        throw new Error('(Metodo finAllByCat)-Mensaje de Error:',error)
    }
  }

  async create(obj){
    try {
        const uno=await this.coleccion.create(obj)
        return uno
    } catch (error) {
        throw new Error('(Metodo create)-Mensaje de Error:',error)
    }
  }

  async editById(id,obj){
    try {
    
       const uno=await this.coleccion.updateOne({_id:id},{$set:obj})
       return uno

    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }


  async editByIdCarPostProd(id,obj){  //edita un carrito e inserta productos al carrito

  
    try {

       let carrito= await this.coleccion.findById({_id:id})

           const productoEnCarrito = carrito.productos.find(p => JSON.stringify(p._id) == JSON.stringify(obj._id));
      
      if (productoEnCarrito) {

          productoEnCarrito.cantidad= productoEnCarrito.cantidad + obj.cantidad;

      }else { 
       
        carrito.productos.push(obj);
        
      }

      const carritoModif = await this.coleccion.findByIdAndUpdate(carrito._id, {productos: carrito.productos});

      return carritoModif;

        //const carritoModif1=await this.coleccion.updateOne({_id:id},{$push:{productos:obj}})
        //return carritoModif1

    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }




  async deleteById(id){
    try {
    
        const uno=await this.coleccion.deleteOne({_id:id})
        return uno
        
    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }


  
  async deleteByIdCarIdProd(id,idP){ //edita un carrito y borra productos

   
    try {  
      let carrito= await this.coleccion.findById({_id:id})

      const productoEnCarrito = carrito.productos.find(p =>p._id == idP);
      //const productoEnCarrito = carrito.productos.find(p => JSON.stringify(p._id) == JSON.stringify(idP));

      if (productoEnCarrito) {
        if(productoEnCarrito.cantidad >1){

          productoEnCarrito.cantidad=productoEnCarrito.cantidad-1

         }else{

          carrito.productos = carrito.productos.filter(p => p._id != idP)

         }
      }else{
          throw new Error("El producto no esta en el carrito");
      }

      const carritoModif = await this.coleccion.findByIdAndUpdate(carrito._id, {productos: carrito.productos});
      return carritoModif;

        /* const uno=await this.coleccion.updateOne({_id:id},{$pull:{productos:{_id:id_prod}}})
        return uno */

    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }  }

}



export default MongoClase