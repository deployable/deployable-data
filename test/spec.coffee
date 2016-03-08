expect  = require('chai').expect
app     = require '../app/express'
request = require 'supertest'


describe 'web cs', ->

  it 'gets /', (done)->
    request app
    .get '/'
    .then (result)->
      expect( result.res.text ).to.equal 'hello'
      done()

  it 'gets /api/', (done)->
    request app
    .get '/api/'
    .then (result)->
      expect( result.res.body ).to.eql message: 'hello'
      done()

