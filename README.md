## Coder House
### Back End 2022
### Comisión 30950

## Joaquin Sebastian Zuin
### joaquinzuin16@gmail.com

------------
![image](./public/img/AbejaFlor.png)
# Proyecto E-Commerce Back End para el vivero Joaquin

El sistema, es una apiRest que proporciona las rutas necesarios para poder menjar un ecommerce relacionado con un vivero de plantas de interior o exterior.

# Dependencias BackEnd

- Node.js
- MongoDb,MongoDB Atlas
- Passport JWT
- Bcrypt
- Websocket
- Dotenv
- Motor Handlebars
- Nodemailer


# Dependencias FrontEnd

- Template Handlebars
- Material UI

El sistema, tiene un FrontEnd básico que permite probar algunas rutas, se activa en la raiz del
servidor
# Rutas provista por la app

```
this.apiCaminos = {
      carritos:'/api/carritos',
      productos:'/api/productos',
      ordenes:'/api/ordenes',
      chats:'/api/chats',
      login:'/api/login',
      info:"/api/infoServidor"
    };
 ```  
- rutas carritos
```
router.get('/',                        getCarritos)
router.get('/:id',                     getCarrito)
router.get('/:id/productos',           getProdsCarrito)
router.get('/usuario/:idU',            getUsCarrito)     //Envia el carrito del usuario
router.post('/:idU',                   postCarrito)      //crea carrito con id usuario
router.post('/:id/productos/:idP',     postProdCarrito)  //Agrega un producto al carrito
router.delete('/:id/productos/:idP',   deleteProdCarrito)//Borra un producto del carrito
router.delete('/:id',                   deleteCarrito)
 ```  
- rutas productos
```
router.get('/',              getProductos)
router.get('/:id',           getProducto)
router.get('/categoria/:cat',getCatProducto)
router.post('/',             postProducto)
router.post('/form',         postFormProducto)
router.put('/:id',           putProducto)
router.delete('/:id',        deleteProducto)
```
- rutas ordenes
```
router.get('/',              getOrdenes)
router.get('/:id',           getOrden)
router.get('/:id/productos', getProdsOrden)
router.post('/:idC',          postOrden)     //idC carrito, crea la orden el carrito tiene datos del cliente
router.delete('/:id',         deleteOrden)
```
- rutas chats

```
router.get('/',              getChats)
router.get('/email/:email',  getChatsEmail)
router.get('/:id',           getChat)
router.post('/',             postChat) 
router.delete('/:id',        deleteChat)

```
- rutas login

```
router.post("/registro",     loginPostRegistro);
router.get("/registrar",     loginGetRegistrar);
router.get("/errorRegistro", loginGetErrorRegistro);
router.post("/",             postLogin);
router.get("/errorLogin",    loginGetErrorLogin);
router.get("/datos",         loginGetDatos);
router.get("/logout",        loginGetLogout);
router.get("/",              getLogin);

```

- rutas info

```
router.get('/', getConfigServer);
```
# Deploy

Puede ejecutar una aplicación básica FrontEnd deployada en Heroku para testear algunas rutas desde el siguiente link:
[https://joakowebbackendtrabfh.herokuapp.com//](https://joakowebbackendtrabfh.herokuapp.com/)