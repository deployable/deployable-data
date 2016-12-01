"use strict";
var router      = require('express').Router()
var bodyParser  = require('body-parser')
var _           = require('lodash')
var debug       = require('debug')('dply:data:route:api:v1:data')

router.use(bodyParser.json())

router.get('/',function(req,res){
  res.json({app:'data'})
})

router.use('*',function(req,res,next){
  if ( !req.params.entity.match(/^[a-z0-9]$/i) )
    var err = new HttpError400('entity must be alpha numeric',{
        field:'entity',
        value:req.params.entity
    })
    return next(err)
  next()
})

router.post('/:entity',function(req,res,next){
  Data.create( req.params.entity, req.body ).then(function(data){
    res.json({ action:'create', data:data.fields })
  }).catch(next)
})

router.get('/:entity',function(req,res,next){
  Data.read( req.params.entity ).then(function(data){
    res.json({ action:'read', data:data.fields })
  }).catch(next)
})

router.put('/:entity',function(req,res,next){
  Data.update( req.params.entity, req.body ).then(function(data){
    res.json({ action:'update', data:data.fields })
  }).catch(next)
})

router.delete('/:entity',function(req,res,next){
  Data.delete( req.params.entity ).then(function(data){
    res.json({ action:'delete', data:data.fields })
  }).catch(next)
})

module.exports = router
