const app = require('./express')
const logger = console

app.listen( 3000, function(err){
  if (err) return logger.error(err)
  logger.info( 'Listening 3000' )
})

module.exports = app
