<template>
  <div>
    <a href="#" @click="logout">Logout</a>
    <h2>HUNDIR LA FLOTA GAME</h2>
    <button @click="back"> atras </button>
    <br>
    
    <div class="total-game">
        <div class="nombres-jugador"></div>
        <div class="tablero-multiplayer">
            <div class="tablero-jugador" v-for="jugador in jugadores" :key="jugador.key">
                <span>{{jugador.nombre}}</span>
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
                    <button @click="rotarPosicion" class="boton-rotar">Rotar</button>
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
        </div>  
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Home',
  data () {
    return {
        jugadores: [
            {
            nombre: 'jugador 1',      
            },
            // {
            // nombre: 'jugador 2',      
            // },            
        ],
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
        tamaño: null,
        coordenadasBarcos: [],
        posicionSeleccionada: false,
        sumaCoordenadas: [],
        rotarBarco: false
      
    }
  },
  methods: {
    onHover (x, y) {
        this.posicion = `${x},${y}`
        // console.log(this.posicion);        
    },
    logout () {
      firebase.auth().signOut().then(()=> this.$router.replace('login'))
    },
    back () {
        this.$router.go(-1)
    },
    barcoEnTablero (barco) {
        this.tamaño = barco.tamaño
        console.log(barco.nombre)        
        barco.cliqueado = true       
              
    },
    posicionBarco () {
        console.log('coordenadas seleccionadas 1 barco',this.selected);
        this.coordenadasBarcos.push(...this.selected)
        console.log('suma de coordenadas de barcos',this.coordenadasBarcos);  
        console.log('tamaño',this.coordenadasBarcos.length);
        this.tamaño = null;
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
      
      posicionBarcoTablero () {         

        if(!this.coordenadasBarcos && !this.posicion) {
            return
        } else {
            let coor = this.coordenadasBarcos
            return coor
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scoped>

.active {
    background-color: gray!important;
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

</style>



