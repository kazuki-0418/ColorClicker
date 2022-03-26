<script lang="ts">
  export let backgroundcolor: String
</script>

<button style="background-color:{backgroundcolor}" on:click />

<style>
  button {
    border-radius: 10px;
    border: 1px solid rgba(128, 128, 128, 0.25);
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(8px);
    background: transparent;
    backdrop-filter: hue-rotate(120deg);
  }
</style>
