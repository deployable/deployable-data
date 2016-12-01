"use strict";
var debug       = require('debug')('dply:data:route:site')
var router      = require('express').Router()

router.get('/',function(req,res){
  res.send('hello')
})

router.get('/something',function(req,res){
  res.send('something')
})

module.exports = router
