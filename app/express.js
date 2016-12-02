const express        = require('express')
const app            = express()

const Logger         = require('../lib/logger')


if (process.env.NODE_ENV !== 'test'){
  app.use(Logger.express_logger)
}

app.use('/', require('./route'))

module.exports = app
