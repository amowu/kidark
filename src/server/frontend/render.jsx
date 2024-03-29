import Promise from 'bluebird'
import {createMemoryHistory} from 'history'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {IntlProvider} from 'react-intl'
import {Provider} from 'react-redux'
import {RoutingContext, match} from 'react-router'
import serialize from 'serialize-javascript'
import useragent from 'useragent'

import createRoutes from '../../browser/createRoutes'
import configureStore from '../../common/configureStore'
import config from '../config'
import HTML from './HTML.jsx'

const fetchComponentDataAsync = async (dispatch, {components, location, params}) => {
  const promises = components
    .reduce((actions, component) => {
      return actions.concat(component.fetchActions || [])
    }, [])
    .map(action => {
      return dispatch(action({location, params})).payload.promise
    })
  await Promise.all(promises)
}

const getAppHTML = (store, renderProps) => {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <IntlProvider>
        <RoutingContext {...renderProps} />
      </IntlProvider>
    </Provider>
  )
}

const getScriptHTML = (clientState, headers, hostname, appJsFilename) => {
  let scriptHTML = ''
  const ua = useragent.is(headers['user-agent'])
  const needIntlPolyfill = ua.safari || (ua.ie && ua.version < '11')
  if (needIntlPolyfill) {
    scriptHTML += `
      <script src="/node_modules/intl/dist/Intl.min.js"></script>
      <script src="/node_modules/intl/locale-data/jsonp/en-US.js"></script>
    `
  }
  // Note how clientState is serialized. JSON.stringify is anti-pattern.
  // https://github.com/yahoo/serialize-javascript#user-content-automatic-escaping-of-html-characters
  return scriptHTML + `
    <script>
      window.__INITIAL_STATE__ = ${serialize(clientState)}
    </script>
    <script src="${appJsFilename}"></script>
  `
}

const renderPageAsync = (store, renderProps, req) => {
  const clientState = store.getState()
  const {headers, hostname} = req
  const appHTML = getAppHTML(store, renderProps)
  const {
    styles: { app: appCssFilename },
    javascript: { app: appJsFilename }
  } = webpackIsomorphicTools.assets()
  const scriptHTML = getScriptHTML(clientState, headers, hostname, appJsFilename)
  if (!config.isProduction) {
    webpackIsomorphicTools.refresh()
  }

  return '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
    <HTML
      appCssFilename={appCssFilename}
      bodyHTML={`<div id="app">${appHTML}</div>${scriptHTML}`}
      googleAnalyticsId={config.googleAnalyticsId}
      isProduction={config.isProduction}
    />
  )
}

export default function render (req, res, next) {
  const initialState = {}
  const store = configureStore({initialState})

  // Fetch logged in user here because routes may need it.
  // Remember we can use store.dispatch method.

  const routes = createRoutes(() => store.getState())
  const location = createMemoryHistory().createLocation(req.url)

  match({routes, location}, async (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
      return
    }

    if (error) {
      next(error)
      return
    }

    try {
      await fetchComponentDataAsync(store.dispatch, renderProps)
      const html = await renderPageAsync(store, renderProps, req)
      // renderProps are always defined with * route.
      // https://github.com/rackt/react-router/blob/master/docs/guides/advanced/ServerRendering.md
      const status = renderProps.routes.some(route => route.path === '*')
        ? 404
        : 200
      res.status(status).send(html)
    } catch (e) {
      next(e)
    }
  })
}
