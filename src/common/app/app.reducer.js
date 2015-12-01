import {combineReducers} from 'redux'

import dialoguesReducer from '../dialogues/dialogues.reducer'
import intlReducer from '../intl/intl.reducer'
import usersReducer from '../users/users.reducer'

const appReducer = combineReducers({
  dialogues: dialoguesReducer,
  $$intl: intlReducer,
  $$users: usersReducer
})

export default appReducer
