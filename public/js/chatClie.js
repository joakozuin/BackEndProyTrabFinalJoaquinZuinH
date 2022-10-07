
//URL del servidor
//

 const URL='http://localhost:8080/'
//const URL='https://joakowebbackendtrabfh.herokuapp.com/'

let idChat=""

calcFechaHora=() => {
  const dato = new Date();
  const dia = dato.getDate();
  const mes = dato.getMonth() + 1;
  const ano = dato.getFullYear();
  const hor = dato.getHours();
  const min = dato.getMinutes();
  const seg = dato.getSeconds();
  const fecha = [dia, mes, ano].join("/").toString();
  const hora = [hor, min, seg].join(":").toString();
  return [fecha, hora].join(" ");
}

const socket=io()


const mensajesDiv=document.querySelector("#mensajesChat")
const botonEnv=document.querySelector("#enviarMens")



//Datos del usuario logeado
//
let nombreUsuario1 = {}



//Cargar Usuario Logeado
//
cargarUsuario=()=>{

  console.log("Recibiendo Usuario Logeado del servidor");
  console.log("URL del servidor");
  console.log(URL+"api/login/");


  // Petición HTTP Renderiza el usuario Logeado
    fetch(URL+"api/login/")
    .then((respuesta) =>{

           return respuesta.json()

        })

    .then(data=>{
          //const nombreUs=JSON.parse(data)
          console.log('Nombre del usuario logeado')
          console.log(data)
          console.log(data.nombre)
  
          nombreUsuario1 = {
            titulo: "Renderizado Usuario Usando Motor Handlebars",
            usuario:data.nombre.nombre,
            email:data.nombre.correo,
            tipoUs:data.nombre.tipo,
            avatar:data.nombre.urlFoto
            };
  
            console.log(nombreUsuario1)
  
             let template1 = document.getElementById("handlebUsuarioLogeado1").innerHTML;
             let compile1 = Handlebars.compile(template1);
  
             let compiledHTML1 = compile1(nombreUsuario1);
  
             document.getElementById('rendUsuarioLogeado1').innerHTML=compiledHTML1

             //cargarProd()
             
          })  
          .catch((error) => {

            console.error("Error:", error);
            
            //location.assign(URL+"login.html");
          });
}

cargarUsuario()





socket.on('mensaje',(mensajes)=>{

  console.log('Cliente recibe mensaje')
  console.log(mensajes)
  idChat=mensajes[0].idChat
  console.log('Cliente recibe idChat:'+idChat)

   mensajesDiv.innerHTML=mensajes.map(mensaje=>{
      return(
             `<div class="mui-row">
                <div class="mui-col-md-4">
                  <strong style="color:blue">${mensaje.email}</strong>
                </div>
                <div class="mui-col-md-3">
                  <p style="color:brown" >[${mensaje.fecha}]</p>
                </div>
                <div class="mui-col-md-5 "mui--text-left"">
                  <p style="color:green; font-style:italic">${mensaje.texto}</p>
                </div>
             </div>`
           )

   }).join(" ")

})




botonEnv.addEventListener('click',(e)=>{
  //e.preventDefault()

  //const inputEmail=document.querySelector("#email").value
  //const inputTipoUs=document.querySelector("#tipoUsuario").value
  const inputTexto=document.querySelector('#mensaje').value

  
  const mensajeChat={
    idChat:idChat,
    //email:inputEmail,
    fecha:calcFechaHora(),
    email:nombreUsuario1.email,
    tipoUs:nombreUsuario1.tipoUs,
    texto:inputTexto
}



  const mensaje={
      //email:inputEmail,
      fecha:calcFechaHora(),
      email:nombreUsuario1.email,
      tipoUs:nombreUsuario1.tipoUs,
      texto:inputTexto
  }

   console.log('Cliente envia mensaje'+mensajeChat)

   socket.emit('nuevoMensaje',mensajeChat)

   grabarChat(mensaje)

})



grabarChat=(mensaje)=>{

  console.log("Enviando mensaje al servidor:");
  console.log(mensaje)
  console.log("URL del servidor");
  console.log(URL+"api/chats/");


  fetch(URL+"api/chats/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mensaje),
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

}






const botonDeslogear=document.querySelector("#desLogearse")
//Deslogea al usuario
//
botonDeslogear.addEventListener("click", (e) => {
 
  e.preventDefault()

  console.log('Apretando el Boton deslogear')

 //cargar una pagina HTML
 //
    location.assign(URL+"logout.html");
    

})




