<template>
  <div class="home">
    <div class="cabecera">
        <h3>Estas dentro, ¡A luchar!</h3>
        <div>
            <button @click="back"> atras </button>
            <a href="#" @click="logout">Logout</a>
        </div>
    </div>   

    <div class="total-game">
        <div v-if="jugarActive===false" class="pasos">
            <span>Muy buenas, <strong>{{this.usuarioReal}}</strong></span>
            <span>Si quieres jugar, sigue estos pasos:</span>
            <span> <strong>1.</strong>  Selecciona uno barco.</span>
            <span><strong>2.</strong> Posicionate en el tablero.</span>
            <span><strong>3.</strong> Colocaló.</span>
            <span><strong>4.</strong> Repite con cada barco.</span>
            <span><strong>5.</strong> Clickea en JUGAR y disfruta.</span> 
        </div>

        <div class="nombres-jugador"></div>
        <div class="tablero-multiplayer">
            <div class="tablero-jugador">
                <!-- <span>{{jugador.nombre}}</span> -->
                <span>{{usuario}}</span>                
                <span><strong>Selecciona los barcos:</strong></span>
                <div class="barcos-box">
                    <button 
                    @click="barcoEnTablero(barco)" 
                    v-for="barco in barcos" 
                    :key="barco.key" 
                    :disabled="barcoBloqueado(barco)" 
                    :class="{'barco-bloqueado': barco.cliqueado==true}"
                    >
                        {{barco.nombre}}
                    </button>                     
                </div>
                <div class="botones-acccion">
                    <button @click="rotarPosicion" class="boton-rotar">Rotar</button>
                    <button @click="enviarDatos" class="boton-rotar">Jugar</button>
                    
                </div>   
                <div class="tablero">
                    <table class="board">
                        <tr v-for="y in 10" :key="y">
                            <td v-for="x in 10" :key="x"
                                class="cuadrado"
                                :class="{
                                    'active': (selected && selected.includes(`${x},${y}`)) || (coordenadasBarcos && coordenadasBarcos.includes(`${x},${y}`)),
                                    }"
                                @mouseover="onHover(x,y)"
                                @click="posicionBarco"
                                >
                            </td>                                    
                        </tr>                       
                    </table>
                </div>                             
            </div>
            <div class="tablero-jugador" v-if="jugarActive===true ">
                <span>{{ultimaPartida.aUsuario}}</span>                
                <span class="text-oponente"><strong>Dispara contra los barcos:</strong></span>
                <div class="tablero">
                    <table class="board">
                        <tr v-for="y in 10" :key="y">
                            <td v-for="x in 10" :key="x"
                                class="cuadrado"
                                :class="
                                [
                                    //{
                                      //  'active': (ultimaPartida.coordenadasBarcos && ultimaPartida.coordenadasBarcos.includes(`${x},${y}`))
                                    //},
                                    {
                                        'tocado': (ultimaPartida.coordenadasBarcos && ultimaPartida.coordenadasBarcos.includes(`${x},${y}`) && (coordenadasBarcosOponente && coordenadasBarcosOponente.includes(`${x},${y}`))),
                                    },
                                    {
                                        'active': (selectedOponente && selectedOponente.includes(`${x},${y}`))
                                    },
                                    {
                                        'agua': (ultimaPartida.coordenadasBarcos && !ultimaPartida.coordenadasBarcos.includes(`${x},${y}`) && (coordenadasBarcosOponente && coordenadasBarcosOponente.includes(`${x},${y}`))),
                                    },
                                ]"
                                @mouseover="onHoverOponente(x,y)"
                                @click="posicionBarcoOponente"
                                >
                            </td>                                    
                        </tr>                       
                    </table>
                </div>                             
            </div>             
        </div>  
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Home',
  props: {
        // partida: {
        //     type: Object,
        //     required: true            
        // }
    },
  data () {
    return {
        jugadores: [],
        barcos: [
            {
            nombre: 'Carrier',
            tamaño: 5,
            cliqueado: false

            },
            {
            nombre: 'Battleship',
            tamaño: 4,
            cliqueado: false

            },
            {
            nombre: 'Cruiser',
            tamaño: 3,
            cliqueado: false

            },
            {
            nombre: 'Submarine',
            tamaño: 3,
            cliqueado: false

            },
            {
            nombre: 'Destroyer',
            tamaño: 2,
            cliqueado: false

            },         
        ],
        posicion: null,
        posicionOponente: null,
        tamaño: null,
        tamañoOponente: 1,
        coordenadasBarcos: [],
        posicionSeleccionada: false,
        sumaCoordenadas: [],
        rotarBarco: false,
        usuario: firebase.auth().currentUser.email,
        usuarioReal: [],
        keyUsuario: firebase.auth().currentUser.uid,
        partidasOponente: [],
        coordenadasBarcosOponente: [],
        coordenadasAgua: [],
        jugarActive: false,
        ultimaPartida: {},
        guardarCoordenadas: [],
        nombreOponente: '',
        infoPartidasJugadores: []
              
    }
  },
  props : [{
      partidas: Array

  }],
  created () {

      this.usuarioReal = this.usuario.split('@')
      console.log(this.usuarioReal);
      
      this.usuarioReal = this.usuarioReal[0]
      
    const db = firebase.database();
        db.ref('usuarios').child('marius')
        .on('value', snapshot => this.cargarPartidas(snapshot.val()))
        
        db.ref('usuarios')
        .on('value', snapshot => this.cargarJugadores(snapshot.val()))       
        
  },
  methods: {
    onHover (x, y) {
        this.posicion = `${x},${y}`
        // console.log(this.posicion);        
    },
    onHoverOponente (x,y) {
        this.posicionOponente = `${x},${y}` 
        // console.log(this.posicionOponente);      

    },
    logout () {
      firebase.auth().signOut().then(()=> this.$router.replace('login'))
    },
    back () {
        this.$router.replace('home')
    },
    barcoEnTablero (barco) {
        this.tamaño = barco.tamaño
        // console.log(barco.nombre)        
        barco.cliqueado = true       
              
    },
    posicionBarco () {
        // console.log('coordenadas seleccionadas 1 barco',this.selected);
        this.coordenadasBarcos.push(...this.selected)
        // console.log('suma de coordenadas de barcos',this.coordenadasBarcos);  
        // console.log('tamaño',this.coordenadasBarcos.length);
        this.tamaño = null;
    },
    posicionBarcoOponente () {
        // console.log('coordenadas seleccionadas 1 ',this.selectedOponente);
        this.coordenadasBarcosOponente.push(...this.selectedOponente)
        // this.coordenadasAgua.push(...this.selectedOponente)
        
        for (let i = 0; i < this.ultimaPartida.coordenadasBarcos.length; i++) {
            if (this.coordenadasBarcosOponente!=this.ultimaPartida.coordenadasBarcos[i]) {
                this.coordenadasAgua.push()                                              
            }            
        }

        this.usuarioReal = this.usuario.split("@")
        this.nombreOponente = this.ultimaPartida.aUsuario.split("@")
        this.nombreOponente = this.nombreOponente[0]
        const db = firebase.database()
        db
          .ref("partidas").child(this.usuarioReal[0]).child(this.nombreOponente)
          .push({
            coordenadasBarcosOponente: this.coordenadasBarcosOponente,  
            coordenadasBarcosUsuario: this.coordenadasBarcos,
            contrincante: this.nombreOponente,
            coordenadasDondeAtacar: this.ultimaPartida.coordenadasBarcos,
            jugador: this.usuarioReal[0],
            // coordenadasBarcosElegidasOponente: this.ultimaPartida.coordenadasBarco            
          })
        
        
    },
    enviarDatos () {
        this.jugarActive = true         
        this.usuarioReal = this.usuario.split("@")
        // console.log(this.usuarioReal)        
        const db = firebase.database()
        db
          .ref("usuarios").child(this.usuarioReal[0])
          .push({
            aUsuario: this.usuario,  
            coordenadasBarcos: this.coordenadasBarcos,
            
          })
        
        let numeroRandom = Math.floor((Math.random() * this.infoPartidasJugadores.length-1) + 1);
        // console.log(numeroRandom); 

        const partidasUnJugador = []
        Object.keys(this.infoPartidasJugadores[numeroRandom]).forEach(key => {
            partidasUnJugador.push(this.infoPartidasJugadores[numeroRandom][key])
        })

        this.ultimaPartida = partidasUnJugador.pop()
        
        // for (const prop in this.jugadores) {
        //     console.log(`obj.${prop} = ${obj[prop]}`);
        // }        
    },
    
    barcoBloqueado (barco) {
        return barco.cliqueado
    },
    rotarPosicion () {        
       if (this.rotarBarco == true) {
           this.rotarBarco = false
       } else {
           this.rotarBarco = true
       }
    },

    cargarPartidas (partidas) {
        this.partidasOponente = [];
        for (let key in partidas) {
            this.partidasOponente.push({
                coordenadasBarcos: partidas[key].coordenadasBarcos,
                username: partidas[key].aUsuario,
                key: key
            })            
        }
        // console.log(this.partidasOponente);        
    },

    cargarJugadores (jugadores) {
        
         this.infoPartidasJugadores = []
        Object.keys(jugadores).forEach(key => {
            this.infoPartidasJugadores.push(jugadores[key])
        })
        // console.log('JUGADORES',jugadores);

        // let numeroRandom = Math.floor((Math.random() * this.infoPartidasJugadores.length-1) + 1);
        // console.log(numeroRandom); 

        // const partidasUnJugador = []
        // Object.keys(this.infoPartidasJugadores[numeroRandom]).forEach(key => {
        //     partidasUnJugador.push(this.infoPartidasJugadores[numeroRandom][key])
        // })

        // this.ultimaPartida = partidasUnJugador.pop()
        

// console.log('usuario Real', this.usuarioReal[0]);
        

//         this.contrincantes = Object.keys(jugadores).filter(j => j !== this.usuarioReal[0] )
//         this.contrincantes = this.contrincantes.map(j => {return jugadores[j]})
        
//         console.log('contrincantes',this.contrincantes);
        
        


//         console.log('contrincantes numero random', this.contrincantes[numeroRandom]);
        


//         const partidasUnJugador = []
//         Object.keys(infoPartidasJugadores[numeroRandom]).forEach(key => {
//             partidasUnJugador.push(infoPartidasJugadores[numeroRandom].key)
//         })

//         console.log(this.partidasUnJugador);                
        
    }
    
  },
  computed: {
      selected () {
          if (!this.posicion){
              this.posicion = null
              this.tamaño = null
             return
           } 
        //   const size = 3
          let selectede = []
          const [x, y] = this.posicion.split(',')
          for (let i = 0; i < this.tamaño; i++) {
            if (this.rotarBarco==false) {
                selectede.push(`${x},${Number(y) + i}`)                
            }else {
                selectede.push(`${Number(x) + i},${y}`)
            }            
          }
        //   console.log(selectede);          
          return selectede
      },

      selectedOponente () {
        let selectede = []
        if (!this.posicionOponente){
            this.posicionOponente = null
            this.tamañoOponente = null
            return
        } else {           
            const [x, y] = this.posicionOponente.split(',')        
            selectede.push(`${x},${y}`)                   
        }
            return selectede

      },
      
      posicionBarcoTablero () {         

        if(!this.coordenadasBarcos && !this.posicion) {
            return
        } else {
            let coor = this.coordenadasBarcos
            return coor
        }
      },


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scoped>

.active {
    background-color: gray!important;
}
.tocado {
    background-color: red!important;
}
.agua {
    background-color: blue!important;
}

.click {
    background-color: gray!important;
}

.tablero-multiplayer {
    /* border: 1px solid grey; */
    /* height: 60vh; */
    /* width: 80vw; */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around; 

}
.boton-rotar {
    background-color: aquamarine;
}

.tablero-jugador {
    /* border: 1px solid grey; */
    height: 500px;
    width: 400px;
    margin: 15px;
    display: flex;
    flex-direction: column;
}

.tablero {
    border: 1px solid grey;
    height: 400px;
    width: 400px;
    /* margin: 5px;  */
}

.board {
    height: 100%;
    width: 100%;
}

.text-oponente {
    margin-bottom: 70px;
}

.cuadrado {
    border: 1px solid grey;
    background-color: skyblue;
}
.barco-bloqueado {
    background-color: #fd0a0a94;
}

.barcos-box {
    display: flex;
    justify-content: space-evenly;
    margin: 10px;
    flex-direction: initial;
}

.botones-acccion {
    margin: 8px;
}

.botones-acccion button {
    margin: 8px;
    border-radius: 4px;

}

.tablero-multiplayer {
    justify-content: space-between;
    padding-left: 8rem;
    padding-right: 8rem;
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

.home {
  padding: 4rem;
}

.pasos {
    background-color: #FFFFFF;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.08);
    box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.08);
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    
}

.pasos span {
    margin-bottom: 1rem;
}

.pasos span stron {
    font-weight: 800;
}

.total-game {
    display: flex;
}

</style>



