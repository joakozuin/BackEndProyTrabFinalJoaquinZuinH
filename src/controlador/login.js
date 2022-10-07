//import { Router } from "express";
import passport from 'passport'

import logger from '../logger/logger.js'

import  {twilioAccount} from '../mailer/mensajes.js'
import {transporter} from '../mailer/correos.js'

//const router = Router()

function isAuth(req,res,next){

    if(req.isAuthenticated()){
    
        next()
    } else {
        res.redirect('/api/login/errorLogin')
    }
}

const joaLogin=(req,res,next)=>{
    
    logger.info('Ingreso al Login')
    logger.info(req.body)
    logger.info(`Nombre:${req.body.nombre}`)
    logger.info(`Password:${req.body.password}`)

    next()
}



export const funcLogin = {
  //Verifica un Registro del usuario
  //
  loginPostRegistro: passport.authenticate("registro", {
    failureRedirect: "/api/login/errorRegistro",
    successRedirect: "/api/login/registrar",
  }),

  //Registra un Usuario Nuevo
  //
  loginGetRegistrar: async (req, res) => {
    try {
      //res.render('registro')
      logger.info("Registro Sin error");

      let htmlTemplate = `
      <h1>INFORMACION del Registro del USUARIO usando SendinBlue</h1>
      <h2> Bienvenido: ${req.user[0].nombre}</h2>
      `;

      //Funcion q envia e-mail
      const informacion = await transporter.sendMail({
        from: "JoaEziSystem <jzuin32@gmail.com>",
        to: "joaquinzuin16@gmail.com",
        subject: "Nodemailer JoaEzisystem Registro Usuarios",
        html: htmlTemplate,
        attachments: [
          {
            path: process.cwd() + "\\public\\imgAvatar\\AvatarJoaquinV02.jpg",
          },
        ],
      });

      logger.info(informacion);

      //Envia Mensaje por Whatsapp con twilio
      //-------------------------------------
      /* const Mensaje=`Prueba Twilio Registrando Usuarios Bienvenido/a: ${req.user[0].nombre}`
  
        twilioAccount.messages.create({
        body: Mensaje,
        from: "whatsapp:+14155238886",
        to: "whatsapp:+5492616486504",
       })
      .then(mensaje=>console.log(mensaje.sid))
      .done(); */

      logger.info(`Bienvenido: ${req.user[0].nombre}`);

      res.json({
        mensaje: "Registro sin error",
        nombre: req.user[0].nombre,
        error: false,
      });
    } catch (err) {
      res
        .status(400)
        .json({ mensaje: "Ha ocurrido un error el registro del usuario " });
    }
  },

  //Error al registrar un usuario
  //
  loginGetErrorRegistro: (req, res) => {
    logger.warn("Registro Error");
    //res.render('errorRegistro')
    res.json({
      mensaje: "Registro con error",
      nombre: "",
      error: true,
    });
  },

  //Raiz Ingreso login
  //
  postLogin: passport.authenticate("login", {
    failureRedirect: "/api/login/errorLogin",
    successRedirect: "/api/login/datos", //redirecciona a una ruta
    failureMessage: true,
    successMessage: true,
  }),

  //Error login
  //
  loginGetErrorLogin: (req, res) => {
    //res.render('errorLogin')
    logger.warn("ruta errorLogin-Login con Error");
    //console.log(req.user[0].nombre)
    res.json({
      mensaje: "Login con error",
      nombre: "",
      error: true,
    });
  },
  
  //Datos login
  //
  loginGetDatos:
    (isAuth,
    (req, res) => {
      //res.render('info',{nombre:req.user.nombre})
      logger.warn("ruta datos-Login sin Error");
      logger.info("RutaLogin usuario logeado con exito");
      logger.info(req.user[0].nombre);
      res.json({
        mensaje: "Login sin error",
        //nombre: req.user[0].nombre,
        nombre: req.user[0],
        error: false,
      });
    }),

  //Logaut
  //
  loginGetLogout: (req, res) => {
    logger.info("ruta datos-Login usuario deslogeado");
    logger.info(req.user[0].nombre);

    req.session.destroy((err) => {
      res.json({
        mensaje: "Solicitando nombre usuario deslogeado",
        nombre: req.user[0].nombre,
        error: false,
      });
    });
  },

  //Get login
  //
  getLogin: (req, res) => {
    //res.render('login')
    logger.info("ruta datos-Login usuario logeado");
    logger.info(req.user[0].nombre);

    res.json({
      mensaje: "Solicitando nombre usuario logeado",
      nombre: req.user[0],
      error: false,
    });
  },
};


