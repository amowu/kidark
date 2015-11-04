import {Map, Record} from 'immutable'

export const Users = Record({
  entities: Map()
})

export const User = Record({
  firstName: '',
  headline: '',
  id: '',
  lastName: '',
  pictureUrl: '',
  formattedName: '',
  phoneticFirstName: '',
  phoneticLastName: '',
  location: '',
  industry: '',
  summary: '',
  specialties: '',
  positions: '',
  emailAddress: '',
  skills: '',
  educations: '',
  dateOfBirth: ''
})
