expect  = require('chai').expect
app     = require '../app/express'
request = require 'supertest'


describe 'App Requests', ->

  it 'should get home page from GET /', ()->
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


  describe 'Api Endpoints - /api', ->

    it 'should recieve hello for GET /', ()->
      request app
      .get '/api/'
      .then (result)->
        expect( result.res.statusCode ).to.equal 200
        expect( result.res.body ).to.eql message: 'hello'


    describe 'Data Api V1 - /api/v1/data', ->

      app_url_prefix = "/api/v1/data"

      it 'should recieve app info for GET /', ()->
        request app
        .get "#{app_url_prefix}/"
        .then (result)->
          expect( result.res.statusCode ).to.equal 200
          expect( result.res.body ).to.contain.key('app')
          app_info = result.res.body.app
          expect( app_info ).to.have.property('name').and.equal('data-nanotest')
          expect( app_info ).to.have.property('version').and.match(/^\d+\.\d+\.\d+/)

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
          expect( result.res.body ).to.contain.key('error')
          err = result.res.body.error
          expect( err ).to.have.property('message').and.equal('Object not found')
          expect( err ).to.have.property('name').and.equal('HttpError')
          expect( err ).to.have.property('status').and.equal(404)

