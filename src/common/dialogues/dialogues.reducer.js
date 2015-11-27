import {fromJS, Map} from 'immutable'
import {indexBy} from 'lodash'

import dialogues from './dialogues'
import * as dialoguesActions from './dialogues.actions'

const initialState = fromJS({
  current: null,
  entities: indexBy(dialogues, 'id')
})

function revive (state) {
  return initialState.merge(fromJS(state))
}

export default function dialoguesReducer (state = initialState, action) {
  if (!(state instanceof Map)) return revive(state)

  switch (action.type) {
    case dialoguesActions.CLEAR_CURRENT_DIALOGUE:
      return state.set('current', null)
    case dialoguesActions.SET_CURRENT_DIALOGUE:
      // TODO: check payload's dialogueId
      return state.set('current', action.payload)
  }

  return state
}
