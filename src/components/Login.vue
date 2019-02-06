<template>
    <div class="login">
        <span>LOGIN</span>
        <form @submit.prevent="login">
            <input v-model="usuario" type="text" placeholder="Usuario">
            <input v-model="contrasena" type="password" placeholder="Contraseña">
            <input type="submit" value="Acceder">
        </form>
        <button @click="registro">Registrarse</button>      
    </div>
</template>

<script>
import firebase from "firebase";
// import Home from '@/components/Home.vue'

export default {
  name: "Login",
  data() {
    return {
      usuario: null,
      contrasena: null
    };
  },

  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.usuario, this.contrasena)
        .then(
          user => this.$router.replace("home"),
          error => console.error(error)
        );
    },

    registro() {
      this.$router.replace("registro");
    }
  },

  components: {
    // Home
  }
};
</script>

<style>
.login {
    justify-content: center;
}

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
