// producer.js 
"use strict"

var avro  = require('avsc')
var zmq   = require('zmq')
var sock  = zmq.socket('push')
var _     = require('lodash')
var uuid  = require('uuid')

var url = 'ipc://'+__dirname+'/var/zmq.ipc' 
url = 'tcp://127.0.0.1:3555'

var zmqsock = sock.bindSync( url )
console.log('Producer bound to port '+url)

const SET_NUM = [0,1,2,3,4,5,6,7,8,9]
const SET_HEX_ALPHA = ['a','b','c','d','e','f'] 
const SET_HEX = [ ...SET_NUM, ...SET_HEX_ALPHA ]

var type = require('./avro.env.js')

setInterval(function(){
  if(zmqsock._zmq.pending > 0)
    console.log('server',zmqsock._zmq.pending)
}, 56)

setInterval(function(){
  var msg = _.sampleSize(SET_HEX,4).join('')
  console.log(msg)
  var uuidbuf = new Buffer(16)
  uuid.v4(null,uuidbuf);
  var message = type.toBuffer({
    kind:  'internal',
    name:  msg,
    other: 'other',
    date:  Date.now(),
    id:  uuidbuf
  })
  sock.send(message)
}, 1)

setInterval(function(){
  var msg = _.sampleSize(SET_HEX,4).join('')
  console.log(msg)
  var uuidbuf = new Buffer(16)
  uuid.v4(null,uuidbuf);
  var message = type.toBuffer({
    kind:  'internal',
    name:  msg+msg+msg+msg+msg+msg,
    other: 'other',
    date:  Date.now(),
    id:  uuidbuf
  })
  sock.send(message)
}, 1)


