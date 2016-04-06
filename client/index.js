
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Login from './components/Login'
import SignUp from './components/SignUp'
import App from './containers/App'
import configure from './store'

const store = configure()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="signup" component={SignUp} />
        <Route path="login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
