
import { handleActions } from 'redux-actions'

import * as TYPE from '../constants/actions'

const initialState = null

export default handleActions({
  [TYPE.FIREBASE_AUTH_WITH_PASSWORD]: (state, action) => {
    if (action.error) {
      return handleError(state, action)
    } else {
      return state
    }
  },

  [TYPE.FIREBASE_CREATE_USER_AND_AUTH_WITH_PASSWORD]: (state, action) => {
    if (action.error) {
      return handleError(state, action)
    } else {
      return state
    }
  },

  [TYPE.FIREBASE_GET_AUTH]: (state, action) => {
    const {
      payload: {
        expires,
        provider,
        token,
        uid
      }
    } = action

    return { expires, provider, token, uid }
  },

  [TYPE.FIREBASE_UNAUTH]: (state, action) => null
}, initialState)

function handleError (state, action) {
  const {
    payload: {
      code,
      message
    }
  } = action

  console.error(`${code}: ${message}`)

  return null
}
