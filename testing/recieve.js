// producer.js 
"use strict"

var avro = require('avsc');
var zmq  = require('zmq')
var sock = zmq.socket('pull')
var _    = require('lodash')

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

var url = 'ipc://'+__dirname+'/var/zmq.ipc' 
url = 'tcp://127.0.0.1:3555' 

var type = require('./avro.env.js')

var rc = sock.connect( url )
console.log('Worker connected to %s',url,rc)

sock.on('message', function(msg){
  console.log('work: %s', type.fromBuffer(msg))
  var x = type.fromBuffer(msg)
  _.keys(x).forEach(function(k,i){
    if(k!=='id') console.log('key:%s,val:%s',k,x[k]) 
    else console.log('key:%s,val%s',k,x[k].toString('base64'))
    _.random(1000000)
    _.random(1000000)
    _.random(1000000)
    _.random(1000000)
    _.random(1000000)
    _.random(1000000)
    _.random(1000000)
    _.random(1000000)
    _.random(1000000)
    _.random(1000000)
    _.random(1000000)
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64'),'utf8','hex')
    crypted += cipher.update(x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64'),'utf8','hex')
    crypted += cipher.update(x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64'),'utf8','hex')   
    crypted += cipher.update(x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64'),'utf8','hex') 
    crypted += cipher.update(x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64')+x.id.toString('base64'),'utf8','hex') 
    crypted += cipher.final('hex');

  })
  return
})
