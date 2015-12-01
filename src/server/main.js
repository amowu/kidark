import express from 'express'

import api from './api'
import config from './config'
import frontend from './frontend'
import errorHandler from './lib/errorHandler'

const app = express()

app.use('/api/v1', api)
app.use(frontend)
app.use(errorHandler)

const {port} = config

app.listen(port, () => {
  console.log('Server started at port %d', port)
})
