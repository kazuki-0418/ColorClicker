<script lang="ts">
  import { onDestroy } from 'svelte'

  import Background from './background.svelte'
  import ColorButton from './components/ColorButton.svelte'
  let isMatchColor: boolean = true
  let timerSecond: number = 0
  let count: number = 10
  let colorIndex: number = Math.floor(Math.random() * (3 + 1 - 0)) + 0
  let intervalId

  onDestroy(() => {
    if (timerSecond) clearInterval(intervalId)
  })

  const tickSecond = () => {
    if (timerSecond === 0) {
      intervalId = setInterval(() => (timerSecond += 0.01), 10)
    }
  }
  const decrementCount = (color) => {
    if (colorPalette[colorIndex].color === color) {
      count -= 1
    }
    return (colorIndex = Math.floor(Math.random() * (3 + 1 - 0)) + 0)
  }

  const colorPalette = [
    { id: 1, color: '#FFBEDA' },
    { id: 2, color: '#BAD3FF' },
    { id: 3, color: '#FFFFDD' },
    { id: 4, color: '#CBFFD3' },
  ]

  const resetGame = () => {
    clearInterval(intervalId)
    timerSecond = 0
    count = 10
  }
</script>

<Background>
  <div class="header">
    <a href="/"><button class="back" on:click>back</button></a>

    <button class="reload" on:click={resetGame}>reload</button>
  </div>

  <div
    style="display: flex;
justify-content: center;
margin-bottom: 45px;"
  >
    {#if timerSecond === 0}
      <div class="start">
        <p style="margin-top:8vmin" on:click={tickSecond}>START</p>
      </div>
    {:else if timerSecond > 0}
      <div class="start" style="background-color:{colorPalette[colorIndex].color}">
        <div class="container">
          <span class="count">{count}</span>
          <span>{timerSecond.toFixed(3)}</span>
        </div>
      </div>
    {/if}
  </div>
  <div class="pads">
    {#each colorPalette as color}
      <ColorButton backgroundcolor={color.color} on:click={() => decrementCount(color.color)} />
    {/each}
  </div>
</Background>

<style lang="scss">
  .header {
    display: flex;
    grid-template-columns: repeat(2, 1fr);
    margin: 0.5vmin 0.5vmin 0 0.5vmin;
    padding: 1vmin;
    justify-content: space-between;
    .back {
      font-size: 4vmin;
      background: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(8px);
      width: 15vmin;
      height: 7vmin;
      border-radius: 4px;
      box-shadow: 0.6px 1.3px 2.7px 0px rgba(0, 0, 0, 0.3);
      border: none;
      &:hover {
        border-radius: 4px;
        border: none;
        box-shadow: 1px 1.6px 3px 0px rgba(0, 0, 0, 0.5);
        transition-duration: 0.5s;
        cursor: pointer;
      }
    }

    .reload {
      font-size: 4vmin;
      background: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(8px);
      width: 15vmin;
      height: 7vmin;
      border-radius: 4px;
      box-shadow: 0.6px 1.3px 2.7px 0px rgba(0, 0, 0, 0.3);

      border: none;
      &:hover {
        border-radius: 4px;
        box-shadow: 1px 1.6px 3px 0px rgba(0, 0, 0, 0.5);
        transition-duration: 0.5s;
        border: none;
        cursor: pointer;
      }
    }
  }
  .start {
    position: relative;
    margin-top: 45px;

    border-radius: 100%;
    background: #ffb6c1;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    text-align: center;
    border: none;
    color: #fff;
    height: 25vmin;
    width: 25vmin;
    font-size: 6vmin;
    font-weight: 10;
    .container {
      display: flex;
      flex-direction: column;

      .count {
        font-size: 10vmin;
        margin-bottom: 0;
      }
    }

    &:hover {
      transition-duration: 0.5s;

      cursor: pointer;
      background: #ffc0cb;
    }
  }
  .pads {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 2vmin;
    gap: 2vmin;
    height: calc(100vh - 10px - 45vmin);
  }
</style>
