import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import keno from './modules/keno'

export default combineReducers({
  keno,
  router
})
