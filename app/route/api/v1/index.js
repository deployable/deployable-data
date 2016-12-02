const debug  = require('debug')('dply:data:route:api:v1')
const router = require('express').Router()

router.use( '/data', require('./data') )
router.use( '/teapot', require('./teapot') )

module.exports = router
