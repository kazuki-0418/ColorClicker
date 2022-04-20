<script lang="ts">
  export let adClient = 'ca-pub-4064604490139558'
  export let height = '60px'
  export let adSlot: string
  export let subName = ''
</script>

<div>
  <ins
    class="adsbygoogle{subName}"
    style="
        display: block;
        width: 100%;
        height: {height};
      "
    data-ad-client={adClient}
    data-ad-slot={adSlot}
    data-full-width-responsive="true"
  />
</div>

<style>
  div {
    /* background-color: rgba(0, 0, 0, 0.5); */
    text-align: center;
  }
</style>
