
import Firebase from 'Firebase'
import  { createAction } from 'redux-actions'

import * as TYPE from '../constants/actions'

const fb = new Firebase('https://kidark.firebaseio.com/')

export const authWithPassword = createAction(
  TYPE.FIREBASE_AUTH_WITH_PASSWORD,
  credentials => fb.authWithPassword(credentials)
)

export const createUserAndAuthWithPassword = createAction(
  TYPE.FIREBASE_CREATE_USER_AND_AUTH_WITH_PASSWORD,
  credentials => fb.createUser(credentials)
    .then(() => authWithPassword(credentials))
)

export const getAuth = createAction(
  TYPE.FIREBASE_GET_AUTH,
  () => fb.getAuth()
)

export const onAuth = createAction(
  TYPE.FIREBASE_ON_AUTH,
  callback => fb.onAuth(authData => {
    if (authData) {
      callback()
    }
  })
)

export const unauth = createAction(
  TYPE.FIREBASE_UNAUTH,
  () => fb.unauth()
)
