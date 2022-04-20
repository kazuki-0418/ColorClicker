<script lang="ts">
  export let backgroundcolor: String
  export let isDisable: boolean = false
</script>

<button disabled={isDisable} style="background-color:{backgroundcolor};" on:click />

<style lang="scss">
  button {
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-radius: 10px;
    border: 1px solid rgba(128, 128, 128, 0.25);
    height: 100%;
    &:hover {
      cursor: pointer;
      opacity: 0.9;
    }
  }
</style>
