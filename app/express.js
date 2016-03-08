var express = require('express')
var app = express()


app.use('/api', require('./route/api.js'))

app.get('/',function( req, res ){
  res.send('hello')
})

module.exports = app