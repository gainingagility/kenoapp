import { push } from 'react-router-redux'
import { sendLogInRequest, joinGame, placeBet, processBet, balanceCheck } from '../utils/api/APIUtils.js'

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

// ------------------------------------
// Actions
// ------------------------------------
const setLoading = (dispatch, value) => {
  return (
    dispatch({
      type: IS_LOADING,
      value: value
    })
  )
}

export const logIn = (playerName) => {
  return (dispatch) => {
    sendLogInRequest(playerName).then(
      (response) => {
        dispatch({
          type: GAMBLER_OBJECT_RECEIVED,
          gamblerObject: response
        })
        dispatch(push('/app'))
      }
    )
  }
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

    joinGame(gamblerId).then(
      (jsonGame) => {
        dispatch({
          type: GAME_OBJECT_RECEIVED,
          gameObject: jsonGame
        })
        placeBet(detail, roundId, gamblerId).then(
          (jsonPlaceBet) => {
            dispatch({
              type: BET_OBJECT_RECEIVED,
              betObject: jsonPlaceBet
            })
            processBet(roundId, gamblerId).then(
            (jsonProcessBet) => {
              dispatch({
                type: PROCESS_BET_OBJECT_RECEIVED,
                processBetObject: jsonProcessBet
              })
              setLoading(dispatch, false)
              balanceCheck(gamblerId).then(
                (jsonBalanceCheck) => {
                  dispatch({
                    type: GAMBLER_OBJECT_RECEIVED,
                    gamblerObject: jsonBalanceCheck
                  })
                })
            },
            (ex) => setLoading(dispatch, true))
          },
           (ex) => setLoading(dispatch, false))
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
