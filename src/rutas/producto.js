

import {Router} from 'express'
const router = Router();

import {funcProductos} from '../controlador/producto.js'

const {
  getProductos,
  getProducto,
  getCatProducto,
  postProducto,
  postFormProducto,
  putProducto,
  deleteProducto
  } =funcProductos

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

router.get('/',              getProductos)
router.get('/:id',           getProducto)
router.get('/categoria/:cat',getCatProducto)
router.post('/',             postProducto)
router.post('/form',         postFormProducto)
router.put('/:id',           putProducto)
router.delete('/:id',        deleteProducto)

export default router