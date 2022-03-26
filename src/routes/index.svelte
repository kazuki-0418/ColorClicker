<script lang="ts">
  import Background from './background.svelte'
  let name: String = ''
</script>

<Background>
  <div class="banner">バナー</div>

  <div class="header">
    <p class="title">カラークリッカー</p>
    <div class="inputname">
      <input class="textfield" bind:value={name} placeholder="名前を入力してください" />
    </div>
  </div>

  <div class="buttonarea">
    {#if name}
      <a href="/playscreen"><button class="playbutton"> PLAY </button></a>
    {/if}
  </div>
</Background>
>

<style lang="scss">
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
    display: block;
    margin-bottom: 10vmin;
    .title {
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
        font-size: 3vmin;
        white-space: pre-wrap;
        align-content: center;
        position: absolute;
        opacity: 1;
        /* color: transparent; */
        background: transparent;
        outline: none;
        border: none;
        resize: none;
        overflow: hidden;
        transform-origin: 0px 0px 0px;
        caret-color: transparent;
        text-align: center;
        font: 22px MPLUS1p_regular, Arial, sans-serif;
      }
    }
  }

  .title {
    font-size: 10vmin;
    font-family: MPLUS1p_regular, Arial, sans-serif;
  }
  .buttonarea {
    text-align: center;

    .playbutton {
      position: relative;
      margin-top: 45px;
      border-radius: 100%;
      background: #c2eeff;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: none;
      color: #fff;
      margin: 2.5vmin;
      height: 25vmin;
      width: 25vmin;
      font-size: 6vmin;
      font-weight: 10;
      &:hover {
        cursor: pointer;
        background: #bbffff;
      }
    }
  }
</style>
