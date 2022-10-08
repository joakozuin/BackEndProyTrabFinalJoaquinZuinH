

//URL del servidor
//

//const URL='http://localhost:8080/'
const URL='https://joakowebbackendtrabfh.herokuapp.com/'


const botonEnvProd=document.querySelector("#enviarProd")
const botonDeslogear=document.querySelector("#desLogearse")
const botonChatear=document.querySelector("#chatear")

//Enviar Producto  del lado del cliente
//
 botonEnvProd.addEventListener("click", (e) => {
  e.preventDefault()

  console.log('Apretando el Boton enviar producto')

  const inputNombre = document.querySelector("#nombre").value;
  const inputDescripcion = document.querySelector("#descripcion").value;
  const inputCodigo = document.querySelector("#codigo").value;
  const inputurlFoto = document.querySelector("#urlFoto").value;
  const inputPrecio = document.querySelector("#precio").value;
  const inputStock = document.querySelector("#stock").value;

  const producto = {
    nombre: inputNombre,
    descripcion: inputDescripcion,
    codigo: Number(inputCodigo),
    urlFoto:inputurlFoto,
    precio:Number(inputPrecio),
    stock:Number(inputStock) 
  };

  console.log('Cliente enviando Producto')
  console.log(producto)

                      //socket.emit("nuevoProducto", producto);

  //Petición Post HTTP envia producto a la ruta
  //en formato JSON

    fetch(URL+"api/productos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  })
    .then((respuesta) =>{
          console.log("Todo bien:", respuesta);
          return respuesta.json()
    } )
    .then((data) => {
      console.log("Todo bien:", data.mensaje);

    })
    .catch((error) => {
      console.error("Error:", error);
    });

});  
 

//Deslogea al usuario
//
/* botonDeslogear.addEventListener("click", (e) => {
 
  e.preventDefault()

  console.log('Apretando el Boton deslogear')
  console.log(URL+"logout.html")

 //cargar una pagina HTML
 //
    location.assign(URL+"logout.html");

}) */


//Chatear
//
/* botonChatear.addEventListener("click", (e) => {
 
  e.preventDefault()

  console.log('Apretando el Boton Chatear')

 //cargar una pagina HTML
 //
    location.assign(URL+"chatAdm.html");

}) */

//Modal Perfil de Usuario
//
/* activateModal1=()=> {
        
  window.modal1.showModal()

} */


