
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import auth from './auth'
import todos from './todos'

export default combineReducers({
  router,
  auth,
  todos
})
