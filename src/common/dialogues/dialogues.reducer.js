import {fromJS, Map} from 'immutable'
import {indexBy} from 'lodash'

import dialogues from './dialogues'

const initialState = fromJS({
  entities: indexBy(dialogues, 'id')
})

function revive (state) {
  return initialState.merge(fromJS(state))
}

export default function dialoguesReducer (state = initialState, action) {
  if (!(state instanceof Map)) {
    return revive(state)
  }

  return state
}
