<script type="ts">
  import { onDestroy } from 'svelte'
  import { onMount } from 'svelte/internal'

  let showDiff = true

  function formatTime(time: number, fixedLength = 3, showDiff: boolean = false) {
    if (showDiff && fastestLapTime != time) {
      const diffTime = (time - fastestLapTime) / 1000
      const milisecs = (diffTime * 1000) % 1000
      const seconds = Math.floor(diffTime)

      const milisecStr = milisecs.toString().padStart(3, '0').slice(0, 3)
      const secondsStr = seconds.toString()

      return `+${secondsStr}.${milisecStr}`
    } else {
      time /= 1000

      const milisecs = (time * 1000) % 1000
      const seconds = Math.floor(time % 60)
      const minutes = Math.floor((time % 3600) / 60)
      const hours = Math.floor(time / 3600)

      let milisecStr = milisecs.toString().padStart(3, '0').slice(0, 3)

      if (fixedLength < 3) {
        milisecStr = milisecStr.substring(0, fixedLength)
      }

      const secondsStr = seconds.toString().padStart(time > 60 ? 2 : 1, '0')
      let minutesStr = ''

      if (time > 60) {
        minutesStr = minutes.toString().padStart(time > 3600 ? 2 : 1, '0') + ':'
      }

      let hoursStr = ''

      if (time > 3600) {
        hoursStr = hours.toString() + ':'
      }

      return `${hoursStr}${minutesStr}${secondsStr}.${milisecStr}`
    }
  }

  $: showLapName = (lap: number): string => {
    return ` ${String(lap).padStart(2, '0')}`
  }

  $: showTime = (time: number, fixedLength = 3, showDiff: boolean = false): string => {
    return time != Number.MAX_VALUE ? formatTime(time, fixedLength, showDiff) : ''
  }

  let allLaps: { lapNo: number; startTime: number; endTime: number; lapTime: number }[] = []
  let viewLaps: { lapNo: number; startTime: number; endTime: number; lapTime: number }[] = []

  let timer: NodeJS.Timer
  let lapse = 0
  let running = false
  let lapNo = 0
  let startTime = 0
  let fastestLapTime = 0
  let lapTime = 0

  function reset() {
    allLaps = []
    viewLaps = []
    lapNo = 0
    startTime = 0
    fastestLapTime = 0
    lapTime = 0

    for (let i = 0; i < 10; i++) {
      allLaps = [...viewLaps, { lapNo: i + 1, startTime: 0, endTime: 0, lapTime: Number.MAX_VALUE }]
      viewLaps = allLaps
    }
  }

  function appendLap(thisTime: number = Date.now()) {
    const lap = allLaps.find((lap) => lap.lapNo == lapNo)

    lapTime = thisTime - startTime

    if (lap) {
      lap.startTime = startTime
      lap.endTime = thisTime
      lap.lapTime = lapTime
    } else {
      allLaps.push({ lapNo: lapNo, startTime: startTime, endTime: thisTime, lapTime: lapTime })
    }

    const sort = (
      a: { lapNo: number; startTime: number; endTime: number; lapTime: number },
      b: { lapNo: number; startTime: number; endTime: number; lapTime: number }
    ) => (a.lapTime < b.lapTime ? -1 : a.lapTime > b.lapTime ? 1 : 0)

    viewLaps = allLaps.sort(sort)

    fastestLapTime = viewLaps[0].lapTime
  }

  function start() {
    const thisTime = Date.now()

    if (running) {
      appendLap(thisTime)
    } else {
    }

    lapNo += 1

    startTime = thisTime

    if (!running) {
      timer = setInterval(() => {
        lapse = Date.now() - startTime
      }, 1)

      running = true
    }
  }

  function stop() {
    if (running) {
      clearInterval(timer)
      appendLap()
      lapse = lapTime
      running = false
    } else {
      reset()
    }
  }

  function toggleShowDiff() {
    showDiff = !showDiff
  }

  function openWeb() {
    console.log('open')
    window.open('https://sinproject.net/', '_blank').focus()
  }

  onDestroy(() => {
    clearInterval(timer)
  })

  onMount(() => {
    reset()
    ;(window['adsbygoogle'] = window['adsbygoogle'] || []).push({})
    // $locale = localStorage.getItem('locale') ?? 'en'
  })

  //   function saveLocale() {
  //     localStorage.setItem('locale', $locale)
  //   }
</script>

<svelte:head>
  <title>BEST LAP</title>
</svelte:head>

<svelte:window />
<div style="text-align: center; background-color: black;">
  <!-- min-width: 320px;
              max-width: 1200px;
              width: 100%; -->

  <ins
    class="adsbygoogle"
    style="
            display: block;
            width: 100%;
            height: 60px;
            "
    data-ad-client="ca-pub-4064604490139558"
    data-ad-slot="7205421652"
    data-full-width-responsive="true"
  />
</div>

<div class="flex">
  <div class="grid">
    <div class="glass container container-time">
      <div class="glass row-lap">
        <div class="position_logo">
          <img class="icon" on:click={openWeb} src="icon-144.png" alt="icon" />
        </div>
        <div class="lap">{showLapName(lapNo)}</div>
        <button class="glass margin-left" on:click={stop} />
        <select class="glass margin_left">
          <option value="en">English</option>
          <option value="ja">にほんご</option>
        </select>
      </div>
      <div class="row-time" on:click={start}>
        <div class="current-time unselectable">
          {lapNo == 0 ? `>> START <<` : showTime(lapse, running ? 1 : 3)}
        </div>
      </div>
    </div>

    <div class="glass container container-laps">
      {#each viewLaps as { lapNo: lap, lapTime }, index}
        <div class="row-lap">
          <div class="position">{index + 1}</div>
          <div class="lap">{showLapName(lap)}</div>
          <img class="icon" src="icon-144.png" alt="icon" />
          <div class="time-rank margin-left unselectable" on:click={toggleShowDiff}>
            {showTime(lapTime, 3, showDiff)}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  @font-face {
    font-family: 'regular';
    src: url(./assets/Formula1-Regular.ttf);
  }

  @font-face {
    font-family: 'bold';
    src: url(./assets/Formula1-Bold.ttf);
  }

  :global(body) {
    touch-action: manipulation;

    margin: 0vmin;
    padding: 0vmin;
    height: 100vh;
    background-color: black;
    background-image: url(./assets/ferrari-sf1000-4k-charles-leclerc-2020-f1-cars-formula-1-besthqwallpapers.com-1800x1169.jpg);
    background-size: cover;
    background-position: center;

    font-family: regular;
  }

  .glass {
    color: white;
    background: rgba(16, 16, 16, 0.5);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 10px;
    border: 1px solid rgba(128, 128, 128, 0.25);
  }

  button,
  select {
    height: 7vmin;
    padding: 0 1.5vmin;
    font-size: 3vmin;
    font-family: regular;
  }

  button:active {
    background: rgba(48, 48, 48, 0.5);
  }

  select:focus {
    outline: 0;
  }

  .margin_left {
    margin-left: 0.8vmin;
  }

  .flex {
    display: flex;
    padding: 3vmin;
    justify-content: center;

    /* align-items: center; */
    /* height: 95vh; */

    /* background-color: #aa229f; */

    height: calc(100vh - 60px - 6vmin);
  }

  .grid {
    display: flex;
    gap: 2vmin;
    flex-direction: column;

    /* background-color: #22aa5b; */
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 92vmin;
  }

  .container-time {
    padding: 0.6vmin;
  }

  .container-laps {
    padding: 0.6vmin;
    height: 100%;
    overflow: scroll;
  }

  /* .row-lap-pad3,
    .row-lap-pad6 {
      display: flex;
      flex-direction: row;
      align-items: center;
    } */

  .row-lap {
    padding: 0.8vmin;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 5vmin;
  }

  .lap {
    border-left: 0.8vmin solid #22aa5b;
    margin-left: 2vmin;
    padding-left: 2vmin;
    font-family: 'bold';
    min-width: 25vmin;
  }

  .position,
  .position_logo {
    text-align: center;
    width: 8.2vmin;
    height: 8.2vmin;
    line-height: 8.2vmin;
  }

  .position {
    border-radius: 1vmin;
    background-color: rgb(182, 18, 223);
  }

  .position_logo {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon {
    width: 7.4vmin;
  }

  .margin-left {
    margin-left: auto;
  }

  .row-time {
    height: 22vmin;
    font-size: 12vmin;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .current-time {
    min-width: 60vmin;
    text-align: right;
  }

  .time-rank {
    margin-right: 3vmin;
  }

  .unselectable {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
  }
</style>
