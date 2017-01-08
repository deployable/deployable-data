path        = require 'path'
{KeyError}  = require '../lib/errors_dply'


describe 'Unit::Config', ->

  describe 'Class', ->

    config = require '../lib/config'
 
    it 'should have a config instance', ->
      expect( config ).to.be.ok

    it 'should populate package in config', ->
      expect( config.get('package') ).to.be.ok

    it 'should have the package name', ->
      expect( config.get('package.name') ).to.equal 'deployable-data'


