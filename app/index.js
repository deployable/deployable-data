app = require('./express')

app.listen( 3000, function(err,res){
  if (err) return console.error(err)
  console.log( 'listening' )
})
