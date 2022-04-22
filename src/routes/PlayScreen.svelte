<script lang="ts">
  // import BannerAd from '../BannerAd.svelte'

  import { onMount, onDestroy } from 'svelte'
  import Background from './background.svelte'
  import ColorButton from './components/ColorButton.svelte'
  import {
    collection,
    addDoc,
    getFirestore,
    updateDoc,
    doc,
    query,
    where,
    onSnapshot,
    serverTimestamp,
  } from 'firebase/firestore'

  import { t, locale } from '../i18n'
  import { browser } from '$app/env'
  import { getApp, getApps, initializeApp } from 'firebase/app'
  import { firebaseConfig } from '$lib/fireBaseConfig'
  let isGameStart = false
  let isGameOver: boolean = false
  let isGameclear: boolean = false
  let timerSecond: number = 0
  let startTime: number = 0
  let count: number = 3
  let colorIndex: number = Math.floor(Math.random() * (3 + 1 - 0)) + 0
  let playingUser: string
  let intervalId: NodeJS.Timer
  let date = new Date()
  let data = []
  initializeApp(firebaseConfig)
  const firebaseApp = browser && getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
  const db = browser && getFirestore(firebaseApp)
  const colRef = browser && collection(db, 'time-scores')

  onMount(() => {
    $locale = localStorage.getItem('locale') ?? 'en'

    playingUser = localStorage.getItem('currentuser')
    if (!playingUser) {
      location.replace('/')
    } else {
      return
    }
  })

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId)
  })

  const colorPalette = [
    { id: 1, color: 'rgba(241,113,113,0.7)', textColor: 'rgba(255,255,255,)' },
    { id: 2, color: 'rgba(113,123,241,0.7)', textColor: 'rgba(255,255,255,1)' },
    { id: 3, color: 'rgba(245,254,0,0.7)', textColor: 'rgba(0,0,0,1)' },
    { id: 4, color: 'rgba(43,232,196,0.7)', textColor: 'rgba(255,255,255,)' },
  ]

  function getData(query) {
    browser &&
      onSnapshot(query, (querySnapshot) => {
        let fbTimeScores = []
        querySnapshot.forEach((doc) => {
          let timeScore = { ...doc.data(), id: doc.id }
          fbTimeScores = [timeScore, ...fbTimeScores]
        })
        data = fbTimeScores
      })
  }

  function tickSecond() {
    const thisTime = Date.now()

    let scoreQuery =
      browser &&
      query(colRef, where('year', '==', date.getFullYear()), where('name', '==', playingUser))

    getData(scoreQuery)

    startTime = thisTime
    if (!isGameStart) {
      isGameStart = true
      intervalId = setInterval(() => {
        timerSecond = Date.now() - startTime
        timerSecond /= 1000
      }, 10)
    }
  }

  async function addScore() {
    await addDoc(collection(db, 'time-scores'), {
      year: date.getFullYear(),
      name: playingUser,
      time: Math.round((timerSecond + Number.EPSILON) * 1000) / 1000,
      lastUpDate: serverTimestamp(),
    })
  }

  async function updateScore() {
    const docRef = browser && doc(db, 'time-scores', data[0].id)
    await updateDoc(docRef, {
      time: Math.round((timerSecond + Number.EPSILON) * 1000) / 1000,
      lastUpDate: serverTimestamp(),
    })
  }

  function decrementCount(color) {
    if (colorPalette[colorIndex].color === color) {
      count -= 1
      if (count === 0) {
        clearInterval(intervalId)
        isGameclear = true
        if (data.length == 0) {
          addScore()
        } else if (
          data[0].name == playingUser &&
          data[0].year == date.getFullYear() &&
          data[0].time > timerSecond
        ) {
          updateScore()
        }
      }
    } else {
      isGameOver = true
    }
    return (colorIndex = Math.floor(Math.random() * (3 + 1 - 0)) + 0)
  }

  function resetGame() {
    clearInterval(intervalId)
    timerSecond = 0
    count = 3
    isGameStart = false
    isGameOver = false
    isGameclear = false
  }
</script>

<Background>
  <!-- <BannerAd adSlot="3083812429" height="90px" /> -->
  <div class="banner" style="height:60px; background-color:azure" />

  <div class="flex">
    <div class="grid">
      <div class="header">
        <span class="material-icons-outlined box-icon" on:click={() => (location.href = '/')}
          >arrow_back_ios</span
        >

        <span class="material-icons-outlined box-icon" on:click={resetGame}>refresh</span>
      </div>

      <div class="flexbox">
        {#if isGameOver}
          <div class="gameover">
            <span>{$t('game')}</span>
            <span>{$t('over')}</span>
          </div>
        {:else if isGameclear}
          <div class="gameclear">
            <span>{$t('game')}</span>
            <span>{$t('clear')}</span>
            <span class="timersec">{timerSecond.toFixed(3)}</span>
          </div>
        {:else if timerSecond === 0 && !isGameOver}
          <div class="start" on:click={tickSecond}>
            <p style="color: #fff;">
              {$t('start')}
            </p>
          </div>
        {:else if timerSecond > 0 && !isGameOver}
          <div
            class="start"
            style="background-color:{colorPalette[colorIndex].color};color:{colorPalette[colorIndex]
              .textColor}"
          >
            <span class="count">{count}</span>
            {isGameStart && timerSecond.toFixed(1)}
          </div>
        {/if}
      </div>

      <div class="flexbox">
        <div class="pads">
          {#each colorPalette as color}
            <ColorButton
              isDisable={!isGameStart}
              backgroundcolor={color.color}
              on:click={() => decrementCount(color.color)}
            />
          {/each}
        </div>
      </div>
    </div>
  </div></Background
>

<style lang="scss">
  .flex {
    display: flex;
    padding: 2vmin;
    height: calc(100vh - 58px - 4.2vmin);
    flex-direction: column;

    .grid {
      display: flex;
      gap: 2vmin;
      flex-direction: column;
      height: 100%;
    }

    .header {
      display: flex;
      grid-template-columns: repeat(2, 1fr);
      justify-content: start;
      gap: 2vmin;

      .box-icon {
        font-size: 5vmin;
        color: #555;
      }
      &:hover {
        transition-duration: 0.2s;
        cursor: pointer;
      }
    }

    .gameover {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      line-height: 100%;
      font-size: 10vmin;
    }

    .gameclear {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      line-height: 100%;
      font-size: 8vmin;

      .timersec {
        line-height: 10vmin;
        text-align: center;
        font-size: 6vmin;
      }
    }

    .start {
      border-radius: 100%;
      background: rgba(241, 113, 113, 0.6);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      text-align: center;
      height: 20vh;
      width: 20vh;
      font-size: 4vh;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);

      .container {
        display: flex;
        flex-direction: column;
        height: 10vmin;

        .count {
          font-size: 10vmin;
          margin-top: 6vmin;
          margin-bottom: 2vmin;
          line-height: 5vmin;
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
      gap: 2vmin;
      height: calc(80vh - 90px - 22vmin - 2vmin);
    }
  }

  .flexbox {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .glass {
    background-color: rgba(255, 255, 255, 0.35);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 10px;
    border: 1px solid rgba(128, 128, 128, 0.25);
    outline: none;
    opacity: 0.3;
  }
</style>
