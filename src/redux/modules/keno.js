import fetch from 'isomorphic-fetch'
import ErrorHandler from '../utils/ErrorHandler.js'
import { push } from 'react-router-redux'

// ------------------------------------
// Constants
// ------------------------------------
export const GAMBLER_OBJECT_RECEIVED = 'GAMBLER_OBJECT_RECEIVED'

// ------------------------------------
// Actions
// ------------------------------------
// "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// Check out: flowtype.org.

export const logIn = (playerName) => {
  return (dispatch) => {
    return fetch(`http://kenoapp.azurewebsites.net/gamblersname/${playerName}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: GAMBLER_OBJECT_RECEIVED,
          gamblerObject: json
        })
        dispatch(push('/app'))
      }).catch((ex) => {
        ErrorHandler(ex)
      })
  }
}

export const checkAuth = () => {
  return (dispatch, getState) => {
    const isUserNotLoggedIn = Object.keys(getState().keno.gamblerObject).length === 0
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
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  'gamblerObject': {}
}
export default function KenoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
