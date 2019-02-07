<template>
    <div class="login">
        <div class="log">
        <span><strong>LOGIN</strong> </span>
        <div>
            <form @submit.prevent="login">
                <input v-model="usuario" type="text" placeholder="Usuario">
                <input v-model="contrasena" type="password" placeholder="Contraseña">
                <input type="submit" value="Acceder">
            </form>
        </div>
        <button @click="registro">Registrarse</button>      

        </div>
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
