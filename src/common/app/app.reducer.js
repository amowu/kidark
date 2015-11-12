import {combineReducers} from 'redux'

import intlReducer from '../intl/intl.reducer'
import usersReducer from '../users/users.reducer'

const appReducer = combineReducers({
  $$intl: intlReducer,
  $$users: usersReducer
})

export default appReducer
