import {Map} from 'immutable'

import * as usersActions from './users.actions'
import {Users, User} from './user.immutable'

const initialState = new Users()

const revive = ({entities}) => {
  // TODO: refactor
  Object.keys(entities).map((value, index) => entities[value] = new User(entities[value]))
  return initialState.merge({
    entities: Map(entities)
  })
}

export default function usersReducer (state = initialState, action) {
  if (!(state instanceof Users)) return revive(state)

  switch (action.type) {
    case usersActions.FETCH_USER_SUCCESS:
      const user = new User(action.payload.user)
      return state.updateIn(['entities'], map => map.set(user.get('id'), user))
  }

  return state
}
