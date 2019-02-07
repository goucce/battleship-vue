<template>
    <div class="login">
      <div class="log">
        <span><strong>REGISTRO</strong> </span>       
        <form @submit.prevent="registro">
            <input v-model="usuario" type="text" placeholder="Escribe tu usuario">
            <input v-model="contrasena" type="password" placeholder="Escribe tu contraseña">
            <input @click="back" type="submit" value="Registrarme">
        </form>       
    </div>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Registro",
  data() {
    return {
      usuario: "",
      contrasena: ""
    };
  },

  methods: {
    registro() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.usuario, this.contrasena)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {  
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
    back() {
        this.$router.replace('login')

    }
  }
};
</script>

<style>
.login {
    justify-content: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 70vh;
}

.log {

    background-color: #FFFFFF;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    padding: 2rem;
    box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.08);
}

.log span strong {
    font-weight: 800;
    margin-bottom: 1rem; 
}

</style>