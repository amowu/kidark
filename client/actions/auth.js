
import Firebase from 'Firebase'
import  { createAction } from 'redux-actions'

const fb = new Firebase('https://kidark.firebaseio.com/')

export const authWithPassword = createAction('FIREBASE_AUTH_WITH_PASSWORD', credentials =>
  fb.authWithPassword(credentials)
)

export const getAuth = createAction('FIREBASE_GET_AUTH', () =>
  fb.getAuth()
)

export const onAuth = createAction('FIREBASE_ON_AUTH', getAuthDispatcher =>
  fb.onAuth(authData => {
    if (authData) {
      getAuthDispatcher()
    }
  })
)

export const unauth = createAction('FIREBASE_UNAUTH', () =>
  fb.unauth()
)
