import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from './app/App.react'
import Home from './home/Page.react'
import Todos from './todos/Page.react'
import Resume from './users/Resume.react'
import NotFound from './notfound/Page.react'

export default function createRoutes (getState) {
  return (
    <Route path='/' component={App} >
      <IndexRoute component={Home} />
      <Route path='todos' component={Todos} />
      <Route path='user/:username' component={Resume} />
      <Route path='*' component={NotFound} />
    </Route>
  )
}
