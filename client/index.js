
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { Login, SignUp } from './components'
import App from './containers/App'
import configure from './store'

const store = configure()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="login" component={Login} />
        <Route path="signup" component={SignUp} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
