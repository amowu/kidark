import React from 'react'
import {IndexRoute, Route} from 'react-router'

import App from './app/App.jsx'
import Home from './home/Home.react'
import NotFound from './notfound/NotFound.jsx'
import Resume from './resume/Resume.jsx'

export default function createRoutes (getState) {
  return (
    <Route path='/' component={App} >
      <IndexRoute component={Home} />
      <Route path='user/:username' component={Resume} />
      <Route path='*' component={NotFound} />
    </Route>
  )
}
