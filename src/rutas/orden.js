
import express from 'express';
const router = express.Router();


import {funcOrden} from '../controlador/orden.js'

const {
  getOrdenes,
  getOrden,
  getProdsOrden,
  postOrden,
  deleteOrden,
  }=funcOrden

     /* console.log('Dentro Rutas de Ordenes')
     console.log(__dirname) */


router.get('/',              getOrdenes)
router.get('/:id',           getOrden)
router.get('/:id/productos', getProdsOrden)
router.post('/:idC',          postOrden) //idC carrito, crea la orden el carrito tiene datos del cliente
router.delete('/:id',         deleteOrden)

export default router