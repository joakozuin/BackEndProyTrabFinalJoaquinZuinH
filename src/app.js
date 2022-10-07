
import dotenv from 'dotenv';
dotenv.config();

import Servidor from './persistencia/contenedor/servidorClass.js';

arranServidor()

function arranServidor(){

    const servidor = new Servidor();
    servidor.escuchando();

}

