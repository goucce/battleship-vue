<template>
  <div class="home">
    <div class="cabecera">
      <h3>Bienvenido, {{usuarioReal[0]}}</h3>
      <a href="#" @click="logout">Logout</a>
    </div>

    <div class="jugar-nueva-partida">
      <button @click="game">JUGAR UNA NUEVA PARTIDA</button>
    </div>

    <div class="cuerpo-home">

      <div class="partidas-jugador">
        <h2>Todas tus partidas:</h2>
        <div class="tarjeta-partida" 
              v-for="partida in partidas" :key="partida.id"
              @click="verPartida(partida)"
              >
          <span>{{partida.jugador}}</span>
          <span class="versus">VS</span>
          <span>{{partida.contrincante}}</span>          
        </div>
      </div>
      <div>
        <VerJuego
            v-if="clickPartida"
            :partidaSeleccionada="partidaSeleccionada"
          />
      </div>
    </div>

      <!-- <button @click="goExample">Ejemplos Firebase</button> -->

  </div>
</template>

<script>
import firebase from 'firebase'
import VerJuego from '@/components/VerJuego.vue'

export default {
  name: 'Home',


  data () {
    return {
      usuario: firebase.auth().currentUser.email,
      partidas: [],
      usuarioReal:[],
      keyUsuario: firebase.auth().currentUser.uid,
      ultimaPartida: {},
      clickPartida: false,
      partidaSeleccionada: [],
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
        // this.$router.push( {path: 'game', params:{partida}})
        this.clickPartida = true
        console.log('partida',partida);
        this.partidaSeleccionada = partida
        
    }
  },
  components: {
    VerJuego
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.home {
  padding: 4rem;
}

.cabecera {
  display: flex;
  justify-content: space-between;
  background-color: #FFFFFF;
  border: 1px solid #DDDDDD;
  border-radius: 4px;
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.08);
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.jugar-nueva-partida {
  font-size: 20px;
}

.cuerpo-home {
  display: flex;
}

.jugar-nueva-partida button {
    background-color: #FFFFFF;
    border: 1px solid #DDDDDD;
    border-radius: 28px;
    box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.08);
    padding: 1rem;
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
