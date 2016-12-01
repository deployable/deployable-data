"use strict";
var debug       = require('debug')('dply:data:route:api:v2')
var router      = require('express').Router()

router.use( '/data', require('./data') )

module.exports = router
