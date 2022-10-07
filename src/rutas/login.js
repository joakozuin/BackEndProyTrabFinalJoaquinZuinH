import { Router } from "express";
import passport from 'passport'

import logger from "../logger/logger.js";

const router = Router();

import {funcLogin} from '../controlador/login.js'

const {
    loginPostRegistro,
    loginGetRegistrar,
    loginGetErrorRegistro,
    postLogin,
    loginGetErrorLogin,
    loginGetDatos,
    loginGetLogout,
    getLogin
  } =funcLogin



router.post("/registro", loginPostRegistro);
router.get("/registrar", loginGetRegistrar);
router.get("/errorRegistro", loginGetErrorRegistro);
router.post("/", postLogin);
router.get("/errorLogin", loginGetErrorLogin);

/* router.get('/datos',isAuth,(req,res)=>{
    //res.render('info',{nombre:req.user.nombre})

}) */

router.get("/datos", loginGetDatos);
router.get("/logout", loginGetLogout);
router.get("/", getLogin);

export default router;
