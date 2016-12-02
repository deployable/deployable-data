// producer.js 

const avro  = require('avsc')
const zmq   = require('zmq')
const sock  = zmq.socket('push')
const _     = require('lodash')
const uuid  = require('uuid')
const debug = require('debug')('dply:data:testing:produce')

let url = 'ipc://'+__dirname+'/var/zmq.ipc' 
url = 'tcp://127.0.0.1:3555'

let zmqsock = sock.bindSync( url )
console.log('Producer bound to port '+url)

const SET_NUM = [0,1,2,3,4,5,6,7,8,9]
const SET_HEX_ALPHA = ['a','b','c','d','e','f'] 
const SET_HEX = [ ...SET_NUM, ...SET_HEX_ALPHA ]

const type = require('./avro.env.js')

setInterval(function(){
  if(zmqsock._zmq.pending > 0)
    console.log('server',zmqsock._zmq.pending)
}, 500)


const runit = function runit(tag){
  let rnd = _.sampleSize(SET_HEX, 4).join('')
  console.log(new Date().toISOString(), rnd)
  let uuidbuf = new Buffer(16)
  uuid.v4(null, uuidbuf)
  let message = type.toBuffer({
    kind:  'internal',
    name:  tag+rnd,
    other: 'other',
    date:  Date.now(),
    id:  uuidbuf
  })
  debug('message', message)
  sock.send(message)
}


setInterval(function(){runit('a')}, 499)

setInterval(function(){runit('b')}, 501)


