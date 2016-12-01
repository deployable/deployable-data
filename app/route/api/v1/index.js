"use strict";
var debug       = require('debug')('dply:data:route:api:v1');
var router      = require('express').Router();

router.use( '/data', require('./data') );

module.exports = router;
