//URL del servidor
//

//const URL='http://localhost:8080/'
const URL='https://joakowebbackendtrabfh.herokuapp.com/'


let idProducto=localStorage.getItem("idProducto");


/* console.log('Cargando editar Producto:')
console.log(`id del producto= ${idProducto}`) */


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
   fetch(URL+`api/productos/${idProducto}`)
      .then((response) => response.text())
       .then(data=>{
              const producto=JSON.parse(data)
              console.log(producto.producto)

             //Renderiza del lado del cliente usando HandleBard
             //
             let product = () =>producto.producto

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

              const productoClie = {
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



                 //Agregar al formulario Editar
                 //
               
                   let template1 = document.getElementById("handlebFormEditarProducto").innerHTML;
                   let compile1 = Handlebars.compile(template1);

                   let compiledHTML1 = compile1(productoClie);

                   document.getElementById('rendFormProd').innerHTML=compiledHTML1


                   })  


}


cargarUsuario()






