
import { handleActions } from 'redux-actions'

const initialState = null

export default handleActions({
  'FIREBASE_CREATE_USER': (state, action) => {
    if (action.error) {
      const {
        payload: {
          code,
          message
        }
      } = action
      console.log(`${code}: ${message}`)
    } else {
      const {
        payload: {
          uid
        }
      } = action
      console.log(`Successfully created user account with uid: ${uid}`)
    }
    return state
  },

  'FIREBASE_AUTH_WITH_PASSWORD': (state, action) => {
    if (action.error) {
      const {
        payload: {
          code
        }
      } = action

      console.log(`ERROR: ${code}`)

      return state
    } else {
      const {
        payload: {
          expires,
          provider,
          token,
          uid
        }
      } = action

      return { expires, provider, token, uid }
    }
  }
}, initialState)
