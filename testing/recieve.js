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
  var encoder = avro.createFileEncoder('./recieved.avro', type)
  return
})
