import { expect } from 'chai'
import { fromJS } from 'immutable'
import serialize from 'serialize-javascript'

import * as usersAction from '../../src/common/users/users.actions'
import usersReducer from '../../src/common/users/users.reducer'

describe('users reducer', () => {
  const initialStateData = {
    entities: {}
  }
  const expectedInitialState = fromJS(initialStateData)
  it('should return the initial state', () => {
    expect(
      usersReducer(undefined, {})
    ).to.deep.equal(
      expectedInitialState
    )
  })
  const immutableState = fromJS(initialStateData)
  it('should return same state when action not match', () => {
    expect(
      usersReducer(immutableState, {})
    ).to.deep.equal(
      immutableState
    )
  })
  const initialStateFromServer = JSON.parse(serialize(immutableState))
  it('should return revived state when server rendering', () => {
    expect(
      usersReducer(initialStateFromServer, {})
    ).to.deep.equal(
      expectedInitialState
    )
  })
  const payload = {
    'objectId': 'XSGP2D0eAj',
    'username': 'amowu'
  }
  const expectedStateAfterFetchUserSuccess = fromJS({
    'entities': {
      'amowu': payload
    }
  })
  it('should handle FETCH_USER_SUCCESS', () => {
    expect(
      usersReducer(immutableState, {
        type: usersAction.FETCH_USER_SUCCESS,
        payload: payload
      })
    ).to.deep.equal(
      expectedStateAfterFetchUserSuccess
    )
  })
})
