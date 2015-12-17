import {fromJS, Map} from 'immutable'
import {indexBy} from 'lodash'

import dialogues from './dialogues'
import * as dialoguesActions from './dialogues.actions'

const initialState = fromJS({
  entities: indexBy(dialogues, 'id'),
  items: {
    open: false
  }
})

function revive (state) {
  return initialState.merge(fromJS(state))
}

export default function dialoguesReducer (state = initialState, action) {
  if (!(state instanceof Map)) return revive(state)

  switch (action.type) {
    case dialoguesActions.DELETE_CURRENT_DIALOGUE:
      return state.delete('current')
    case dialoguesActions.SET_CURRENT_DIALOGUE:
      return state.set('current', action.payload)
    case dialoguesActions.SET_ITEMS_MENU_VISIBLE:
      return state.setIn(['items', 'open'], action.payload)
  }

  return state
}
