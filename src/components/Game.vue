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
                <div class="tablero">
                    <table class="board">
                        <tr>
                            <td class="cuadrado punto1">x</td>
                            <td class="cuadrado punto2">x</td>
                            <td class="cuadrado punto3">x</td>
                            <td class="cuadrado punto4">x</td>
                            <td class="cuadrado punto5">x</td>
                            <td class="cuadrado punto6">x</td>
                            <td class="cuadrado punto7">x</td>
                            <td class="cuadrado punto8">x</td>
                            <td class="cuadrado punto9">x</td>
                            <td class="cuadrado punto10">x</td>                
                        </tr>
                        <tr>
                            <td class="cuadrado punto12">x</td>
                            <td class="cuadrado punto22">x</td>
                            <td class="cuadrado punto32">x</td>
                            <td class="cuadrado punto42">x</td>
                            <td class="cuadrado punto52">x</td>
                            <td class="cuadrado punto62">x</td>
                            <td class="cuadrado punto72">x</td>
                            <td class="cuadrado punto82">x</td>
                            <td class="cuadrado punto92">x</td>
                            <td class="cuadrado punto102">x</td> 
                        </tr>
                        <tr>
                            <td class="cuadrado punto13">x</td>
                            <td class="cuadrado punto23">x</td>
                            <td class="cuadrado punto33">x</td>
                            <td class="cuadrado punto43">x</td>
                            <td class="cuadrado punto53">x</td>
                            <td class="cuadrado punto63">x</td>
                            <td class="cuadrado punto73">x</td>
                            <td class="cuadrado punto83">x</td>
                            <td class="cuadrado punto93">x</td>
                            <td class="cuadrado punto103">x</td>
                        </tr>
                        <tr>
                            <td class="cuadrado punto14">x</td>
                            <td class="cuadrado punto24">x</td>
                            <td class="cuadrado punto34">x</td>
                            <td class="cuadrado punto44">x</td>
                            <td class="cuadrado punto54">x</td>
                            <td class="cuadrado punto64">x</td>
                            <td class="cuadrado punto74">x</td>
                            <td class="cuadrado punto84">x</td>
                            <td class="cuadrado punto94">x</td>
                            <td class="cuadrado punto104">x</td>
                            
                        </tr>
                        <tr>
                            <td class="cuadrado punto15">x</td>
                            <td class="cuadrado punto25">x</td>
                            <td class="cuadrado punto35">x</td>
                            <td class="cuadrado punto45">x</td>
                            <td class="cuadrado punto55">x</td>
                            <td class="cuadrado punto65">x</td>
                            <td class="cuadrado punto75">x</td>
                            <td class="cuadrado punto85">x</td>
                            <td class="cuadrado punto95">x</td>
                            <td class="cuadrado punto105">x</td>
                        </tr>
                        <tr>
                            <td class="cuadrado punto16">x</td>
                            <td class="cuadrado punto26">x</td>
                            <td class="cuadrado punto36">x</td>
                            <td class="cuadrado punto46">x</td>
                            <td class="cuadrado punto56">x</td>
                            <td class="cuadrado punto66">x</td>
                            <td class="cuadrado punto76">x</td>
                            <td class="cuadrado punto86">x</td>
                            <td class="cuadrado punto96">x</td>
                            <td class="cuadrado punto106">x</td>
                        </tr>
                        <tr>
                            <td class="cuadrado punto17">x</td>
                            <td class="cuadrado punto27">x</td>
                            <td class="cuadrado punto37">x</td>
                            <td class="cuadrado punto47">x</td>
                            <td class="cuadrado punto57">x</td>
                            <td class="cuadrado punto67">x</td>
                            <td class="cuadrado punto77">x</td>
                            <td class="cuadrado punto87">x</td>
                            <td class="cuadrado punto97">x</td>
                            <td class="cuadrado punto107">x</td>
                        </tr>
                        <tr>
                            <td class="cuadrado punto18">x</td>
                            <td class="cuadrado punto28">x</td>
                            <td class="cuadrado punto38">x</td>
                            <td class="cuadrado punto48">x</td>
                            <td class="cuadrado punto58">x</td>
                            <td class="cuadrado punto68">x</td>
                            <td class="cuadrado punto78">x</td>
                            <td class="cuadrado punto88">x</td>
                            <td class="cuadrado punto98">x</td>
                            <td class="cuadrado punto108">x</td>
                        </tr>
                        <tr>
                            <td class="cuadrado punto19">x</td>
                            <td class="cuadrado punto29">x</td>
                            <td class="cuadrado punto39">x</td>
                            <td class="cuadrado punto49">x</td>
                            <td class="cuadrado punto59">x</td>
                            <td class="cuadrado punto69">x</td>
                            <td class="cuadrado punto79">x</td>
                            <td class="cuadrado punto89">x</td>
                            <td class="cuadrado punto99">x</td>
                            <td class="cuadrado punto109">x</td>
                        </tr>
                        <tr>
                            <td class="cuadrado punto10">x</td>
                            <td class="cuadrado punto20">x</td>
                            <td class="cuadrado punto30">x</td>
                            <td class="cuadrado punto40">x</td>
                            <td class="cuadrado punto50">x</td>
                            <td class="cuadrado punto60">x</td>
                            <td class="cuadrado punto70">x</td>
                            <td class="cuadrado punto80">x</td>
                            <td class="cuadrado punto90">x</td>
                            <td class="cuadrado punto100">x</td>
                        </tr>
                    </table>
                </div>
                <div class="barcos-box">
                    <span v-for="barco in barcos" :key="barco.key">{{barco.nombre}}</span>
                </div>
                
            </div>
            <!-- <div class="tablero-jugador">
                <span>Nombre</span>
                <div class="tablero">
                </div>
                <span>Barcos</span>
            </div> -->
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

      
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(()=> this.$router.replace('login'))
    },
    back () {
        this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="" scoped>

.tablero-multiplayer {
    border: 1px solid grey;
    /* height: 60vh; */
    /* width: 80vw; */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;    
}

.tablero-jugador {
    border: 1px solid grey;
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

.cuadrado:hover {
    background-color: gray;
}

.barcos-box {
    display: flex;
    justify-content: space-evenly;
    margin: 10px;
}

</style>



