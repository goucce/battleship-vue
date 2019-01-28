<template>
  <div>
      <a href="#" @click="logout">Logout</a>
      <h2>Todas las partidas del jugador</h2>
      <button @click="game">Juagar partida</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(()=> this.$router.replace('login'))
    },
    game () {
      this.$router.replace('game')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
