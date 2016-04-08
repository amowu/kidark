
import { handleActions } from 'redux-actions'

const initialState = null

export default handleActions({
  'FIREBASE_AUTH_WITH_PASSWORD': (state, action) => {
    if (action.error) {
      return handleError(state, action)
    } else {
      return state
    }
  },

  'FIREBASE_GET_AUTH': (state, action) => {
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

  'FIREBASE_ON_AUTH': (state, action) => state,

  'FIREBASE_UNAUTH': (state, action) => null
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
