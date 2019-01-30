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
                    <button @click="barcoEnTablero(barco)" v-for="barco in barcos" :key="barco.key">
                        {{barco.nombre}}
                    </button>
                </div>   
                <div class="tablero">
                    <table class="board">
                        <tr v-for="y in 10" :key="y">
                            <td v-for="x in 10" :key="x"
                                class="cuadrado"
                                :class="{
                                    'active': selected && selected.includes(`${x},${y}`),
                                    
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
            {
            nombre: 'jugador 2',      
            },            
        ],
        barcos: [
            {
            nombre: 'Carrier',
            tamaño: 5,

            },
            {
            nombre: 'Battleship',
            tamaño: 4,

            },
            {
            nombre: 'Cruiser',
            tamaño: 3,

            },
            {
            nombre: 'Submarine',
            tamaño: 3,

            },
            {
            nombre: 'Destroyer',
            tamaño: 2,

            },         
        ],
        posicion: null,
        tamaño: null,
        coordenadasBarco: [],
        
      
    }
  },
  methods: {
    isSelected (x, y) {
    },
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
    },
    posicionBarco () {
        console.log(this.selected);
        if (!this.selected) return
        this.coordenadasBarco = this.selected

           
    }
    
  },
  computed: {
      selected () {
          if (!this.posicion){
              this.position = null
              this.tamaño = null
             return
           } 
        //   const size = 3
          let selected = []
          const [x, y] = this.posicion.split(',')
          for (let i = 0; i < this.tamaño; i++) {
            selected.push(`${x},${Number(y) + i}`)
          }
        //   console.log(selected);          
          return selected
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

/* .cuadrado:hover {
    background-color: gray;
} */

/* tr:hover .punto1 {
        background-color: gray;
} 
tr:hover .punto2 {
        background-color: gray;
}   */

.barcos-box {
    display: flex;
    justify-content: space-evenly;
    margin: 10px;
    flex-direction: initial;
}

</style>



