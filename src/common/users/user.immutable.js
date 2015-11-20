import {Map, Record} from 'immutable'

export const Users = Record({
  $$entities: Map()
})

export const User = Record({
  firstName: '',
  lastName: '',
  objectId: '',
  username: ''
})
