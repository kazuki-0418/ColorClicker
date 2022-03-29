<script lang="ts">
  import { onMount } from 'svelte'
  import { derived, writable } from 'svelte/store'
  // import translations from './translations'
  const defaultLocale = 'en'
  import Background from './background.svelte'
  let name: String = ''
  let scoreTime: number = 0
  let playerName: String = 'OsakaTaro'

  let isCurrentEnglish: boolean = true

  let ref

  onMount(() => {
    ref.focus()
    isCurrentEnglish = JSON.parse(localStorage.getItem('isEnglish')) ?? true
  })

  const switchLanguage = () => {
    let beforeLanguage: boolean
    beforeLanguage = JSON.parse(localStorage.getItem('isEnglish'))

    if (isCurrentEnglish !== beforeLanguage || beforeLanguage === undefined) {
      isCurrentEnglish = !isCurrentEnglish
      localStorage.setItem('isEnglish', isCurrentEnglish.toString())
    }
  }
</script>

<Background>
  <div class="banner">バナー</div>
  <!-- <div>
    <select bind:value={$locale} on:change={saveLocale} class="glass margin_left">
      <option value="en">English</option>
      <option value="ja">にほんご</option>
    </select> -->
  <!-- </div> -->
  <div class="header">
    <p class="title">ColorClicker</p>
    <div class="inputname">
      <input class="textfield" bind:value={name} bind:this={ref} placeholder="Enter your name" />
    </div>
  </div>

  <div class="buttonarea">
    {#if name}
      <a href="/playscreen"><button class="playbutton"> PLAY </button></a>
    {/if}
  </div>

  <div class="rankingarea">
    <p style="font-size:4vmin;line-height:1vmin;margin:3vmin auto 0 auto">Yearly Ranking</p>
    <div style="display:flex;flex-direction:column;align-items:center; ">
      <div style="display:flex;gap:10vmin;">
        <div
          class="personalscore"
          style="display :flex;flex-direction:column;font-size: 3vmin;line-height:3.5vmin;"
        >
          <p style="font-size:3vmin;line-height:5px;">INDIVIDUAL RANKING</p>

          <span>1 {scoreTime}s {playerName}</span>
          <span>2 {scoreTime}s {playerName}</span>
          <span>3 {scoreTime}s {playerName}</span>
          <span>4 {scoreTime}s {playerName}</span>
          <span>5 {scoreTime}s {playerName}</span>
        </div>

        <div
          class="top100-area"
          style="display :flex;flex-direction:column;font-size: 3vmin;line-height:3.5vmin;"
        >
          <p style="text-align: center;font-size:3vmin;line-height:2vmin;">TOP100</p>

          <span>1 {scoreTime}s {playerName}</span>
          <span>2 {scoreTime}s {playerName}</span>
          <span>3 {scoreTime}s {playerName}</span>
          <span>4 {scoreTime}s {playerName}</span>
          <span>5 {scoreTime}s {playerName}</span>
        </div>
      </div>
    </div>
  </div></Background
>
>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Potta+One&display=swap');
  :global(body) {
    font-family: 'Orbitron', sans-serif;
  }
  .banner {
    background-color: azure;
    height: 90px;
    width: 50%;
    text-align: center;
    font-size: 5vmin;
    position: relative;
    margin: 0 auto;
  }
  .header {
    margin-bottom: 3vmin;

    .title {
      font-family: 'Orbitron', sans-serif;

      font-size: 5vmin;
      text-align: center;
    }
    .inputname {
      display: flex;
      justify-content: center;
      align-items: center;

      .textfield {
        border: none;
        height: 5vmin;
        font-size: 5vmin;
        white-space: pre-wrap;
        align-content: center;
        position: absolute;
        /* background: transparent; */
        outline: none;
        border: none;
        resize: none;
        overflow: hidden;
        transform-origin: 0px 0px 0px;
        font: 22px MPLUS1p_regular, 'Orbitron', sans-serif;
      }
    }
  }

  .title {
    font-size: 10vmin;
    font-family: MPLUS1p_regular, Arial, sans-serif;
  }
  .buttonarea {
    text-align: center;
    height: 30vmin;

    .playbutton {
      position: relative;
      border-radius: 100%;
      background: rgba(241, 113, 113, 0.5);
      color: #fff;
      border: none;
      margin: 2.5vmin;
      height: 25vmin;
      width: 25vmin;
      font-size: 6vmin;
      font-weight: 10;
      border: 1px solid rgba(128, 128, 128, 0.25);
      -webkit-backdrop-filter: blur(20px);
      backdrop-filter: blur(20px);
      box-shadow: rgb(0 0 0 / 30%) 0.6px 1.3px 3px 0px;
      font-family: 'Orbitron', sans-serif;

      &:hover {
        cursor: pointer;
        background: rgba(241, 113, 113, 0.4);

        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
      }
    }
  }

  .rankingarea {
    display: grid;
    height: calc(100vh - 90px - 50vmin - 4vmin);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 10px;
    border: 1px solid rgba(128, 128, 128, 0.25);
    margin: 0 5vmin 0 5vmin;
  }
</style>
