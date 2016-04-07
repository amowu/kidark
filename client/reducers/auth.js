
import { handleActions } from 'redux-actions'

const initialState = null

export default handleActions({
  'FIREBASE_CREATE_USER': (state, action) => handleCreateUser(state, action),

  'FIREBASE_AUTH_WITH_PASSWORD': (state, action) => handleAuth(state, action),

  'FIREBASE_AUTH_WITH_CUSTOM_TOKEN': (state, action) => handleAuth(state, action)
}, initialState)

function handleError (state, action) {
  const {
    payload: {
      code,
      message
    }
  } = action

  console.error(`${code}: ${message}`)

  return state
}

function handleCreateUser (state, action) {
  if (action.error) {
    return handleError(state, action)
  } else {
    const {
      payload: {
        uid
      }
    } = action

    console.log(`Successfully created user account with uid: ${uid}`)

    return state
  }
}

function handleAuth (state, action) {
  if (action.error) {
    return handleError(state, action)
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
