import {expect} from 'chai'
import {applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

import fetch from '../src/common/fetch'
import injectDependencies from '../src/common/lib/injectDependencies'

const dependenciesMiddleware = injectDependencies(
  {fetch}
)
const middleware = [
  dependenciesMiddleware,
  promiseMiddleware
]
export const createMockStore = (getState, expectedActions, done) => {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.')
  }
  if (typeof done !== 'undefined' && typeof done !== 'function') {
    throw new Error('done should either be undefined or function.')
  }
  const mockStoreWithoutMiddleware = () => {
    return {
      getState () {
        return typeof getState === 'function'
          ? getState() : getState
      },
      dispatch (action) {
        const expectedAction = expectedActions.shift()
        try {
          expect(action).to.deep.equal(expectedAction)
          if (done && !expectedActions.length) {
            done()
          }
          return action
        } catch (e) {
          done(e)
        }
      }
    }
  }
  const mockStoreWithMiddleware = applyMiddleware(...middleware)(mockStoreWithoutMiddleware)
  return mockStoreWithMiddleware()
}
