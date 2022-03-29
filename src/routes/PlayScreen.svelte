<script lang="ts">
  import { onDestroy } from 'svelte'

  import Background from './background.svelte'
  import ColorButton from './components/ColorButton.svelte'
  let isGameStart = false
  let isGameOver: boolean = false
  let isGameclear: boolean = false
  let timerSecond: number = 0
  let count: number = 10
  let colorIndex: number = Math.floor(Math.random() * (3 + 1 - 0)) + 0
  let intervalId

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId)
  })

  const tickSecond = () => {
    if (timerSecond === 0) {
      isGameStart = true
      intervalId = setInterval(() => (timerSecond += 0.01), 10)
    }
  }
  const decrementCount = (color) => {
    if (colorPalette[colorIndex].color === color) {
      count -= 1
      if (count === 0) {
        clearInterval(intervalId)
        isGameclear = true
      }
    } else {
      isGameOver = true
    }
    return (colorIndex = Math.floor(Math.random() * (3 + 1 - 0)) + 0)
  }

  const colorPalette = [
    { id: 1, color: 'rgba(241,113,113,0.7)', textColor: '#fff' },
    { id: 2, color: 'rgba(113,123,241,0.7)', textColor: '#fff' },
    { id: 3, color: 'rgba(245,254,0,0.7)', textColor: '#fff' },
    { id: 4, color: 'rgba(43,232,196,0.7)', textColor: '#fff' },
  ]

  const resetGame = () => {
    clearInterval(intervalId)
    timerSecond = 0
    count = 3
    isGameStart = false
    isGameOver = false
    isGameclear = false
  }
</script>

<Background>
  <div class="header">
    <a href="/"
      ><button class="box" on:click
        ><span class="material-icons-outlined" style="font-size:5vmin">arrow_back_ios</span></button
      ></a
    >

    <button class="box" on:click={resetGame}
      ><span class="material-icons-outlined" style="font-size:5vmin">refresh</span></button
    >
  </div>

  <div
    style="display: flex;
    flex-direction:column;
    align-items:center;
    height: 50vmin;
"
  >
    {#if isGameOver}
      <div class="gameover">
        <span class="gameovertext">GAME</span>
        <span class="gameovertext">OVER</span>
      </div>
    {:else if isGameclear}
      <div class="gameclear">
        <span class="gamecleartext">GAME</span>
        <span class="gamecleartext">CLEAR</span>
        <span class="timersec">{timerSecond.toFixed(3)}</span>
      </div>
    {:else if timerSecond === 0 && !isGameOver}
      <div class="start">
        <p
          style="margin-top: 12vmin;
                 color: #fff;"
          on:click={tickSecond}
        >
          START
        </p>
      </div>
    {:else if timerSecond > 0 && !isGameOver}
      <div class="start" style="background-color:{colorPalette[colorIndex].color}">
        <div class="container">
          <span class="count" style="line-height:5vmin">{count}</span>
          <span>{timerSecond.toFixed(1)}</span>
        </div>
      </div>
    {/if}
  </div>
  <div class="pads">
    {#each colorPalette as color}
      <ColorButton
        isDisable={!isGameStart}
        backgroundcolor={color.color}
        on:click={() => decrementCount(color.color)}
      />
    {/each}
  </div>
</Background>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Potta+One&display=swap');
  :global(body) {
    font-family: 'Orbitron', sans-serif;
  }
  .header {
    display: flex;
    grid-template-columns: repeat(2, 1fr);
    margin: 0.5vmin 0.5vmin 0.5vmin 2vmin;
    padding: 1vmin;
    justify-content: end;
    gap: 2vmin;
    .box {
      font-size: 4vmin;
      background: rgba(255, 255, 255, 0.6);
      width: 9vmin;
      height: 9vmin;
      border-radius: 10px;
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);

      border: 1px solid rgba(128, 128, 128, 0.25);
      &:hover {
        transition-duration: 0.2s;
        cursor: pointer;
      }
    }
  }
  .gameover {
    display: flex;
    flex-direction: column;

    .gameovertext {
      font-size: 12vmin;
      line-height: 10vmin;
    }
  }
  .gameclear {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .gamecleartext {
      font-size: 12vmin;
      text-align: center;
      line-height: 10vmin;
    }
    .timersec {
      line-height: 7vmin;
      text-align: center;
      font-size: 8vmin;
    }
  }

  .start {
    border-radius: 100%;
    background: rgba(241, 113, 113, 0.6);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    text-align: center;
    height: 35vmin;
    width: 35vmin;
    font-size: 8vmin;
    font-weight: 10;
    /* color: #fff; */

    border: 1px solid rgba(128, 128, 128, 0.25);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    .container {
      display: flex;
      flex-direction: column;
      height: 10vmin;

      .count {
        font-size: 10vmin;
        margin-top: 10vmin;
        margin-bottom: 0;
        line-height: 30px;
      }
    }

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
  .pads {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 2vmin;
    gap: 2vmin;
    height: calc(100vh - 10px - 65vmin);
  }
</style>
