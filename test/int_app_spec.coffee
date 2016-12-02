expect  = require('chai').expect
app     = require '../app/express'
request = require 'supertest'
debug   = require('debug') 'dply:data:test:int:app'


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

      it 'should not create a duplcite entity via POST /store/name/entity/name', ()->
        request app
        .post entity_url
        .send foo: 'bar'
        .then (result)->
          res = result.res
          expect( res.text ).to.match /^{/
          expect( res.body )
            .to.have.property 'error'
            .and.to.have.all.keys 'message', 'name', 'stack', 'status'
          expect( res.statusCode ).to.equal 400


      describe 'read', ->

        it 'should read an entity via GET /store/name/entity/name', ()->
          request app
          .get entity_url
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect( result.res.statusCode ).to.equal 200
            expect( result.res.body ).to.eql { status: 'read', data: entity_data }

        it 'should 404 on missing store read via GET /store/nope/entity/newentity', ()->
          request app
          .get "#{app_url_prefix}/store/nope/entity/newentity"
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect( result.res.statusCode ).to.equal 404
            expect( result.res.body )
              .to.have.property 'error'
              .and.to.have.all.keys 'message', 'name', 'stack', 'status'
            expect( result.res.body.error.message ).to.equal 'Store not found - nope'

        it 'should 404 on missing entity read via GET /store/a/entity/nope', ()->
          request app
          .get "#{app_url_prefix}/store/a/entity/nope"
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect( result.res.statusCode ).to.equal 404
            expect( result.res.body )
              .to.have.property 'error'
              .and.to.have.all.keys 'message', 'name', 'stack', 'status'
            expect( result.res.body.error.message ).to.equal 'Entity not found - nope'


      describe 'update', ->

        it 'should update an entity via PATCH /store/a/entity/newentity', ()->
          request app
          .patch entity_url
          .send { baz: 'yep' }
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect( result.res.statusCode ).to.equal 200
            expect( result.res.body ).to.eql { status: 'updated', data: { foo: 'bar', baz: 'yep' } }

        it 'should 404 on missing store update via PATCH /store/nope/entity/newentity', ()->
          request app
          .patch "#{app_url_prefix}/store/nope/entity/newentity"
          .send { baz: 'update store nope' }
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect( result.res.statusCode ).to.equal 404
            expect( result.res.body )
              .to.have.property 'error'
              .and.to.have.all.keys 'message', 'name', 'stack', 'status'
            expect( result.res.body.error.message ).to.equal 'Store not found - nope'

        it 'should 404 on missing entity update via PATCH /store/a/entity/nope', ()->
          request app
          .patch "#{app_url_prefix}/store/a/entity/nope"
          .send { baz: 'update entity nope' }
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect( result.res.statusCode ).to.equal 404
            expect( result.res.body )
              .to.have.property 'error'
              .and.to.have.all.keys 'message', 'name', 'stack', 'status'
            expect( result.res.body.error.message ).to.equal 'Entity not found - nope'


      describe 'replace', ->

        it 'should replace an entity via PUT /store/a/entity/newentity', ()->
          request app
          .put entity_url
          .send { replace: 'new' }
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect( result.res.statusCode ).to.equal 200
            expect( result.res.body ).to.eql { status: 'replaced', data: { replace: 'new' } }

        it 'should 404 on missing store replace via PUT /store/nope/entity/newentity', ()->
          request app
          .put "#{app_url_prefix}/store/nope/entity/newentity"
          .send { baz: 'replace store nope' }
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect( result.res.statusCode ).to.equal 404
            expect( result.res.body )
              .to.have.property 'error'
              .and.to.have.all.keys 'message', 'name', 'stack', 'status'
            expect( result.res.body.error.message ).to.equal 'Store not found - nope'

        it 'should 404 on missing entity replace via PUT /store/a/entity/nope', ()->
          request app
          .put "#{app_url_prefix}/store/a/entity/nope"
          .send { baz: 'replace entity nope' }
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect( result.res.statusCode ).to.equal 404
            expect( result.res.body )
              .to.have.property 'error'
              .and.to.have.all.keys 'message', 'name', 'stack', 'status'
            expect( result.res.body.error.message ).to.equal 'Entity not found - nope'


      describe 'delete', ->

        it 'should delete and entity via DELETE /store/a/entity/newentity', ()->
          request app
          .delete entity_url
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect( result.res.statusCode ).to.equal 200
            expect( result.res.body ).to.eql { status: 'deleted' }

        it 'should 404 on missing store via DELETE /store/nope/entity/newentity', ()->
          request app
          .delete "#{app_url_prefix}/store/nope/entity/newentity"
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect( result.res.statusCode ).to.equal 404
            expect( result.res.body )
              .to.have.property 'error'
              .and.to.have.all.keys 'message', 'name', 'stack', 'status'
            expect( result.res.body.error.message ).to.equal 'Store not found - nope'

        it 'should 200 on missing entity via DELETE /store/a/entity/nope', ()->
          request app
          .delete "#{app_url_prefix}/store/a/entity/nope"
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect( result.res.statusCode ).to.equal 200
            expect( result.res.body )
              .to.have.property 'status'
              .and.to.eql 'missing'


      describe 'errors', ->

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

        it 'should error on bad store', ()->
          request app
          .get "#{app_url_prefix}/store/a!b/entity/newentity"
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect( result.res.statusCode ).to.eql 400
            expect( result.res.body ).to.contain.key('error')
            err = result.res.body.error
            expect( err ).to.have.property('message').and.equal('Store name must be alpha numeric')
            expect( err ).to.have.property('name').and.equal('HttpError')
            expect( err ).to.have.property('status').and.equal(400)

        it 'should error on bad entity', ()->
          request app
          .get "#{app_url_prefix}/store/ab/entity/new£ntity"
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect( result.res.statusCode ).to.eql 400
            expect( result.res.body ).to.contain.key('error')
            err = result.res.body.error
            expect( err ).to.have.property('message').and.equal('Entity must be alpha numeric')
            expect( err ).to.have.property('name').and.equal('HttpError')
            expect( err ).to.have.property('status').and.equal(400)


      describe 'errors with NODE_ENV', ->

        old_node_env = null

        before ->
          old_node_env = process.env.NODE_ENV
          process.env.NODE_ENV = 'production'

        after ->
          process.env.NODE_ENV = old_node_env

        it 'remove stack from production error response', ->
          process.env.NODE_ENV = 'production'
          p = request app
          .get "#{app_url_prefix}/store/ab/entity/new£ntity"
          .then (result)->
            expect( result.res.body )
              .to.have.property 'error'
              .and.to.have.all.keys 'message', 'name', 'status'
          p


      describe 'schema', ->

        it 'create', ->
          request app
          .post "#{app_url_prefix}/store/a/schema"
          .send { afield: 'text' }
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect(result.res.body ).to.eql { status: 'dunno', store: 'a' }

        it 'read', ->
          request app
          .get "#{app_url_prefix}/store/a/schema"
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect(result.res.body ).to.eql { status: 'dunno', store: 'a' }

        it 'update', ->
          request app
          .patch "#{app_url_prefix}/store/a/schema"
          .send { newfield: 'text' }
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect(result.res.body ).to.eql { status: 'dunno', store: 'a' }

        it 'replace', ->
          request app
          .put "#{app_url_prefix}/store/a/schema"
          .send { afield: 'text' }
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect(result.res.body ).to.eql { status: 'dunno', store: 'a' }

        it 'delete', ->
          request app
          .delete "#{app_url_prefix}/store/a/schema"
          .then (result)->
            expect( result.res.text ).to.match /^\{/
            expect(result.res.body ).to.eql { status: 'dunno', store: 'a' }


    describe 'Api V1 - /api/v1/teapot', ->

      it 'should have a handle, and be short and stout', ->
        request app
        .get '/api/v1/teapot'
        .then (result)->
          expect( result.res.text ).to.match /^\{/
          expect( result.res.statusCode ).to.eql 418
          expect( result.res.body ).to.contain.key('teapot')
          debug(result.res.body.teapot)


    describe 'Data Api V2 - /api/v2/data', ->

      app_url_prefix = "/api/v2/data"

      it 'should recieve app info for GET /', ()->
        request app
        .get "#{app_url_prefix}/"
        .then (result)->
          expect( result.res.statusCode ).to.equal 200
          expect( result.res.body ).to.contain.key('app')
          app_info = result.res.body.app
          expect( app_info ).to.have.property('name').and.equal('data-nanotest')
          expect( app_info ).to.have.property('version').and.match(/^\d+\.\d+\.\d+/)
