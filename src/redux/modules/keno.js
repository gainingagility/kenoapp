import { push } from 'react-router-redux'
import { sendLogInRequest, joinGame, placeBet, processBet,
        balanceCheck, getAllKenoGames } from '../utils/api/APIUtils.js'
import { getUserInfo } from '../utils/FacebookHelpers.js'
import RSVP from 'rsvp'

// ------------------------------------
// Constants
// ------------------------------------
export const PLAYER_OBJECT_RECEIVED = 'PLAYER_OBJECT_RECEIVED'
export const GAME_OBJECT_RECEIVED = 'GAME_OBJECT_RECEIVED'
export const FACEBOOK_USER_RECEIVED = 'FACEBOOK_USER_RECEIVED'
export const KENO_GAMES_RECEIVED = 'KENO_GAMES_RECEIVED'
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

export const logIn = (facebookResponse) => {
  return (dispatch) => {
    sendLogInRequest(facebookResponse.id).then(
      (response) => {
        dispatch({
          type: PLAYER_OBJECT_RECEIVED,
          playerObject: response
        })
        // After user auth with facebook we must get
        // few objects from API calls and to do it ASYNC

        const promises = {
          kenoGames: getAllKenoGames(),
          userInfo: getUserInfo(facebookResponse.name, facebookResponse.id, facebookResponse.accessToken)
        }

        RSVP.hash(promises).then((results) => {
          dispatch({
            type: FACEBOOK_USER_RECEIVED,
            facebookUserObject: results.userInfo
          })
          dispatch({
            type: KENO_GAMES_RECEIVED,
            kenoGames: results.kenoGames
          })
        })
        dispatch(push('/lobby'))

        // We need to add checking error
      /*  joinGame(response.id).then(
        (jsonGame) => {
          dispatch({
            type: GAME_OBJECT_RECEIVED,
            gameObject: jsonGame
          })
        }) */
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

export const checkUserLogIn = () => {
  return (dispatch, getState) => {
    // Check if user Log in
    if (Object.keys(getState().keno.playerObject) !== undefined || getState().keno.playerObject.message !== undefined) {
      dispatch(push('/login'))
    }
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
                    type: PLAYER_OBJECT_RECEIVED,
                    playerObject: jsonBalanceCheck
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
    console.log(getState().keno.gamblerObject.id)
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
  checkUserLogIn,
  checkAuth
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PLAYER_OBJECT_RECEIVED]: (state, action) => {
    return ({ ...state, 'playerObject': action.playerObject })
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
  },
  [FACEBOOK_USER_RECEIVED]: (state, action) => {
    return ({ ...state, 'facebookUserObject': action.facebookUserObject })
  },
  [KENO_GAMES_RECEIVED]: (state, action) => {
    return ({ ...state, 'kenoGames': action.kenoGames })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  'playerObject': {},
  'facebookUserObject': {},
  'gameObject': {
    'id': null,
    'roundStartTime': null,
    'roundEndTime': null,
    'gamblerId': null
  },
  'betObject': {},
  'processBetObject': {},
  'selectedBalls': '',
  'kenoGames': [],
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
