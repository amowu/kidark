import {combineReducers} from 'redux'

// Note we are composing all reducers. Web, native, whatever. Of course we can
// pass platform specific reducers in configureStore, but there is no reason to
// do that, until app is really large.
import auth from '../auth/reducer'
import intl from '../intl/reducer'
import todos from '../todos/reducer'
import users from '../users/reducer'

const appReducer = combineReducers({
  auth,
  intl,
  todos,
  users
})

export default appReducer
