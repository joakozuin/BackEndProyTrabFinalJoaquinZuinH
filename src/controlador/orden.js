
/* import  Api from '../modelo/apiClass.js';

const api=new Api('/dataBase/carrito.json');
const apiP=new Api('/dataBase/productos.json'); */

import {transporter} from '../mailer/correos.js'

import { application } from "express";
import {carritosDao as apiC}   from "../persistencia/daos/factory.js";
import {productosDao as apiP}   from "../persistencia/daos/factory.js";
import {usuariosDao as apiU}   from "../persistencia/daos/factory.js";
import {ordenesDao as apiO}   from "../persistencia/daos/factory.js";

import {funcUtil} from '../util/util.js'
const{calcFechaHora}=funcUtil


 const ProdCarrito=(prod)=>{
   
  let producto=[]
  let item=1
   prod.map(p=>{

     const reg='|Item:'+item+' |Código:'+p.codigo+' |Producto:'+p.nombre+' |precio:$'+ p.precio + ' |cantidad:'+ p.cantidad

     producto.push(reg)
     item++

   })
  
    return producto

 }



  export const funcOrden= {

  //Envia todos las ordenes
  //
  getOrdenes: async (req, res) => {

    try {
      let ordenes = await apiO.findAll();

      res.json({
        mensage: "Lista de ordenes de la BD",
        ordenes,
      });

    } catch (error) {
      const error1 = new Error(
        `(getAll)-No se encuentran las ordenes error: ${error}`
      );
      error.httpStatusCode = 400;

      return next(error1);
    }


  },

  //Envia una orden por id
  //
  getOrden: async (req, res, next) => {
   
    try {
      const { id } = req.params;
   
      let ord= await apiO.findById(id)
     

      res.json({
        mensage: `Orden con id:${ord[0]._id}`,
        orden:ord,
      });

    } catch (error) {
      const error1 = new Error(`(get)-No se encuentra la orden con el id: ${id}`);
      error.httpStatusCode = 400;

      return next(error1);  
    }
  },

  //Envia todos los productos de una orden
  //
   getProdsOrden: async (req, res,next) => {

    try {
      const { id } = req.params;
   
       let ord= await apiO.findById(id)

       res.json({
        mensage: `Productos de la Orden con id:${ord[0]._id}`,
        orden:ord[0].productos,
      });

    } catch (error) {

       const error1 = new Error(`(get)-No se encuentra la orden con el id: ${id}`);
       error.httpStatusCode = 400;

       return next(error1);  
    }
  },

  //Crea una Orden
  //
  postOrden: async (req, res,next) => { 
    
    //Se crea una Orden con el Id del carrito q incluye id del cliente
    
   try {
     const {idC} = req.params;

     let ordenes=await apiO.findAll();
     let Nro=ordenes.length!==0 ? (ordenes[ordenes.length-1].NroOrden)+1 : 0

     let carrito= await apiC.findById(idC)

     let cliente=await apiU.findById(carrito[0].idUsuario)

   
     let ord = {
       fecha: calcFechaHora(),
       estado:"generada",
       correoCliente:cliente[0].correo,
       NroOrden:Nro,
       productos: ProdCarrito(carrito[0].productos)
     };

     
     let orden=await apiO.create(ord)
 
     res.json({
       mensage: `Se agregó la orden con id:${orden._id}`,
       orden,
     });


     //Se envia por e-mail la orden creada
     //********************************** */
      let prodList=''
      orden.productos.map(p=>{
       prodList=prodList+`<h3>${p}<h3>`
     })

     let htmlTemplate = `
     <h1>Orden de compra Nro:${ord.NroOrden}</h1>
     <h2>Fecha: ${ord.fecha}</h2>
     <h3>E-mail Cliente:${ord.correoCliente}<h3>
     <h2>Detalle:</h2>
     `+prodList;
 
     //Funcion q envia e-mail
     const informacion = await transporter.sendMail({
       from: "JoaEziSystem <jzuin32@gmail.com>",
       to: "joaquinzuin16@gmail.com",
       subject: "Nodemailer JoaEzisystem Envio Orden de Compra",
       html: htmlTemplate,
       attachments: [ ],
     });





   } catch (error) {
    const error1 = new Error(
      `(post)-No se pudo crear la orden error: ${error}`
    );
    error.httpStatusCode = 400;

    return next(error1);

   }
  },

  

  //Borra una orden
  //
  deleteOrden: async(req, res,next) => {
    
    try {

       const { id } = req.params;
       let idError= await apiO.deleteById(id)

       res.json({
        mensage: `Se borró la orden con id:${id}`,
      });

    } catch (error) {
      const error1 = new Error(`(delete)-No se encuentra la orden con el id: ${id}`);
      error.httpStatusCode = 400;
      return next(error1);
    }
  },
   

};