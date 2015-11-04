import {combineReducers} from 'redux'

import intl from '../intl/reducer'
import todos from '../todos/reducer'
import users from '../users/reducer'

const appReducer = combineReducers({
  intl,
  todos,
  users
})

export default appReducer
