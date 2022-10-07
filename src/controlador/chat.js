
/* import  Api from '../modelo/apiClass.js';

const api=new Api('/dataBase/carrito.json');
const apiP=new Api('/dataBase/productos.json'); */

import {transporter} from '../mailer/correos.js'

import {chatsDao as apiChat}   from "../persistencia/daos/factory.js";

import {funcUtil} from '../util/util.js'
const{calcFechaHora}=funcUtil


 

  export const funcChat= {

  //Envia todos los chats
  //
  getChats: async (req, res) => {

    try {
      let chats = await apiChat.findAll();

      res.json({
        mensage: "Lista de Chats de la BD",
        chats,
      });

    } catch (error) {
      const error1 = new Error(
        `(getChats)-No se encuentran los Chats error: ${error}`
      );
      error.httpStatusCode = 400;

      return next(error1);
    }


  },


  //Envia todos los chats por email
  //
  getChatsEmail: async (req, res) => {

    const {email} = req.params;

    try {
      let chats = await apiChat.findAllEmail(email);

      res.json({
        mensage: `Listado de Chats de la BD, email: ${email}`,
        chats,
      });

    } catch (error) {
      const error1 = new Error(
        `(getChatsEmail)-No se encuentran los Chats error: ${error}`
      );
      error.httpStatusCode = 400;

      return next(error1);
    }


  },

  //Envia un chat por id
  //
  getChat: async (req, res, next) => {
   
    try {
      const { id } = req.params;
   
      let chat= await apiChat.findById(id)
     

      res.json({
        mensage: `Chat con id:${chat[0]._id}`,
        Chat:chat,
      });

    } catch (error) {
      const error1 = new Error(`(getChat)-No se encuentra el Chat con el id: ${id}`);
      error.httpStatusCode = 400;

      return next(error1);  
    }
  },

  
  //Crea un registro de un chat
  //
  postChat: async (req, res,next) => { 
    
    
   try {

     const {email,tipoUs,fecha,texto} = req.body;
   
     let chat = {
       email:email,
       //fecha: calcFechaHora(),
       fecha: fecha,
       tipoUsuario:tipoUs,
       mensaje:texto
       };

     console.log('Controlador Post Chats Datos del Chat)')
     console.log(chat)

     let cha=await apiChat.create(chat)
 
     res.json({
       mensage: `Se agregó el chat con id:${cha._id}`,
       chat:cha,
     });


   } catch (error) {
    const error1 = new Error(
      `(postChat)-No se pudo crear el chat error: ${error}`
    );
    error.httpStatusCode = 400;

    return next(error1);

   }
  },

  

  //Borra un Chat
  //
  deleteChat: async(req, res,next) => {
    
    try {

       const { id } = req.params;
       let idError= await apiChat.deleteById(id)

       res.json({
        mensage: `Se borró el chat con id:${id}`,
      });

    } catch (error) {
      const error1 = new Error(`(deleteChat)-No se encuentra el chat con el id: ${id}`);
      error.httpStatusCode = 400;
      return next(error1);
    }
  },
   

};