const debug       = require('debug')('dply:data:route:api')
const router      = require('express').Router()
const bodyParser  = require('body-parser')

router.use(bodyParser.json())

// Default
router.use('/v1', require('./v1/'))
//router.use('/v1', require('dply-data-api-v1'))

router.use('/v2', require('./v2/'))
//router.use('/v2', require('dply-data-api-v2'))

router.get('/', function(req, res){
  res.json({message: 'hello'})
})

module.exports = router
