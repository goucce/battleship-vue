<template>
  <div>
      <h3>Username: {{usuario}}</h3>
      <a href="#" @click="logout">Logout</a>
      <h2>Todas las partidas del jugador</h2>
      <button @click="game">Juagar partida</button>
      <button @click="goExample">Ejemplos Firebase</button>
      <div class="tarjeta-partida" 
            v-for="partida in partidas" :key="partida.id"
            >
        <span>{{partida.username}}</span>
        <span class="versus">VS</span>
        <span>Contrincante</span> 
      </div>

  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Home',

  data () {
    return {
      usuario: firebase.auth().currentUser.email,
      partidas: [],
      keyUsuario: firebase.auth().currentUser.uid
    }
  },
  created () {
    const db = firebase.database();
        db.ref('usuarios').child(this.keyUsuario)
        .on('value', snapshot => this.cargarPartidas(snapshot.val()))

  },
  methods: {
    logout () {
      firebase.auth().signOut().then(()=> this.$router.replace('login'))
    },
    game () {
      this.$router.replace('game')
    },
    goExample () {
      this.$router.replace('examples')
    },
    cargarPartidas (partidas) {
        this.partidas = [];
        for (let key in partidas) {
            this.partidas.push({
                coordenadasBarcos: partidas[key].coordenadasBarcos,
                username: partidas[key].aUsuario,
                key: key
            })            
        }
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

.tarjeta-partida {
  background-color: #FFFFFF;
  border: 1px solid #DDDDDD;
  border-radius: 4px;
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.08);
  margin: 16px;
  height: 25vh;
  background: skyblue;
  display: flex;
  justify-content: space-evenly;
  align-items: center;  
  
}

.tarjeta-partida span {
  font-weight: 600;
}

.versus {
  font-size: 33px;
}
</style>
