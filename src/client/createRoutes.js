import App from './app/App.react'
import Home from './home/Page.react'
import NotFound from './notfound/Page.react'
import React from 'react'
import Todos from './todos/Page.react'
import {IndexRoute, Route} from 'react-router'

export default function createRoutes (getState) {
  return (
    <Route component={App} path='/'>
      <IndexRoute component={Home} />
      <Route component={Todos} path='todos' />
      <Route component={NotFound} path='*' />
    </Route>
  )
}
