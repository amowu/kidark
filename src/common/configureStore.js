import {applyMiddleware, compose, createStore} from 'redux'
import createLogger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'

import appReducer from './app/app.reducer'
import injectDependencies from './lib/injectDependencies'
import stateToJS from './lib/stateToJS'
import fetch from './fetch'

export default function configureStore ({initialState}) {
  // Inject services for actions.
  const dependenciesMiddleware = injectDependencies(
    {fetch}
  )

  const middleware = [
    dependenciesMiddleware,
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    })
  ]

  const devToolsEnabled =
    process.env.NODE_ENV !== 'production' && process.env.IS_BROWSER

  if (devToolsEnabled) {
    const logger = createLogger({
      collapsed: true,
      transformer: stateToJS
    })
    // Logger must be the last middleware in chain.
    middleware.push(logger)
  }

  const createStoreWithMiddleware = applyMiddleware(...middleware)

  const finalCreateStore = devToolsEnabled
    ? compose(
      createStoreWithMiddleware,
      // Redux DevTools Extension
      // https://github.com/zalmoxisus/redux-devtools-extension
      window.devToolsExtension() || (f => f)
    )(createStore)
    : createStoreWithMiddleware(createStore)

  const store = finalCreateStore(appReducer, initialState)

  // Enable hot reload where available.
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('./app/app.reducer', () => {
      const nextAppReducer = require('./app/app.reducer')
      store.replaceReducer(nextAppReducer)
    })
  }

  return store
}
