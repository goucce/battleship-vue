<template>
    <div>
        <form @submit.prevent="login">
            <input v-model="usuario" type="text" placeholder="Usuario">
            <input v-model="contrasena" type="password" placeholder="Contraseña">
            <input type="submit" value="Acceder">
        </form>
        <button @click="registro" >Registrarse</button>

        <pre>
            {{ $data }}
        </pre>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Login',
  data() {
    return {
      usuario: "",
      contrasena: ""
    }
  },

  methods: {

    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.usuario, this.contrasena)
            .then((user) => this.$router.replace('home'), (error) => console.error(error));           
    },

    registro() {
        this.$router.replace('registro')
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
