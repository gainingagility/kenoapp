import fetch from 'isomorphic-fetch'
import ErrorHandler from '../utils/ErrorHandler.js'
import { push } from 'react-router-redux'
import moment from 'moment'

// ------------------------------------
// Constants
// ------------------------------------
export const GAMBLER_OBJECT_RECEIVED = 'GAMBLER_OBJECT_RECEIVED'
export const GAME_OBJECT_RECEIVED = 'GAME_OBJECT_RECEIVED'
export const PROCESS_BET_OBJECT_RECEIVED = 'PROCESS_BET_OBJECT_RECEIVED'
export const IS_LOADING = 'IS_LOADING'
export const SELECT_BALLS = 'SELECT_BALLS'
export const PLAY_GAME = 'PLAY_GAME'
export const BET_OBJECT_RECEIVED = 'BET_OBJECT_RECEIVED'
export const CLEAR_RESULT = 'CLEAR_RESULT'
// API Constants
const SERVER_NAME = 'https://kenoapp.azurewebsites.net/'
const SEARCH_FOR_GAMBLER = 'gamblersname/' // http://{servername}/gamblersname/{playerName}
const JOIN_GAME = 'api/kenorounds/' //  http://{servername}/api/kenorounds
const PLACE_BET = 'api/bets/' // http://{servername}/api/bets
const PROCESS_BET = 'api/processround/' // http://{servername}/api/processround/{roundId}/gamblerId/{gamblerId}
const BALANCE_CHECK = 'gamblers/' // http://{servername}/gamblers/{gambler.Id}

// ------------------------------------
// Actions
// ------------------------------------
export const logIn = (playerName) => {
  return (dispatch) => {
    return fetch(`${SERVER_NAME}${SEARCH_FOR_GAMBLER}${playerName}`)
      .then((responseGambler) => responseGambler.json())
      .then((jsonGambler) => {
        dispatch({
          type: GAMBLER_OBJECT_RECEIVED,
          gamblerObject: jsonGambler
        })

        // After we get searchForGambler response
        // We send request to start game
        const roundStartTime = moment().utcOffset('2013-03-07T07:00:00-08:00') // ISO8601 formatted string
        const gamblerId = jsonGambler.id
        fetch(`${SERVER_NAME}${JOIN_GAME}${gamblerId}`, {
          method: 'post',
          headers: {
            'content-type': 'application/json',
            'cache-control': 'no-cache'
          },
          body: JSON.stringify({
            'Id': 0,
            'RoundStartTime': roundStartTime,
            'RoundEndTime': null,
            'GamblerId': gamblerId
          })
        }).then(
          (responseGame) => responseGame.json())
        .then((jsonGame) => {
          dispatch({
            type: GAME_OBJECT_RECEIVED,
            gameObject: jsonGame
          })
          // If all requests are successful - redirect to App page
          dispatch(push('/app'))
        })
        .catch((ex) => {
          ErrorHandler(ex)
        })
      }).catch((ex) => {
        ErrorHandler(ex)
      })
  }
}

const setLoading = (dispatch, value) => {
  return (
    dispatch({
      type: IS_LOADING,
      value: value
    })
  )
}

const balanceCheck = (dispatch, gamblerId) => {
  return fetch(`${SERVER_NAME}${BALANCE_CHECK}${gamblerId}`)
         .then((responseBalanceCheck) => responseBalanceCheck.json())
         .then((jsonBalanceCheck) => {
           dispatch({
             type: GAMBLER_OBJECT_RECEIVED,
             gamblerObject: jsonBalanceCheck
           })
         }).catch((ex) => {
           ErrorHandler(ex)
         })
}

export const selectBalls = (ballsNumber) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_BALLS,
      balls: ballsNumber
    })
  }
}

export const clearResult = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_RESULT
    })
  }
}

export const playGame = () => {
  return (dispatch, getState) => {
    const detail = getState().keno.selectedBalls
    const roundId = getState().keno.gameObject.id
    const gamblerId = getState().keno.gamblerObject.id

    setLoading(dispatch, true)

    return fetch(`${SERVER_NAME}${PLACE_BET}`, {
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
        dispatch({
          type: BET_OBJECT_RECEIVED,
          betObject: jsonPlaceBet
        })
        fetch(`${SERVER_NAME}${PROCESS_BET}${roundId}/gamblerId/${gamblerId}`)
        .then((responseProcessBet) => responseProcessBet.json())
        .then((jsonProcessBet) => {
          dispatch({
            type: PROCESS_BET_OBJECT_RECEIVED,
            processBetObject: jsonProcessBet
          })
          balanceCheck(dispatch, gamblerId)
          setLoading(dispatch, false)
          if (jsonProcessBet.message !== undefined) {
            throw jsonProcessBet.message
          }
        })
        .catch((ex) => {
          ErrorHandler(ex)
          setLoading(dispatch, false)
        })
      })
      .catch((ex) => {
        setLoading(dispatch, false)
        ErrorHandler(ex)
      })
  }
}

export const checkAuth = () => {
  return (dispatch, getState) => {
    const isUserNotLoggedIn = getState().keno.gamblerObject.id === null
    if (isUserNotLoggedIn) {
      dispatch(push('/'))
    }
  }
}

export const actions = {
  logIn,
  playGame,
  clearResult,
  selectBalls,
  checkAuth
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GAMBLER_OBJECT_RECEIVED]: (state, action) => {
    return ({ ...state, 'gamblerObject': action.gamblerObject })
  },
  [SELECT_BALLS]: (state, action) => {
    const selectedBalls = action.balls.toString()
    return ({ ...state, 'selectedBalls': selectedBalls })
  },
  [IS_LOADING]: (state, action) => {
    return ({ ...state, 'isLoading': action.value })
  },
  [BET_OBJECT_RECEIVED]: (state, action) => {
    return ({ ...state, 'betObject': action.betObject })
  },
  [CLEAR_RESULT]: (state, action) => {
    return ({ ...state, 'processBetObject': {}, betObject: {} })
  },
  [PROCESS_BET_OBJECT_RECEIVED]: (state, action) => {
    return ({ ...state, 'processBetObject': action.processBetObject })
  },
  [GAME_OBJECT_RECEIVED]: (state, action) => {
    return ({ ...state, 'gameObject': action.gameObject })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  'gamblerObject': {
    'id': null,
    'name': null,
    'points': null
  },
  'gameObject': {
    'id': null,
    'roundStartTime': null,
    'roundEndTime': null,
    'gamblerId': null
  },
  'betObject': {},
  'processBetObject': {},
  'selectedBalls': '',
  'isLoading': false,
  'gameSettings': {
    'maxSelectedNumbers': 6,
    'maxCountOfNumbers': 80
  }
}
export default function KenoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
