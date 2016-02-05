import { fromJS, Map } from 'immutable'

import * as usersActions from './users.actions'

const initialState = fromJS({
  entities: {}
})

const revive = (state) => {
  return initialState.merge(fromJS(state))
}

export default function usersReducer (state = initialState, action) {
  if (!(state instanceof Map)) return revive(state)

  switch (action.type) {
    case usersActions.FETCH_USER_SUCCESS:
      const user = action.payload
      return state.setIn(['entities', user['username']], fromJS(user))
  }

  return state
}
