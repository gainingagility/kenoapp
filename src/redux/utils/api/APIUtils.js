import { APIConstants } from './APIConstants.js'
import fetch from 'isomorphic-fetch'
import ErrorHandler from '../ErrorHandler.js'
import moment from 'moment'

export function sendLogInRequest (playerId) {
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.SERVER_NAME}${APIConstants.LOG_IN}${playerId}`)
          .then((responseGambler) => responseGambler.json())
          .then((jsonGambler) => {
            resolve(jsonGambler)
          }).catch((ex) => {
            ErrorHandler(ex)
          })
  })
}

export function joinGame (gamblerId, gameId) {
  const roundStartTime = moment().utcOffset('2013-03-07T07:00:00-08:00') // ISO8601 formatted string
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.SERVER_NAME}${APIConstants.JOIN_GAME}`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-cache'
      },
      body: JSON.stringify({
        'Id': 0,
        'RoundStartTime': roundStartTime,
        'RoundEndTime': null,
        'Gambler': null,
        'GamblerId': gamblerId,
        'KenoGameId': gameId,
        'KenoGame': null
      })
    }).then(
      (responseGame) => responseGame.json())
      .then((jsonGame) => {
        resolve(jsonGame)
      }).catch((ex) => {
        ErrorHandler(ex)
      })
  })
}

export function placeBet (detail, roundId, gamblerId) {
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.SERVER_NAME}${APIConstants.PLACE_BET}`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-cache'
      },
      body: JSON.stringify({
        'detail': detail,
        'roundId': roundId,
        'gamblerId': gamblerId
      })
    }).then((responsePlaceBet) => responsePlaceBet.json())
      .then((jsonPlaceBet) => {
        resolve(jsonPlaceBet)
      })
      .catch((ex) => {
        ErrorHandler(ex)
        reject(ex)
      })
  })
}

export function processBet (roundId, gamblerId) {
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.SERVER_NAME}${APIConstants.PROCESS_BET}${roundId}/gamblerId/${gamblerId}`)
      .then((responseProcessBet) => responseProcessBet.json())
      .then((jsonProcessBet) => {
        resolve(jsonProcessBet)
        if (jsonProcessBet.message !== undefined) {
          throw jsonProcessBet.message
        }
      })
      .catch((ex) => {
        ErrorHandler(ex)
        reject(ex)
      })
  })
}

export function balanceCheck (gamblerId) {
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.SERVER_NAME}${APIConstants.BALANCE_CHECK}${gamblerId}`)
     .then((responseBalanceCheck) => responseBalanceCheck.json())
     .then((jsonBalanceCheck) => {
       resolve(jsonBalanceCheck)
     })
      .catch((ex) => {
        ErrorHandler(ex)
      })
  })
}

export function getAllKenoGames () {
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.SERVER_NAME}${APIConstants.KENO_GAMES}`)
     .then((kenoGames) => kenoGames.json())
     .then((jsonKenoGames) => {
       resolve(jsonKenoGames)
     })
      .catch((ex) => {
        ErrorHandler(ex)
      })
  })
}
