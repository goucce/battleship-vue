<template>
    <div>
        <h2>Registro</h2>
        <form @submit.prevent="registro">
            <input v-model="usuario" type="text" placeholder="Usuario">
            <input v-model="contrasena" type="password" placeholder="Contraseña">
            <input @click="back" type="submit" value="Registrarme">
        </form>

        <pre>
            {{ $data }}
        </pre>
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
div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

form > * {
  display: block;
}
</style>