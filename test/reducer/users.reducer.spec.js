import {expect} from 'chai'

import * as usersAction from '../../src/common/users/users.actions'
import {Users, User} from '../../src/common/users/user.immutable'
import usersReducer from '../../src/common/users/users.reducer'

describe('users reducer', () => {
  const username = 'amowu'
  const userData = {
    firstName: 'Amo',
    lastName: 'Wu',
    objectId: 'XSGP2D0eAj',
    username: username
  }
  const usersData = {
    entities: {
      [username]: userData
    }
  }
  const users = new Users()
  const user = new User(userData)
  const state = users.updateIn(['entities'], map => map.set(userData['username'], user))
  it('should return the initial state', () => {
    expect(
      usersReducer(undefined, {})
    ).to.deep.equal(
      users
    )
  })
  it('should return same state when action not match', () => {
    expect(
      usersReducer(state, {})
    ).to.deep.equal(
      state
    )
  })
  it('should return revived state when server rendering', () => {
    expect(
      usersReducer(usersData, {})
    ).to.deep.equal(
      state
    )
  })
  it('should handle FETCH_USER_SUCCESS', () => {
    expect(
      usersReducer(users, {
        type: usersAction.FETCH_USER_SUCCESS,
        payload: userData
      })
    ).to.deep.equal(
      state
    )
  })
})
