import {Router} from 'express'
const router = Router();

import {funcInfoServidor} from '../controlador/infoServidor.js'

const {
    getConfigServer,
 
  } =funcInfoServidor

router.get('/', getConfigServer);


export default router