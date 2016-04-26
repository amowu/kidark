/** @module actions/auth */

import Firebase from 'firebase'
import { createAction } from 'redux-actions'

import * as TYPE from '../constants/actions'

/**
 * Flux Standard Action for auth actions
 * @typedef {Object} AuthFSA
 * @property {string} type
 * @property {Object} payload
 */

 /**
  * Error Flux Standard Action for auth actions
  * @typedef {Object} ErrorAuthFSA
  * @property {string} type
  * @property {Error} payload
  * @property {boolean} error
  */

// TODO: firebaseURL 不該出現在這裡
const fb = new Firebase('https://kidark.firebaseio.com/')

/**
 * 使用匿名訪客的身份登入 Firebase
 * @return {Promise.<AuthFSA, ErrorAuthFSA>}
 */
export const authAnonymously = createAction(
  TYPE.FIREBASE_AUTH_ANONYMOUSLY,
  () => fb.authAnonymously()
)

/**
 * 使用信箱＆密碼登入 Firebase
 * @param {Object} credentials - 一個包含信箱和密碼的物件
 * @param {string} credentials.email - 信箱
 * @param {string} credentials.password - 密碼
 * @return {Promise.<AuthFSA, ErrorAuthFSA>}
 */
export const authWithPassword = createAction(
  TYPE.FIREBASE_AUTH_WITH_PASSWORD,
  credentials => fb.authWithPassword(credentials)
)

/**
 * 使用信箱＆密碼註冊，並且登入 Firebase
 * @param {Object} credentials - 一個包含信箱和密碼的物件
 * @param {string} credentials.email - 信箱
 * @param {string} credentials.password - 密碼
 * @return {Promise.<AuthFSA, ErrorAuthFSA>}
 */
export const createUserAndAuthWithPassword = createAction(
  TYPE.FIREBASE_CREATE_USER_AND_AUTH_WITH_PASSWORD,
  credentials => fb.createUser(credentials)
    .then(() => authWithPassword(credentials))
)

/**
 * 取得 Firebase 的登入資料
 * @return {AuthFSA}
 */
export const getAuth = createAction(
  TYPE.FIREBASE_GET_AUTH,
  () => fb.getAuth()
)

/**
 * 訂閱 Firebase 的所有 auth 相關事件
 * @param {function} callback
 * @return {Promise}
 */
export const onAuth = createAction(
  TYPE.FIREBASE_ON_AUTH,
  // TODO: 研究 callback 是否有必要
  callback => fb.onAuth(authData => {
    if (authData) {
      callback()
    }
  })
)

/**
 * 登出 Firebase
 */
export const unauth = createAction(
  TYPE.FIREBASE_UNAUTH,
  () => fb.unauth()
)