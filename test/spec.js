var expect = require('chai').expect
var app = require('../app/express')
var request = require('supertest')


describe('web js',function(){

  it('gets /',function(done){
    request(app)
    .get('/')
    .then(function(res){
      expect( res.res.text ).to.equal( 'hello' )
      done()
    }) 
  })

  it('gets /api/',function(done){
    request(app)
    .get('/api/')
    .then(function(res){
      expect( res.res.body ).to.eql({ message: 'hello' })
      done()
    }) 
  })

})
