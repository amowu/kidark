
import { handleActions } from 'redux-actions'

import * as TYPE from '../constants/actions'

/** 預設 state.auth 的初始值為 null 表示未登入 */
const initialState = null

const reducer = {
  /** 匿名訪客登入 Firebase  */
  [TYPE.FIREBASE_AUTH_ANONYMOUSLY] (state, action) {
    if (action.error) {
      const { payload: { code, message }} = action
      console.error(`${code}: ${message}`)
      return null
    } else {
      return state
    }
  },
  /** 登入 Firebase */
  [TYPE.FIREBASE_AUTH_WITH_PASSWORD] (state, action) {
    if (action.error) {
      const { payload: { code, message }} = action
      console.error(`${code}: ${message}`)
      return null
    } else {
      return state
    }
  },
  /** 註冊 Firebase */
  [TYPE.FIREBASE_CREATE_USER_AND_AUTH_WITH_PASSWORD] (state, action) {
    if (action.error) {
      const { payload: { code, message }} = action
      console.error(`${code}: ${message}`)
      return null
    } else {
      return state
    }
  },
  /** 取得 Firebase 的登入資料 */
  [TYPE.FIREBASE_GET_AUTH] (state, action) {
    const {
      payload: { expires, provider, token, uid }
    } = action
    // TODO: 使用 immutable 來更新 state
    return { expires, provider, token, uid }
  },
  /** 登出 Firebase */
  [TYPE.FIREBASE_UNAUTH] (state, action) {
    return null
  }
}

export default handleActions(reducer, initialState)
