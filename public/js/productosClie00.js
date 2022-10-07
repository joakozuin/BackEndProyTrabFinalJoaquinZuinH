//URL del servidor
//

const URL='http://localhost:8080/'
//const URL='https://joakowebbackendtrabfh.herokuapp.com/'



//Cargar Usuario Logeado
//
cargarUsuario=()=>{

  console.log("Recibiendo Usuario Logeado del servidor");
  // Petición HTTP Renderiza el usuario Logeado
  
    fetch(URL+"api/login")
    .then((respuesta) =>{

           return respuesta.json()

        })

    .then(data=>{
          //const nombreUs=JSON.parse(data)
          console.log('Nombre del usuario logeado')
          console.log(data)
          console.log(data.nombre)
  
          nombreUsuario = {
            titulo: "Renderizado Usuario Usando Motor Handlebars",
            usuario:data.nombre.nombre,
            edad:data.nombre.edad,
            tipo:data.nombre.tipo,
            correo:data.nombre.correo,
            avatar:data.nombre.urlFoto
            };
  
            console.log(nombreUsuario)
  
             let template = document.getElementById("handlebUsuarioLogeado").innerHTML;
             let compile = Handlebars.compile(template);
  
             let compiledHTML = compile(nombreUsuario);
  
             document.getElementById('rendUsuarioLogeado').innerHTML=compiledHTML


             let template1 = document.getElementById("handlebUsuarioLogeado1").innerHTML;
             let compile1 = Handlebars.compile(template1);
  
             let compiledHTML1 = compile1(nombreUsuario);
  
             document.getElementById('rendUsuarioLogeado1').innerHTML=compiledHTML1


             cargarProd()

             cargarCarrito()

             
          })  
          .catch((error) => {

            console.error("Error:", error);
            
            location.assign(URL+"index.html");
           
          });
}




//Pedir los nuevos productos
//
cargarProd=()=>{
  
  /* productos.map(producto=>{

      console.log(producto.titulo);
      console.log(producto.precio);

    })  */

  console.log("Cliente recibiendo Producto del servidor");
  // Petición HTTP Renderiza lado Servidor
   fetch(URL+"api/productos")
      .then((response) => response.text())
       .then(data=>{
              const productos=JSON.parse(data)
              console.log(productos.productos)

             //Renderiza del lado del cliente usando HandleBard
             //
             let product = () =>productos.productos

             let prodHay=false
             let prodHayUa=false
             let prodHayUu=false

             let usuario=true

             if (product().length != 0) {
               prodHay = true;
              }

              if(prodHay){
                 if(usuario){
                  prodHayUa=true
                  prodHayUu=false
                 }else{
                  prodHayUa=false
                  prodHayUu=true
                 }
              }else{
                prodHayUa=false
                prodHayUu=false
              }

               productoClie = {
                   titulo: "Renderizado de Productos Usando Motor Handlebars",
                   prod: product(),
                   prodHay,
                   prodHayUa,
                   prodHayUu
                   };

                  let template = document.getElementById("handlebTablaProductos").innerHTML;
                    let compile = Handlebars.compile(template);

                    let compiledHTML = compile(productoClie);

                    document.getElementById('rendProd').innerHTML=compiledHTML

                   })  


}
//Pedir los productos del carrito del cliente
//
cargarCarrito=()=>{
  
  /* productos.map(producto=>{

      console.log(producto.titulo);
      console.log(producto.precio);

    })  */

 let Usuario=JSON.parse(localStorage.getItem("usuario"));


  console.log("Cliente recibiendo Productos del carrito del cliente desde el servidor");
  console.log(Usuario._id)
  //-----------------------------------------------------------------------------------------------
  // Petición HTTP Renderiza lado Servidor
   fetch(URL+`api/carritos/usuario/${Usuario._id}`)
      .then((response) => response.text())
      .then(data=>{
              const carr=JSON.parse(data)
              console.log(carr.carrito)

             //Renderiza del lado del cliente usando HandleBard
             //
             let product = () =>carr.carrito

             let prodHay=false
             let prodHayUa=false
             let prodHayUu=false

             let usuario=true


              if (product()) {
                prodHay = true;
               }

              if(prodHay){
                 if(usuario){
                  prodHayUa=true
                  prodHayUu=false
                 }else{
                  prodHayUa=false
                  prodHayUu=true
                 }
              }else{
                prodHayUa=false
                prodHayUu=false
              }

               productoCarritoClie = {
                   titulo: "Renderizado de Productos Usando Motor Handlebars",
                   prod: product(),
                   prodHay,
                   prodHayUa,
                   prodHayUu
                   };

                   console.log(`ProductosHay:`)
                   console.log(prodHay)


                  let template5 = document.getElementById("handlebProductoCarrito").innerHTML;
                  let compile5 = Handlebars.compile(template5);

                  let compiledHTML5 = compile5(productoCarritoClie);

                  document.getElementById('rendProdCarrito').innerHTML=compiledHTML5

               })  

//-----------------------------------------------------------------------------------


}


cargarUsuario()






