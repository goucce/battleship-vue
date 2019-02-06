<template>
  <div>
      <h3>Username: {{usuarioReal[0]}}</h3>
      <a href="#" @click="logout">Logout</a>
      <h2>Todas las partidas del jugador</h2>
      <button @click="game">Juagar partida</button>
      <button @click="goExample">Ejemplos Firebase</button>
      <div class="tarjeta-partida" 
            v-for="partida in partidas" :key="partida.id"
            @click="verPartida(partida)"
            >
        <span>{{partida.jugador}}</span>
        <span class="versus">VS</span>
        <span>{{partida.contrincante}}</span> 
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
      usuarioReal:[],
      keyUsuario: firebase.auth().currentUser.uid,
      ultimaPartida: {}
    }
  },
  created () {
    this.usuarioReal = this.usuario.split("@")
    const db = firebase.database();
        db.ref('partidas').child(this.usuarioReal[0])
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
      console.log('partidas',partidas);

      const infoPartidas = []
      
      Object.keys(partidas).forEach(key => {infoPartidas.push(partidas[key])})

      console.log('infoPartida',infoPartidas);
      console.log('infoPartida 0',infoPartidas[0]);


      for (let i = 0; i < infoPartidas.length; i++) {
        const infoPartidas2 = []
        Object.keys(infoPartidas[i]).forEach(key => {infoPartidas2.push(infoPartidas[i][key])})
        // console.log('infoPartidas 2',infoPartidas2);
  
        let ultimaPartida = infoPartidas2.pop()
        // console.log('ultima partida', ultimaPartida);
  
        this.partidas.push(ultimaPartida)       
        
      }

      console.log(this.partidas);
    },

    verPartida (partida) {
        this.$router.push( {path: 'game', params:{partida}})
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
