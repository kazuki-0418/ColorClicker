import { browser } from '$app/env'
import { firebaseConfig } from '$lib/fireBaseConfig'
import { getApp, getApps, initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, limit, orderBy, query, where } from 'firebase/firestore'
import { writable } from 'svelte/store'

export const name = writable(browser ? window.localStorage.name ?? '' : '')
browser && name.subscribe((val) => (window.localStorage.name = val))

let year = new Date().getFullYear()
let rankingAllList = []
let overRivalsScore = []
let underRivalsScore = []

let playerScore = []

initializeApp(firebaseConfig)
const firebaseApp = browser && getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const db = browser && getFirestore(firebaseApp)
const colRef = browser && collection(db, 'time-scores')
export const fetchAllScores = async () => {
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

const filterRank = async (inputName: string) => {
  rankingAllList = await fetchAllScores()
  return rankingAllList.filter(function (rankingList) {
    return rankingList.year == year && rankingList.name == inputName
  })
}

// 自分のスコアを取得する
const getPlayerScore = async (name) => {
  playerScore = await filterRank(name)
  return playerScore.length == 0 ? null : playerScore
}

const getRankinListWithUpToNumber = () => {
  if (rankingAllList == null) {
    return []
  }
  return rankingAllList.length > 10 ? rankingAllList.slice(0, 10) : rankingAllList
}

// 取ってきた1000個を使って自分より
// 早いスコアを9件、最後に自分のスコアを1件追加して表示する　or 自分が10位以内であれば10件表示させる
export const getRivals = async (name: String) => {
  playerScore = await getPlayerScore(name)
  overRivalsScore = await getOverScoreList(name)
  underRivalsScore = await getUnderScoreList(name)
  console.table(underRivalsScore)
  if (playerScore == null || rankingAllList == null) {
    return []
  }
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

const getUnderScoreList = async (name) => {
  playerScore = await getPlayerScore(name)
  if (playerScore == null) {
    return []
  }
  rankingAllList = await fetchAllScores()
  underRivalsScore = rankingAllList.filter(function (rankingList) {
    return playerScore[0].time < rankingList.time
  })
  return underRivalsScore
}

const getOverScoreList = async (name) => {
  playerScore = await getPlayerScore(name)
  if (playerScore == null) {
    return []
  }
  overRivalsScore = rankingAllList.filter(function (rankingList) {
    return playerScore[0].time > rankingList.time
  })
  return overRivalsScore
}

// 自分の９個上の順位を表示する
export const getRankingTopNumber = async (name) => {
  playerScore = await getPlayerScore(name)
  overRivalsScore = await getOverScoreList(name)
  underRivalsScore = await getUnderScoreList(name)
  if (playerScore == null || rankingAllList == null) {
    return 1
  }
  // if (underRivalsScore.length < 4) {
  //   return overRivalsScore.length - 3
  // }
  return overRivalsScore.length < 9 ? 1 : overRivalsScore.length - 4
}

// 取ってきた1000個のスコアの内、上位100個を生成する
export const getTop1000 = async () => {
  rankingAllList = await fetchAllScores()
  if (rankingAllList.length > 1000) {
    rankingAllList.slice(0, 999)
  }
  return rankingAllList
}
