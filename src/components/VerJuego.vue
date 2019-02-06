<template>
  <div>
    <div class="total-game">
        <div class="nombres-jugador"></div>
        <div class="tablero-multiplayer">
            <div class="tablero-jugador">
                <span>{{partidaSeleccionada.jugador}}</span>                        
                <div class="tablero">
                    <table class="board">
                        <tr v-for="y in 10" :key="y">
                            <td v-for="x in 10" :key="x"
                                class="cuadrado"
                                :class="{
                                    'active': (partidaSeleccionada.coordenadasBarcosUsuario && partidaSeleccionada.coordenadasBarcosUsuario.includes(`${x},${y}`)),
                                    }"
                                >
                            </td>                                    
                        </tr>                       
                    </table>
                </div>                             
            </div>
            <div class="tablero-jugador">
                <span>{{partidaSeleccionada.contrincante}}</span>                
                <span class="text-oponente"><strong>Dispara contra los barcos:</strong></span>
                <div class="tablero">
                    <table class="board">
                        <tr v-for="y in 10" :key="y">
                            <td v-for="x in 10" :key="x"
                                class="cuadrado"
                                :class="
                                [
                                    {
                                        'active': (partidaSeleccionada.coordenadasDondeAtacar && partidaSeleccionada.coordenadasDondeAtacar.includes(`${x},${y}`))
                                    },
                                    {
                                        'tocado': (partidaSeleccionada.coordenadasDondeAtacar && partidaSeleccionada.coordenadasDondeAtacar.includes(`${x},${y}`) && (partidaSeleccionada.coordenadasBarcosOponente && partidaSeleccionada.coordenadasBarcosOponente.includes(`${x},${y}`))),
                                    },
                                    //{
                                      //  'active': (selectedOponente && selectedOponente.includes(`${x},${y}`))
                                    //},
                                    {
                                        'agua': (partidaSeleccionada.coordenadasDondeAtacar && !partidaSeleccionada.coordenadasDondeAtacar.includes(`${x},${y}`) && (partidaSeleccionada.coordenadasBarcosOponente && partidaSeleccionada.coordenadasBarcosOponente.includes(`${x},${y}`))),
                                    },
                                ]"
                
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
export default {
  name: 'VerJuego',


  props: {
      partidaSeleccionada: {
          type: Object
      }
  }
}
</script>

<style>

.tablero-multiplayer {
    /* border: 1px solid grey; */
    /* height: 60vh; */
    /* width: 80vw; */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around; 

}

.tocado {
    background-color: red!important;
}

.tablero-jugador {
    /* border: 1px solid grey; */
    height: 500px;
    width: 400px;
    margin: 15px;
    display: flex;
    flex-direction: column;
}

.board {
    height: 100%;
    width: 100%;
}

.cuadrado {
    border: 1px solid grey;
    background-color: skyblue;
}

.active {
    background-color: gray!important;
}

</style>