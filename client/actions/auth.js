
import Firebase from 'Firebase'
import  { createAction } from 'redux-actions'

const fb = new Firebase('https://kidark.firebaseio.com/')

export const createUser = createAction('FIREBASE_CREATE_USER', credentials =>
  fb.createUser(credentials)
)

export const authWithPassword = createAction('FIREBASE_AUTH_WITH_PASSWORD', credentials =>
  fb.authWithPassword(credentials)
)

export const authWithCustomToken = createAction('FIREBASE_AUTH_WITH_CUSTOM_TOKEN', authToken =>
  fb.authWithCustomToken(authToken)
)

export const unauth = createAction('FIREBASE_UNAUTH', () =>
  fb.unauth()
)

export const getAuth = createAction('FIREBASE_GET_AUTH', () =>
  fb.getAuth()
)

export const checkAuth = createAction('FIREBASE_CHECK_AUTH')
