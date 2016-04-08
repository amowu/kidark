
import { handleActions } from 'redux-actions'

const initialState = null

export default handleActions({
  'FIREBASE_CREATE_USER': (state, action) => handleCreateUser(state, action),

  'FIREBASE_AUTH_WITH_PASSWORD': (state, action) => handleAuth(state, action),

  'FIREBASE_AUTH_WITH_CUSTOM_TOKEN': (state, action) => handleAuth(state, action),

  'FIREBASE_UNAUTH': (state, action) => null,

  'FIREBASE_CHECK_AUTH': (state, action) => {
    // 檢查 auth state (persists from localStorage) 是否存在
    if (!state) {
      // auth state 不存在，直接回傳 null
      return state
    } else {
      // 檢查 token 是否過期
      const { expires } = state
      const now = Math.floor(Date.now() / 1000)
      const tokenIsExpired = (now >= expires)

      if (tokenIsExpired) {
        // 過期，清空 auth state，使用者必須重新登入
        return null
      } else {
        // TODO: 使用 authWithCustomToken 登入
        //       可是好像不能在 reducer 裡面 dispatch action creator...
        return state
      }
    }
  }
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
