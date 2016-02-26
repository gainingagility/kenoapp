import fetch from 'isomorphic-fetch'
import ErrorHandler from '../utils/ErrorHandler.js'
import { push } from 'react-router-redux'
import moment from 'moment'

// ------------------------------------
// Constants
// ------------------------------------
export const GAMBLER_OBJECT_RECEIVED = 'GAMBLER_OBJECT_RECEIVED'
export const GAME_OBJECT_RECEIVED = 'GAME_OBJECT_RECEIVED'
export const IS_LOADING = 'IS_LOADING'
export const BALL_SELECTED = 'BALL_SELECTED'
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
        const roundStartTime = moment().zone('2013-03-07T07:00:00-08:00') // ISO8601 formatted string
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
          console.log(ex)
          ErrorHandler(ex)
        })
      }).catch((ex) => {
        console.log(ex)
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
  checkAuth
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GAMBLER_OBJECT_RECEIVED]: (state, action) => {
    return ({ ...state, 'gamblerObject': action.gamblerObject })
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
  'gameSettings': {
    'maxSelectedNumbers': 6,
    'maxCountOfNumbers': 80
  }
}
export default function KenoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
