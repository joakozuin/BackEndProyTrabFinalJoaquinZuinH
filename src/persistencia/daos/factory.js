import dotenv from 'dotenv';
 dotenv.config();

 let productosDao
 let carritosDao
 let usuariosDao
 let ordenesDao
 let chatsDao

   const BaseDatos=process.env.nombreBD || 'MongoDB'

   console.log("Base Datos env: "+BaseDatos)

  switch (BaseDatos) {
    case 'MongoDB':
      console.log("Se está usando MongoDB como Base de datos")
      console.log("-----------------------------------------")

      import("./productos/MongoDBProductos.js").then(({MongoDBProductos})=>{
        productosDao=new MongoDBProductos()
      })

      import("./carritos/MongoDBCarritos.js").then(({MongoDBCarritos})=>{
        carritosDao=new MongoDBCarritos()
      })

      import("./usuarios/MongoDBUsuarios.js").then(({MongoDBUsuarios})=>{
        usuariosDao=new MongoDBUsuarios()
      })

      import("./chats/MongoDBChats.js").then(({MongoDBChats})=>{
        chatsDao=new MongoDBChats()
      })

      import("./ordenes/MongoDBOrdenes.js").then(({MongoDBOrdenes})=>{
        ordenesDao=new MongoDBOrdenes()
      })
      
    break;

    case "FireBase":
        console.log("Se está usando fireBase como Base de datos")
        console.log("-----------------------------------------")

          import("./productos/FireBaseDBProductos.js").then(({FireBaseDBProductos})=>{
          productosDao=new FireBaseDBProductos()
        })
  
        import("./carritos/FireBaseDBCarritos.js").then(({FireBaseDBCarritos})=>{
          carritosDao=new FireBaseDBCarritos()
        })  

    break;

    default:
      console.log("Llegó al Default del switch, configuración Tipo de base de Datos"
      );
    break;
  }

  export {productosDao,carritosDao,usuariosDao,ordenesDao,chatsDao}