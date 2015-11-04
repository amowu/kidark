import {combineReducers} from 'redux'

import intl from '../intl/reducer'
import todos from '../todos/reducer'
import usersReducer from '../users/users.reducer'

const appReducer = combineReducers({
  intl,
  todos,
  users: usersReducer
})

export default appReducer
