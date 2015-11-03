import appReducer from './app/reducer'
import createLogger from 'redux-logger'
import fetch from './fetch'
import injectDependencies from './lib/injectDependencies'
import promiseMiddleware from 'redux-promise-middleware'
import stateToJS from './lib/stateToJS'
import validate from './validate'
import { compose, applyMiddleware, createStore } from 'redux'

export default function configureStore ({engine, initialState}) {
  // Inject services for actions.
  const dependenciesMiddleware = injectDependencies(
    {fetch},
    {validate}
  )

  const middleware = [
    dependenciesMiddleware,
    promiseMiddleware
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
      window.devToolsExtension || (f => f)
    )(createStore)
    : createStoreWithMiddleware(createStore)

  const store = finalCreateStore(appReducer, initialState)

  // Enable hot reload where available.
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('./app/reducer', () => {
      const nextAppReducer = require('./app/reducer')
      store.replaceReducer(nextAppReducer)
    })
  }

  return store
}
