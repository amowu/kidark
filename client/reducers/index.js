
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import auth from './auth'
import todos from './todos'

export default combineReducers({
  routing,
  auth,
  todos
})
