import express from 'express'

import api from './api'
import frontend from './frontend'
import errorHandler from './lib/errorHandler'
import config from './config'

const app = express()

app.use('/api/v1', api)
app.use(frontend)
app.use(errorHandler)

app.listen(config.port, () => {
  console.log('Server started at port %s', config.port)
})
