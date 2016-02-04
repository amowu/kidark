import nock from 'nock'

import * as usersActions from '../../src/common/users/users.actions'
import { createMockStore } from '../helper'

describe('users actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  it('should create FETCH_USER_SUCCESS action when fetchUser has been done', done => {
    const expectedUserDate = {
      objectId: 'XSGP2D0eAj',
      username: 'amowu'
    }
    // Intercept HTTP call
    nock('https://iogtezo43j.execute-api.ap-northeast-1.amazonaws.com')
      .get('/dev/users/amowu')
      .reply(200, {
        user: expectedUserDate
      })
    const expectedActions = [{
      type: usersActions.FETCH_USER_START
    }, {
      type: usersActions.FETCH_USER_SUCCESS,
      payload: {
        user: expectedUserDate
      }
    }]
    const store = createMockStore({}, expectedActions, done)
    store.dispatch(usersActions.fetchUser())
  })
})
