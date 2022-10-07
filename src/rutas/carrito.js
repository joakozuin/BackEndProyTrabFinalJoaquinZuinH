
import express from 'express';
const router = express.Router();


import {funcCarrito} from '../controlador/carrito.js'

const {
  getCarritos,
  getCarrito,
  getProdsCarrito,
  getUsCarrito,
  postCarrito,
  postProdCarrito,
  putCarrito,
  deleteCarrito,
  deleteProdCarrito
  }=funcCarrito

     /* console.log('Dentro Rutas de producto')
     console.log(__dirname) */

function admin(reg,res,next){
  if(acceso){
    next()
  }else{
    const error = new Error(`(Su perfil de usuario no tiene acceso a esta ruta`);
    error.httpStatusCode = 400;
    return next(error);
  }
    
};

router.get('/',                        getCarritos)
router.get('/:id',                     getCarrito)
router.get('/:id/productos',           getProdsCarrito)
router.get('/usuario/:idU',            getUsCarrito) //Envia el carrito del usuario
router.post('/:idU',                   postCarrito) //crea carrito con id usuario
//router.post('/:id/productos/',         postProdCarrito)//Agrega un producto al carrito
router.post('/:id/productos/:idP',     postProdCarrito)//Agrega un producto al carrito
router.delete('/:id/productos/:idP',   deleteProdCarrito)//Borra un producto del carrito
router.delete('/:id',                   deleteCarrito)

export default router