import  Api from '../persistencia/contenedor/FsClass.js';
const api=new Api('/.env');

import {funcUtil} from '../util/util.js'
const{calcFechaHora}=funcUtil



export const funcInfoServidor = {

  //Envia todos los productos
  //
  getConfigServer: async (req, res, next) => {
    try {

      let Hay=false

      let datos= await api.findAll();
      const confi = datos.split('\r\n');

      console.log('Config='+confi.length)

      if (confi.length!=0){
        Hay=true
     }

      let config=[]

      confi.map(p=>{

        console.log('Parámetros:'+p)
          let conf={
            param:p
          }

         config.push(conf)
        
      })

      /* res.json({
        mensage: "Parámetros Configuración del Servidor",
        parámetros: config
       }); */

    
  
      res.render('main',
              {titulo:'Parámetros del Sevidor Usando Motor Handlebars',
               configu:config,
               Hay
      })
  


    } catch (error) {
      const error1 = new Error(
        `(getConfigServer)-No se encuentran la configuración del servidor error: ${error}`
      );
      error.httpStatusCode = 400;

      return next(error1);
    }
  },
}