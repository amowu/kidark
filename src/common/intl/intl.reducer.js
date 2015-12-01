import {Record} from 'immutable'

import messages from './messages'

const InitialState = Record({
  availableLanguages: ['en'],
  messages,
  selectedLanguage: 'en'
})
const initialState = new InitialState()

const revive = state =>
  initialState.set('selectedLanguage', state.selectedLanguage)

export default function intlReducer (state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state)

  return state
}
