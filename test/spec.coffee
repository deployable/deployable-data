expect  = require('chai').expect
app     = require '../app/express'
request = require 'supertest'


describe 'data', ->

  it 'gets /', ()->
    request app
    .get '/'
    .then (result)->
      expect( result.res.statusCode ).to.equal 200
      expect( result.res.text ).to.equal 'hello'

  it 'gets /something', ()->
    request app
    .get '/something'
    .then (result)->
      expect( result.res.statusCode ).to.equal 200
      expect( result.res.text ).to.equal 'something'

  it 'gets /s/', ()->
    request app
    .get '/s/'
    .then (result)->
      expect( result.res.statusCode ).to.equal 200
      expect( result.res.text ).to.equal 'hello'

  it 'gets /s/something', ()->
    request app
    .get '/s/something'
    .then (result)->
      expect( result.res.statusCode ).to.equal 200
      expect( result.res.text ).to.equal 'something'


  describe '/api', ->

    it 'gets /api/', ()->
      request app
      .get '/api/'
      .then (result)->
        expect( result.res.statusCode ).to.equal 200
        expect( result.res.body ).to.eql message: 'hello'


    describe '/api/v1/data', ->

      app_url_prefix = "/api/v1/data"

      it 'gets /', ()->
        request app
        .get "#{app_url_prefix}/"
        .then (result)->
          expect( result.res.statusCode ).to.equal 200
          expect( result.res.body ).to.eql app: 'data'

      entity_url = "#{app_url_prefix}/store/a/entity/newentity"
      entity_data = { foo: 'bar' }

      it 'should create a new entity via POST /store/name/entity/name', ()->
        request app
        .post entity_url
        .send foo: 'bar'
        .then (result)->
          expect( result.res.text ).to.match /^{/
          expect( result.res.body ).to.eql { status: 'created', data: entity_data }

      it 'should read an entity via GET /store/name/entity/name', ()->
        request app
        .get entity_url
        .then (result)->
          expect( result.res.text ).to.match /^\{/
          expect( result.res.statusCode ).to.equal 200
          expect( result.res.body ).to.eql { status: 'read', data: entity_data }

      it 'should update an entity via PATCH /store/name/entity/name', ()->
        request app
        .patch entity_url
        .then (result)->
          expect( result.res.text ).to.match /^\{/
          expect( result.res.statusCode ).to.equal 200
          expect( result.res.body ).to.eql { status: 'updated', data: entity_data }

      it 'should replace an entity via PUT /store/name/entity/name', ()->
        request app
        .put entity_url
        .then (result)->
          expect( result.res.text ).to.match /^\{/
          expect( result.res.statusCode ).to.equal 200
          expect( result.res.body ).to.eql { status: 'replaced', data: entity_data }

      it 'deletes /api/v1/data newentity', ()->
        request app
        .delete entity_url
        .then (result)->
          expect( result.res.text ).to.match /^\{/
          expect( result.res.statusCode ).to.equal 200
          expect( result.res.body ).to.eql { status: 'deleted' }

      it 'should raise a 404 for /api/v1/data/newentity', ()->
        request app
        .get '/api/v1/data/newentity'
        .then (result)->
          expect( result.res.text ).to.match /^\{/
          expect( result.res.statusCode ).to.eql 404
          expect( result.res.body ).to.eql
            error:
              message: 'Object not found'
              name: 'HttpError'
              status: 404
