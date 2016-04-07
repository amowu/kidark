
import { compose, createStore, applyMiddleware } from 'redux'
// import * as storage from 'redux-storage'
import persistState from 'redux-localstorage'

import { logger, promise/*, storage as storageMiddleware*/ } from '../middleware'
import rootReducer from '../reducers'

export default function configure(initialState) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore

  // const storageReducer = storage.reducer(rootReducer)

  const createPersistentStore = compose(
    persistState()
  )(create)

  const createStoreWithMiddleware = applyMiddleware(
    logger,
    // storageMiddleware,
    promise
  // )(create)
  )(createPersistentStore)

  // const store = createStoreWithMiddleware(storageReducer, initialState)
  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
