import compression from 'compression'
import express from 'express'
import device from 'express-device'

import esteMiddleware from '../lib/esteMiddleware'
import render from './render'

const app = express()

app.use(esteMiddleware())
app.use(compression())

// Serve the static assets. We can cache them as they include hashes.
app.use('/assets', express.static('assets', {maxAge: '200d'}))
app.use('/_assets', express.static('build', {maxAge: '200d'}))

// Intl.
app.use('/node_modules/intl/dist', express.static('node_modules/intl/dist'))
app.use('/node_modules/intl/locale-data', express.static('node_modules/intl/locale-data'))

app.use(device.capture())

app.get('*', render)

app.on('mount', () => {
  console.log('App is available at %s', app.mountpath)
})

export default app
