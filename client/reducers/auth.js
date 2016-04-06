
import { handleActions } from 'redux-actions'

const initialState = {}

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
    return state
  }
}, initialState)
