import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import configureStore from '../common/configureStore'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import createEngine from 'redux-storage/engines/localStorage'
import createRoutes from './createRoutes'
import {IntlProvider} from 'react-intl'
import {Provider} from 'react-redux'

const engine = createEngine('este-app')
const initialState = window.__INITIAL_STATE__
const store = configureStore({engine, initialState})
const routes = createRoutes(store.getState)

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider>
      <Router history={createBrowserHistory()}>
        {routes}
      </Router>
    </IntlProvider>
  </Provider>,
  document.getElementById('app'),
  () => {
    // This is where state from local storage should be retrieved.
    // import storage from 'redux-storage'
    // storage.createLoader(engine)(store)
  }
)
