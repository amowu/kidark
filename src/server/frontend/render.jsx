import Promise from 'bluebird'
import {createMemoryHistory} from 'history'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {IntlProvider} from 'react-intl'
import {Provider} from 'react-redux'
import {RoutingContext, match} from 'react-router'
import serialize from 'serialize-javascript'
import useragent from 'useragent'

import {HOT_RELOAD_PORT} from '../../../webpack/constants'
import createRoutes from '../../browser/createRoutes'
import configureStore from '../../common/configureStore'
import config from '../config'
import getAppAssetFilenamesAsync from './assets'
import HTML from './HTML.jsx'

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
      res.send(html)
    } catch (e) {
      next(e)
    }
  })
}

async function fetchComponentDataAsync (dispatch, {components, location, params}) {
  const fetchActions = components.reduce((actions, component) => {
    return actions.concat(component.fetchActions || [])
  }, [])
  const promises = fetchActions.map(action => dispatch(action(
    {location, params}
  )))

  // Because redux-promise-middleware always returns fulfilled promise, we have
  // to detect errors manually.
  // https://github.com/pburtchaell/redux-promise-middleware#usage
  const results = await Promise.all(promises)
  results.forEach(result => {
    if (result.error) throw result.payload
  })
}

async function renderPageAsync (store, renderProps, req) {
  const clientState = store.getState()
  const {headers, hostname} = req
  const appHTML = getAppHTML(store, renderProps)
  const {js: appJsFilename, css: appCssFilename} = await getAppAssetFilenamesCachedAsync()
  const scriptHTML = getScriptHTML(clientState, headers, hostname, appJsFilename)

  return '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
    <HTML
      appCssFilename={appCssFilename}
      bodyHTML={`<div id="app">${appHTML}</div>${scriptHTML}`}
      googleAnalyticsId={config.googleAnalyticsId}
      isProduction={config.isProduction}
    />
  )
}

function getAppHTML (store, renderProps) {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <IntlProvider>
        <RoutingContext {...renderProps} />
      </IntlProvider>
    </Provider>
  )
}

let appAssetFilenameCache = null

async function getAppAssetFilenamesCachedAsync () {
  if (appAssetFilenameCache) return appAssetFilenameCache

  appAssetFilenameCache = await getAppAssetFilenamesAsync()

  return appAssetFilenameCache
}

function getScriptHTML (clientState, headers, hostname, appJsFilename) {
  let scriptHTML = ''

  const ua = useragent.is(headers['user-agent'])
  const needIntlPolyfill = ua.safari || (ua.ie && ua.version < '11')
  if (needIntlPolyfill) {
    scriptHTML += `
      <script src="/node_modules/intl/dist/Intl.min.js"></script>
      <script src="/node_modules/intl/locale-data/jsonp/en-US.js"></script>
    `
  }

  const appScriptSrc = config.isProduction
    ? `/_assets/${appJsFilename}`
    : `//${hostname}:${HOT_RELOAD_PORT}/build/app.js`

  // Note how clientState is serialized. JSON.stringify is anti-pattern.
  // https://github.com/yahoo/serialize-javascript#user-content-automatic-escaping-of-html-characters
  return scriptHTML + `
    <script>
      window.__INITIAL_STATE__ = ${serialize(clientState)}
    </script>
    <script src="${appScriptSrc}"></script>
  `
}
