<script lang="ts">
  import { onMount } from 'svelte'
  function sliceMaxLength() {
    const element = this as HTMLInputElement
    element.value = element.value.slice(0, element.maxLength)
  }
  // function onFocusDate() {
  //   const element = this as HTMLInputElement
  //   element.type = 'date'
  //   element.max = '9999-12-31'
  // }
  // function onFocusOutDate(event: Event) {
  //   const element = this as HTMLInputElement
  //   element.type = 'text'
  // }
  onMount(() => {
    const elements = document.getElementsByTagName('input')
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      if (element.getAttribute('type') == 'date') {
        element.setAttribute('max', '9999-12-31')
      }
    }
  })
  function handleKeydown(event: KeyboardEvent) {
    // NOTE: IME確定時のEnterを拾わないように keyCodeを利用している
    // https://qiita.com/ledsun/items/31e43a97413dd3c8e38e
    if (event.keyCode != 13) return
    // if (event.code != 'Enter') return
    const addition = event.shiftKey ? -1 : 1
    const element = document.activeElement as HTMLInputElement
    const elements = Array.from(
      document.querySelectorAll('input, select, textarea')
    ) as HTMLInputElement[]
    const elementsLength = elements.length
    const index = elements.findIndex((item) => {
      return item == element
    })
    const nextIndex = (index + addition + elementsLength) % elementsLength
    elements[nextIndex].focus()
    console.log('done')
  }
  function onClickSettings() {
    window.document.body.classList.toggle('dark-mode')
  }
  function donwload() {
    var alink = document.createElement('a')
    alink.href = '/millsheet.pdf'
    alink.download = 'millsheet.pdf'
    alink.click()
    alink.remove()
  }
  const dummyRows = Array<String>(10)
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="flex_column">
  <div style="width:100%; " class="flex_row_end">
    <button class="flex_row" on:click={onClickSettings}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 24 24"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#000000"
        ><g
          ><path d="M0,0h24v24H0V0z" fill="none" /><path
            d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
          /></g
        ></svg
      >
      <!-- 設定 -->
    </button>
  </div>

  <div class="flex_row">
    <div style="width:90px;">見積もりNo.</div>
    <div style="width: 85px">2584474</div>
    <button class="flex_row">詳細表示</button>
  </div>

  <div class="flex_row">
    <div style="width:90px;">届け先設定</div>
    <div class="flex_row" style="width: 85px;">
      <input type="checkbox" id="1" />
      <label for="1">あり</label>
    </div>
    <select required style="width: 145px;">
      <option value="">出荷履歴参照</option>
    </select>

    <input type="text" placeholder="郵便番号" />
    <div style="width: 20px;" />
    目安運賃
    <input type="text" value="20,000" style="text-align: right; width: 85px;" />円
  </div>

  <div class="flex_row">
    <div style="width:90px;">納期設定</div>
    <div class="flex_row" style="width: 85px;">
      <input type="checkbox" id="1" />
      <label for="1">あり</label>
    </div>
    <input type="text" value="2022/03/28" />

    <span style="color:red">この納期は少し厳しいです。詳細は弊社営業マンにご相談ください。</span>
  </div>

  <div class="flex_row">
    <div style="width:90px;">備考・メモ</div>
    <input type="text" value="" style="width:600px" />
  </div>

  <div class="list">
    <div class="list_header flex_row_wrap">
      <div>
        <input type="checkbox" id="0" />
      </div>
    </div>
    <div class="list_body">
      <div class="row flex_row">
        <input class="checkbox_slim" type="checkbox" id="1" />
        <div class="flex_column" style="padding-left: 10px;">
          <div class="flex_row">
            <div class="flex_row" style="width: 378px">
              <div style="width: 35px;">商品</div>
              <button class="flex_row" style="width:80px; background: #9f9;">溶接管</button>
              or
              <button class="flex_row" style="width:100px">シームレス</button>
              or
              <select>
                <option value="">その他</option>
                <option>TBS</option>
              </select>
            </div>
            <div class="flex_row" style="width: 190px;">
              <div style="width:35px">材質</div>
              <select required style="width: 85px;">
                <option>304</option>
              </select>
            </div>
            <div style="width: 70px">定尺</div>
            <div style="color:blue">在庫 ◎</div>
          </div>

          <div class="flex_row">
            <div class="flex_row" style="width: 202px;">
              <div style="width:35px" />
              <button style="width:120px">寸法テーブル</button>
            </div>
            <div class="flex_row" style="width: 170px;">
              <div style="width:35px">外径</div>
              <select style="width: 85px">
                <option>60.5</option>
              </select>
            </div>
            <div class="flex_row" style="width: 190px;">
              <div style="width:35px">肉厚</div>
              <select style="width: 85px">
                <option>60.5</option>
              </select>
            </div>
            <div class="flex_row" style="width: 170px;">
              <div style="width:35px">長さ</div>
              <select style="width: 85px">
                <option>4000</option>
              </select>
            </div>
          </div>

          <div class="flex_row">
            <div class="flex_row" style="width: 202px;">
              <div style="width:35px">数量</div>
              <input type="number" value="14" style="text-align: right; width: 85px" />
            </div>
            <div class="flex_row" style="width: 170px;">
              <div style="width:35px">重量</div>
              <input type="number" value="278.6" style="text-align: right; width: 85px" />kg
            </div>
            <div class="flex_row" style="width: 190px;">
              <div style="width:35px">単価</div>
              <input type="text" value="760" style="text-align: right; width: 85px" />円/kg
            </div>
            <div class="flex_row" style="width: 170px;">
              <div style="width:35px">金額</div>
              <input type="text" value="211,736" style="text-align: right; width: 85px" />円
            </div>
          </div>
        </div>
      </div>

      <div class="row flex_row">
        <input class="checkbox_slim" type="checkbox" id="1" />
        <div class="flex_column" style="padding-left: 10px;">
          <div class="flex_row">
            <div class="flex_row" style="width: 378px">
              <div style="width: 35px;">商品</div>
              <button class="flex_row" style="width:80px;">溶接管</button>
              or
              <button class="flex_row" style="width:100px">シームレス</button>
              or
              <select style="background: #9f9;">
                <option>TBS</option>
              </select>
            </div>
            <div class="flex_row" style="width: 190px;">
              <div style="width:35px">材質</div>
              <div>
                <input
                  type="text"
                  list="todokesaki"
                  style="width: 85px; text-align: right"
                  value="316L"
                />
                <datalist id="todokesaki">
                  <option value="あああああ" />
                </datalist>
              </div>
            </div>
            <div style="width: 70px">切断</div>
            <div style="color:orange">在庫 △</div>
          </div>

          <div class="flex_row">
            <div class="flex_row" style="width: 202px;">
              <div style="width:35px" />
              <button style="width:120px">寸法テーブル</button>
            </div>
            <div class="flex_row" style="width: 170px;">
              <div style="width:35px">外径</div>
              <select style="width: 85px">
                <option>19.0</option>
              </select>
            </div>
            <div class="flex_row" style="width: 190px;">
              <div style="width:35px">肉厚</div>
              <select style="width: 85px">
                <option>1.6</option>
              </select>
            </div>
            <div class="flex_row" style="width: 170px;">
              <div style="width:35px">長さ</div>
              <select style="width: 85px">
                <option>1230</option>
              </select>
            </div>
          </div>

          <div class="flex_row">
            <div class="flex_row" style="width: 202px;">
              <div style="width:35px">数量</div>
              <input type="number" value="140" style="text-align: right; width: 85px" />
            </div>
            <div class="flex_row" style="width: 170px;">
              <div style="width:35px">重量</div>
              <input type="number" value="133.8" style="text-align: right; width: 85px" />kg
            </div>
            <div class="flex_row" style="width: 190px;">
              <div style="width:35px">単価</div>
              <input type="text" value="2,480" style="text-align: right; width: 85px" />円/kg
            </div>
            <div class="flex_row" style="width: 170px;">
              <div style="width:35px">金額</div>
              <input type="text" value="211,736" style="text-align: right; width: 85px" />円
            </div>
          </div>
        </div>
      </div>
    </div>
    <script>
      window.channelPluginSettings = {
        plugin_id: `4e91cf86-c17c-4620-8ae9-8b7a5cfce600`,
      }
      ;(function () {
        var node = document.createElement('div')
        node.id = 'ch-plugin'
        document.body.appendChild(node)
        var async_load = function () {
          var s = document.createElement('script')
          s.type = 'text/javascript'
          s.async = true
          s.src = '//cdn.channel.io/plugin/ch-plugin-web.js'
          s.charset = 'UTF-8'
          var x = document.getElementsByTagName('script')[0]
          x.parentNode.insertBefore(s, x)
        }
        if (window.attachEvent) {
          window.attachEvent('onload', async_load)
        } else {
          window.addEventListener('load', async_load, false)
        }
      })()
    </script>
    <div class="list_footer">
      <div class="flex_row_wrap" />
      ※Web見積回答の回答単価、目安運賃、納期目安に関しては、概略回答となっておりますので、ご発注いただいた際に、変更となる場合があります。ご了承下さい。
    </div>
  </div>
</div>

<!-- <br /> -->
<!-- https://qiita.com/7note/items/8e9565c5afc752637c24 -->

<!-- https://proengineer.internous.co.jp/content/columnfeature/6493 -->
<style>
  :global(body) {
    color: #25292e;
    background-color: #ffffff;
    margin: 20px;
    font-size: 11pt;
    transition: all 0.3s ease;
  }
  /* https://coliss.com/articles/build-websites/operation/css/one-line-dark-mode-using-css.html */
  /* https://svelte.dev/repl/ed4fef4beceb4b0eb295d1f9fdf3bd62?version=3.6.9 */
  :global(body.dark-mode) {
    background-color: #0e1116;
    filter: invert(1) hue-rotate(180deg);
  }
  /* ::placeholder {
    font-size: 10pt;
  } */
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='text'] {
    width: 145px;
    box-sizing: border-box;
  }
  input[type='number'] {
    width: 145px;
    box-sizing: border-box;
    text-align: right;
  }
  div {
    vertical-align: baseline;
  }
  /* label {
    margin-right: 100px;
  } */
  /* label input[type='checkbox'] {
    display: none;
  } */
  /* label span {
    display: none;
    text-align: center;
    cursor: pointer;
    color: #666;
    border: 1px solid #aaa;
    border-radius: 5px;
    width: 130px;
    padding: 1px 0;
    font-size: 11pt;
    transition: all 0.3s ease;
    // NOTE: 以下は使っていない
    // display: block;
    // float: left;
    // margin: 10px 3px;
    // width: 100px;
    // height: 45px; 
    // line-height: 45px;
    // color: #b20000;
  } */
  /* label input:checked + span {
    border: 1px solid #31a9ee;
    background: #31a9ee;
    color: #ffffff;
  } */
  /* span:hover {
    border: 1px solid #333;
    background-color: #e2edf9;
  } */
  svg {
    width: 20px;
    fill: currentColor;
    opacity: 0.8;
  }
  .flex_row_list svg {
    color: #0073d2;
  }
  .grid_checkbox {
    display: grid;
    grid-template-columns: 120px 135px;
    grid-gap: 0px;
  }
  /* .width_long {
    width: calc(100% - 18px);
  } */
  .flex_column {
    display: flex;
    flex-flow: column;
    gap: 7px;
  }
  .flex_row,
  .flex_row_wrap,
  .flex_row_end {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .flex_row {
    overflow: auto;
  }
  .flex_row_list {
    display: flex;
    align-items: center;
    gap: 3px;
    margin-left: 5px;
  }
  .flex_row_upper {
    display: flex;
    align-items: flex-start;
    gap: 6px;
  }
  .flex_row_wrap {
    flex-wrap: wrap;
  }
  .flex_row_end {
    justify-content: flex-end;
  }
  select:invalid {
    color: gray;
  }
  .flex_cell_right {
    margin-left: auto;
  }
  .list {
    display: flex;
    flex-direction: column;
    margin-top: 8px;
    height: calc(100vh - 254px);
    min-height: 300px;
  }
  .list_body {
    flex: 1;
    overflow: auto;
  }
  /* .row_footer {
    position: fixed;
    bottom: 0;
    background-color: #f0f0f0;
    width: 100%;
    padding-top: 18px;
    padding-bottom: 20px;
  } */
</style>
