import {Map} from 'immutable'
import {bindActionCreators} from 'redux'

import * as dialoguesActions from '../dialogues/dialogues.actions'
import * as usersActions from '../users/users.actions'

const actions = [
  dialoguesActions,
  usersActions
]

export default function mapDispatchToProps (dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject()

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  }
}
