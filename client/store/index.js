
import { compose, createStore, applyMiddleware } from 'redux'
import persistState from 'redux-localstorage'

import { logger, promise } from '../middleware'
import rootReducer from '../reducers'

export default function configure(initialState) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore

  const createPersistentStore = compose(
    persistState([
      'auth'
    ], {
      key: 'YOUR_REDUX_LOCALSTORAGE_KEY'
    })
  )(create)

  const createStoreWithMiddleware = applyMiddleware(
    logger,
    promise
  )(createPersistentStore)

  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
