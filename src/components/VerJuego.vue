<template>
  <div>
    <div class="total-game">
        <div class="nombres-jugador"></div>
        <div class="tablero-multiplayer">
            <div class="tablero-jugador">
                <strong><span>¡Hola, {{partidaSeleccionada.jugador}}!</span></strong>
                <span class="texto-informativo">Aquí tienes los barcos que seleccionaste</span>
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
                <strong><span>Tu contrincante es: {{partidaSeleccionada.contrincante}}</span></strong>               
                <span class="texto-informativo">Dispara contra sus barcos:</span>
                <div class="tablero">
                    <table class="board">
                        <tr v-for="y in 10" :key="y">
                            <td v-for="x in 10" :key="x"
                                class="cuadrado"
                                :class="
                                [
                                    //{
                                      //  'active': (partidaSeleccionada.coordenadasDondeAtacar && partidaSeleccionada.coordenadasDondeAtacar.includes(`${x},${y}`))
                                    //},
                                    //{
                                      //  'tocado': (partidaSeleccionada.coordenadasDondeAtacar && partidaSeleccionada.coordenadasDondeAtacar.includes(`${x},${y}`) && (partidaSeleccionada.coordenadasBarcosOponente && partidaSeleccionada.coordenadasBarcosOponente.includes(`${x},${y}`))),
                                    //},
                                    //{
                                      //  'active': (selectedOponente && selectedOponente.includes(`${x},${y}`))
                                    //},
                                    {
                                        'agua': (partidaSeleccionada.coordenadasBarcosOponente && partidaSeleccionada.coordenadasBarcosOponente.includes(`${x},${y}`))
                                    },
                                    {
                                        'tocado': (partidaSeleccionada.coordenadasBarcosOponente && partidaSeleccionada.coordenadasBarcosOponente.includes(`${x},${y}`)) && (partidaSeleccionada.coordenadasDondeAtacar && partidaSeleccionada.coordenadasDondeAtacar.includes(`${x},${y}`))
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

.agua:not(.tocado) {
    background-color: blue!important;
}

.tablero-jugador {
    /* border: 1px solid grey; */
    height: 500px;
    width: 350px;
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

.texto-informativo {
    margin-bottom: 1rem;
}

</style>