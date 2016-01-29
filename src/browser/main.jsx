import createBrowserHistory from 'history/lib/createBrowserHistory'
import React from 'react'
import ReactDOM from 'react-dom'
import {IntlProvider} from 'react-intl'
import {Provider} from 'react-redux'
import Router from 'react-router'

import configureStore from '../common/configureStore'
import createRoutes from './createRoutes'

const initialState = window.__INITIAL_STATE__
const store = configureStore({initialState})
const routes = createRoutes(store.getState)

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider>
        <Router history={createBrowserHistory()}>
          {routes}
        </Router>
    </IntlProvider>
  </Provider>,
  document.getElementById('app')
)
