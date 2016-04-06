
import Firebase from 'Firebase'
import  { createAction } from 'redux-actions'

const fb = new Firebase('https://kidark.firebaseio.com/')

export const signUp = createAction('FIREBASE_CREATE_USER', credentials =>
  fb.createUser(credentials)
)

export const login = createAction('FIREBASE_AUTH_WITH_PASSWORD', credentials =>
  fb.authWithPassword(credentials)
)
