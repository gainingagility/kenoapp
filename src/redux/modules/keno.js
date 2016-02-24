import fetch from 'isomorphic-fetch'
import ErrorHandler from '../utils/ErrorHandler.js'
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
      }).catch((ex) => {
        ErrorHandler(ex)
      })
  }
}

export const actions = {
  logIn
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GAMBLER_OBJECT_RECEIVED]: (state, action) => {
    return ({ ...state, 'playerName': action.gamblerObject.name, 'points': action.gamblerObject.points })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  'playerName': '',
  'points': 0
}
export default function KenoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
