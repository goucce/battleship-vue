<template>
  <div>
      <a href="#" @click="logout">Logout</a>
      <h2>EJEMPLOS FIREBASE</h2>
      <button @click="back"> atras </button>

      <form id="Formulario" @submit.prevent="enviarMensaje">
          <textarea name="mensaje" v-model="mensaje" id="mensaje" cols="30" rows="10"></textarea>
          <br>
          <input type="submit" value="enviar">
      </form>
      <hr>
      <h1>Mensajes</h1>
      <ul>
          <li v-for="mensaje in mensajes" :key="mensaje.id">
             <span contenteditable="true" @blur="editarMensaje($event, mensaje.key)" >{{mensaje.mensaje}} </span>
              <small><i>({{mensaje.username}})</i></small>  
              <button @click="eliminarMensaje(mensaje.key)">x</button>            
          </li>
      </ul>
  </div>
</template>

<script>
import firebase, { functions } from "firebase";

export default {
  name: "Examples",
  data  () {
    return {
        mensaje: null,
        username: 'juan',
        mensajes: []
          
    };
  },
  created () {
     //devolveremos todo lo que tenemos en la base de datos de referencia chats 
    const db = firebase.database();
        db.ref('chats')
        .on('value', snapshot => this.cargarMensajes(snapshot.val())) //on -- se actualiza todo el rato
                                                                      //once -- solamente la primera vez
//****************************** */

    //Hacemos referencia a guardar en otro lado de la base de datos la key de un elemento
        const key = db.ref('/chats').push().key;
        db.ref('/chats').child(key).set({
            // mensaje: 'hola set',
            // username: 'juan',
        });

        db.ref('/perfiles')
            .child('marius').child('chats').child(key)
            .set(true)
    //Hacemos referencia a guardar en otro lado de la base de datos la key de un elemento -- fin

//****************************** */
    //Listar todos los datos que tenemos en la base de datos
    const chats = db.ref('/chats');
    
    //childAdded --- vemos array con todos los datos lo que hay dentro de chats
    // chats.on('child_added', (data) => console.log(data.val()));

    //childChange --- Cuando cambie un dato de la base de datos nos mostrará ese que ha cambiado
    // chats.on('child_changed', (data) => console.log(data.val()));

    //childRemoved --- Devuelve lo que había dentro de ese elemento que hemos eliminado
    chats.on('child_removed', (data) => console.log(data.val()));

    }, 

  methods: {

    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => this.$router.replace("login"));
    },

    back () {
        this.$router.go(-1)
    },    

    //cargamos los mensajes en la variable mensajes que tenemos arriba como array vacio. 
    cargarMensajes (mensajes) {
        this.mensajes = [];
        for (let key in mensajes) {
            this.mensajes.push({
                mensaje: mensajes[key].mensaje,
                username: mensajes[key].username,
                key: key
            })            
        }
    },

    enviarMensaje () {
        const db = firebase.database();
        db
          .ref("chats")
          .push({
            username: this.username,
            mensaje: this.mensaje
          })
          //Aquí se obtendrá la key por la cual se guarda el mensaje en la base de datos
          .then((data) => {
            console.info("Mensaje enviado");
            mensaje.value = "";
            console.log(data.key);            
            mensaje.value = "";
          });
    },

    editarMensaje (mensaje, key) {
        const db = firebase.database();
        console.log(mensaje.target.innerHTML,key);
        db.ref('/chats/' + key).update({
            mensaje: mensaje.target.innerHTML
        });
    },

    eliminarMensaje (key) {
        const db = firebase.database();
        if (confirm('¿Seguro?')) {
            db.ref('/chats/' + key).remove();
         }

    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>