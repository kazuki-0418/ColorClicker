<script>
  import Background from './background.svelte'
</script>

<Background>
  <div class="header">
    <button class="back" on:click>back</button>

    <button class="reload">reload</button>
  </div>

  <div
    style="display: flex;
justify-content: center;"
  >
    <button class="start">START</button>
  </div>
  <div class="pads">
    <button
      class="pad"
      style="
    background: transparent;
    background-color:#B1F9D0;
    backdrop-filter: hue-rotate(120deg);"
    />
    <button
      class="pad"
      style="
    background: transparent;
    background-color:#DCC2FF;
    backdrop-filter: hue-rotate(120deg);"
    />
    <button
      class="pad"
      style="CBFFD3
    background: transparent;
    background-color:#DDFFFF;
    backdrop-filter: hue-rotate(120deg);"
    />
    <button
      class="pad"
      style="
    background-color:#FFDDFF;
    backdrop-filter: hue-rotate(240deg);"
    />
  </div>
</Background>

<style lang="scss">
  .header {
    display: flex;
    grid-template-columns: repeat(2, 1fr);
    margin: 2vmin 2vmin 0 2vmin;
    padding: 1vmin;
    gap: 2vmin;
    justify-content: space-between;
    .back {
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
    border: none;
    color: #fff;
    margin: 2.5vmin;
    height: 25vmin;
    width: 25vmin;
    font-size: 6vmin;
    font-weight: 10;
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

    .pad {
      border-radius: 10px;
      border: 1px solid rgba(128, 128, 128, 0.25);
      background: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(8px);
      color: #fff;
    }
  }
</style>
