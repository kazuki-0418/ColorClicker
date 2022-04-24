import { browser } from '$app/env'
import { firebaseConfig } from '$lib/fireBaseConfig'
import { getApp, getApps, initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, limit, orderBy, query, where } from 'firebase/firestore'
import { writable } from 'svelte/store'

const BLANK = ''
const RIVALS_LENGTH = 10
const ALL_SCORE_LENGTH = 1000

export const name = writable(getStorageName())
browser && name.subscribe((val) => (window.localStorage.name = val))

let year = new Date().getFullYear()
let rankingAllList = []
let overRivalsScore = []
let underRivalsScore = []
let playerScore = []

function getStorageName(): string {
  if (!browser) return

  return window.localStorage.name ?? BLANK
}

initializeApp(firebaseConfig)
const firebaseApp = browser && getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const db = browser && getFirestore(firebaseApp)
const colRef = browser && collection(db, 'time-scores')

export async function fetchAllScores() {
  let topAllScores = []
  let topAllQuery =
    browser && query(colRef, orderBy('time'), where('year', '==', year), limit(1000))
  let querySnapshot = await getDocs(topAllQuery)

  querySnapshot.forEach((doc) => {
    topAllScores.push({
      // id: doc.id,
      year: doc.data().year,
      name: doc.data().name,
      time: doc.data().time,
    })
  })

  return topAllScores
}

async function filterRank(inputName: string) {
  rankingAllList = await fetchAllScores()

  return rankingAllList.filter(function (rankingList) {
    return rankingList.year == year && rankingList.name == inputName
  })
}

async function getPlayerScore(name: string) {
  playerScore = await filterRank(name)

  return playerScore.length == 0 ? null : playerScore
}

async function getRankinListWithUpToNumber() {
  if (rankingAllList == null) return []

  return rankingAllList.length > RIVALS_LENGTH
    ? rankingAllList.slice(0, RIVALS_LENGTH)
    : rankingAllList
}

// 早いスコアを4件、自分のスコアを1件、遅いスコア5件追加して表示する　or 自分が10位以内であれば10件表示させる
export async function getRivals(name: string) {
  playerScore = await getPlayerScore(name)
  overRivalsScore = await getOverScoreList(name)
  underRivalsScore = await getUnderScoreList(name)

  if (playerScore == null || rankingAllList == null) return []

  //TODO マジックナンバについて岩崎さんに9、5を再確認
  if (overRivalsScore.length < 9) {
    return getRankinListWithUpToNumber()
  } else if (underRivalsScore.length < 5) {
    let listOfOverScore = overRivalsScore.slice(overRivalsScore.length - 5, overRivalsScore.length)
    let listOfUnderScore = underRivalsScore.slice(0, underRivalsScore.length)

    return listOfOverScore.concat(playerScore).concat(listOfUnderScore)
  } else {
    let listOfOverScore = overRivalsScore.slice(overRivalsScore.length - 5, overRivalsScore.length)
    let listOfUnderScore = underRivalsScore.slice(0, 4)

    return listOfOverScore.concat(playerScore).concat(listOfUnderScore)
  }
}

async function getUnderScoreList(name: string) {
  playerScore = await getPlayerScore(name)

  if (playerScore == null) return []

  underRivalsScore = rankingAllList.filter(function (rankingList) {
    return playerScore[0].time < rankingList.time
  })

  return underRivalsScore
}

async function getOverScoreList(name: string) {
  playerScore = await getPlayerScore(name)

  if (playerScore == null) return []

  overRivalsScore = rankingAllList.filter(function (rankingList) {
    return playerScore[0].time > rankingList.time
  })

  return overRivalsScore
}

// 自分の９個上の順位番号を表示する
// マジックナンバーに番号
export async function getRankingTopNumber(name: string) {
  playerScore = await getPlayerScore(name)
  overRivalsScore = await getOverScoreList(name)
  underRivalsScore = await getUnderScoreList(name)

  if (playerScore == null || rankingAllList == null) return 1

  return overRivalsScore.length < 9 ? 1 : overRivalsScore.length - 4
}

// 取ってきた1000個のスコアの内、上位100個を生成する
export async function getTop1000() {
  rankingAllList = await fetchAllScores()

  if (rankingAllList.length > ALL_SCORE_LENGTH) {
    rankingAllList.slice(0, ALL_SCORE_LENGTH - 1)
  }

  return rankingAllList
}
