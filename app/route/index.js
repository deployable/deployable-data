"use strict";
var debug       = require('debug')('dply:data:route');
var router      = require('express').Router();

router.use('/a',    require('./api/'));
router.use('/api',  require('./api/'));
router.use('/s',    require('./site/'));
router.use('/site', require('./site/'));

router.get('/something', function(req, res){
  res.send('something')
});

router.get('/', function(req, res){
  res.send('hello')
});

module.exports = router;
