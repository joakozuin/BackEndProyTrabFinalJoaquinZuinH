
import express from 'express';
const router = express.Router();


import {funcChat} from '../controlador/chat.js'

const {
  getChats,
  getChatsEmail,
  getChat,
  postChat,
  deleteChat,
  }=funcChat

     /* console.log('Dentro Rutas de Ordenes')
     console.log(__dirname) */


router.get('/',              getChats)
router.get('/email/:email',  getChatsEmail)
router.get('/:id',           getChat)
router.post('/',             postChat) 
router.delete('/:id',        deleteChat)

export default router