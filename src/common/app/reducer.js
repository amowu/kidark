import {combineReducers} from 'redux'

import intl from '../intl/reducer'
import usersReducer from '../users/users.reducer'

const appReducer = combineReducers({
  intl,
  $$users: usersReducer
})

export default appReducer
