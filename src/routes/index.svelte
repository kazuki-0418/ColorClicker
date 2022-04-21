<script lang="ts">
  // import BannerAd from '../BannerAd.svelte'
  import { onMount } from 'svelte'
  import { t, locale } from '../i18n'
  import Background from './background.svelte'
  import { name, getTop1000, getRivals, getRankingTopNumber } from '../api'

  let ref
  let topIndex: number
  let twitterLinkWithName
  function getLen(str) {
    let result = 0
    for (let i = 0; i < str.length; i++) {
      let chr = str.charCodeAt(i)
      if (
        (chr >= 0x00 && chr < 0x81) ||
        chr === 0xf8f0 ||
        (chr >= 0xff61 && chr < 0xffa0) ||
        (chr >= 0xf8f1 && chr < 0xf8f4)
      ) {
        //半角文字の場合は1を加算
        result += 1
      } else {
        //それ以外の文字の場合は2を加算
        result += 2
      }
    }
    //結果を返す
    return result
  }
  function isTwitterLink(userName: string) {
    const pattern = new RegExp('^@')
    return userName.match(pattern)
  }

  function launchURL(userName: string) {
    const twitterLink: string = 'https://twitter.com/'
    twitterLinkWithName = twitterLink.concat(userName)
    window.open(twitterLinkWithName)
  }

  onMount(() => {
    ref.focus()
    ;(window['adsbygoogle'] = window['adsbygoogle'] || []).push({})
    getScoreRivals($name)
  })

  function saveLocale() {
    localStorage.setItem('locale', $locale)
  }

  async function saveName() {
    await localStorage.setItem('currentuser', $name)
  }

  async function getScore(type) {
    if (type === 'top1000') {
      return await getTop1000()
    }
  }

  async function getScoreRivals(name: String) {
    topIndex = await getRankingTopNumber(name)
    return await getRivals(name)
  }

  $: if ($name) {
    getScoreRivals($name)
    getLen($name)
  }
</script>

<Background>
  <!-- <BannerAd adSlot="3083812429" height="60px" /> -->
  <div class="banner" style="height:60px; background-color:white" />
  <div class="flex">
    <div class="grid">
      <div class="wrapper">
        <select class="glass selectBox" bind:value={$locale} on:change={saveLocale}>
          <option value="en">English</option>
          <option value="ja">にほんご</option>
        </select>

        <div class="container">
          <div class="title">{$t('title')}</div>
          <div class="inputname">
            <input
              class="glass textfield"
              bind:value={$name}
              bind:this={ref}
              on:change={getLen}
              placeholder={$t('placeholder')}
            />
          </div>

          <div class="button_area">
            <a href="/playscreen"
              ><button
                class="playbutton"
                on:click={saveName}
                disabled
                class:isHidePlayButton={!$name}
              >
                {$t('Play')}
              </button></a
            >
          </div>
        </div>
      </div>
      <div class="glass ranking_area">
        <div class="container_ranking">
          <span class="ranking_title">{$t('rivals')}</span>
          <div class="scroll_ranking">
            <div class="column_ranking">
              {#await getScoreRivals($name) then rivalsScores}
                {#each rivalsScores as Score, i}
                  <div class="row_rank">
                    <div class="rank">{i + topIndex}</div>
                    <div class="timer_line" class:name={$name === Score.name}>
                      {Score.time}{$t('scoreSec')}
                    </div>
                    <div class="flex_name_list">
                      {#if isTwitterLink(Score.name)}
                        <div class="twitter_name" on:click={() => launchURL(Score.name)}>
                          {Score.name}
                        </div>
                      {:else}
                        {Score.name}
                      {/if}
                    </div>
                  </div>
                {/each}
              {/await}
            </div>
          </div>
        </div>

        <div class="container_ranking">
          <span class="ranking_title">{$t('TOP1000')}</span>
          <div class="scroll_ranking">
            <div class="column_ranking">
              {#await getScore('top1000')}
                <p>loading...</p>
              {:then top1000Scores}
                {#each top1000Scores as Score, i}
                  <div class="row_rank">
                    <div class="rank">{i + 200}</div>
                    <div class="timer_line" class:name={$name === Score.name}>
                      {Score.time}{$t('scoreSec')}
                    </div>
                    <div class="flex_name_list">
                      {#if isTwitterLink(Score.name)}
                        <div class="twitter_name" on:click={() => launchURL(Score.name)}>
                          {Score.name}
                        </div>
                      {:else}
                        {Score.name}
                      {/if}
                    </div>
                  </div>
                {/each}
              {/await}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div></Background
>

<style lang="scss">
  .flex {
    display: flex;
    justify-content: center;
    padding: 3vmin;
    height: calc(100vh - 60px - 6vmin);

    .grid {
      /* display: flex;
      gap: 3vmin;
      flex-direction: column; */

      .wrapper {
        height: calc(50% - 3vmin);

        .selectBox {
          padding: 0 1vmin;
          height: 3.2vh;
          font: 2vmin 'Orbitron';
          cursor: pointer;
        }
        .container {
          height: calc(100% - 3.2vh);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;

          .title {
            font-size: 4vmin;
          }

          .inputname {
            width: 100%;
            text-align: center;

            .textfield {
              width: 50%;
              height: 3.2vh;
              backdrop-filter: blur(7px);
              -webkit-backdrop-filter: blur(7px);
              text-align: center;
              font: 2vmin 'Orbitron';
            }
          }

          .button_area {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .playbutton {
              border-radius: 100%;
              background: rgba(241, 113, 113, 0.5);
              color: #fff;
              border: none;
              height: 20vh;
              width: 20vh;
              -webkit-backdrop-filter: blur(20px);
              backdrop-filter: blur(20px);
              box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
              font: 4vh 'Orbitron';

              &:hover {
                cursor: pointer;
                background: rgba(241, 113, 113, 0.4);
              }
            }
            .isHidePlayButton {
              visibility: hidden;
              :disabled {
                display: none;
              }
            }
          }
        }
      }

      .ranking_area {
        display: flex;
        width: calc(92vmin - 2vmin);
        height: 50%;
        padding: 2vmin;
        gap: 1vmin;

        .container_ranking {
          width: calc(50% - (1vmin / 2));
          display: flex;
          flex-direction: column;
          align-items: center;

          .ranking_title {
            font-size: 3vmin;
            margin: 0 0 2vmin 0;
          }

          .scroll_ranking::-webkit-scrollbar {
            display: none;
          }

          .scroll_ranking {
            width: 100%;
            height: 90%;
            overflow-y: auto;
            -ms-overflow-style: none; /*IE, Edge 対応*/
            scrollbar-width: none;

            .column_ranking {
              display: flex;
              flex-direction: column;
              text-align: center;
              gap: 1.7vmin;
              width: 100%;

              .row_rank {
                display: flex;
                /* align-items: center; */
                font-size: 2.8vmin;
                line-height: 1;
                /* height: 2.7vmin; */
                gap: 1vmin;

                .rank {
                  text-align: end;
                  width: 7vmin;
                }

                .timer_line {
                  text-align: start;
                  border-left: 0.5vmin solid #22aa5b;
                  padding-left: 1vmin;
                  width: 14.5vmin;
                  white-space: nowrap;
                }

                .flex_name_list {
                  width: 20vmin;
                  text-align: start;
                  word-break: break-all;
                }

                .flex_name_list::-webkit-scrollbar {
                  display: none;
                }

                .name {
                  border-left: 0.5vmin solid #ff00ff;
                }
              }
            }
          }
        }
      }
    }
  }

  .twitter_name {
    color: blue;
    &:hover {
      cursor: pointer;
    }
  }

  .glass {
    background-color: rgba(255, 255, 255, 0.35);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 10px;
    border: none;
    outline: none;
  }
</style>
