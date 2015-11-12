import nock from 'nock'

import * as usersActions from '../../src/common/users/users.actions'
import {createMockStore} from '../helper'

describe('users actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  it('should create FETCH_USER_SUCCESS action when fetchUser has been done', done => {
    const expectedUserDate = {
      id: '26',
      firstName: 'Amo',
      lastName: 'Wu'
    }
    // Intercept HTTP call
    nock('http://localhost:8000')
      .get('/api/v1/user/amowu')
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
