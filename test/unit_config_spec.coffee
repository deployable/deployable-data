Config      = require '../lib/config'
path        = require 'path'
{KeyError}  = require '../lib/errors_dply'


describe 'Unit::Config', ->


  describe 'Class', ->

    it 'should create a Config instance', ->
      expect( new Config() ).to.be.an.instanceOf(Config)

    it 'should have .instance', ->
      expect( Config.instance() ).to.be.ok


  describe 'Instance', ->

    config = null

    beforeEach ->
      file_path = path.resolve(__dirname, 'fixture', 'config.yaml')
      config = new Config({ file_path: file_path })

    it 'should fetch a config value', ->
      config.fetch('testing')

    it 'should happily fail to fetch a missing config value', ->
      config.fetch('jousting')

    it 'should get a config value', ->
      expect( config.get('testing') ).to.be.true
    
    it 'should set a config value', ->
      expect( config.set('whatever',true) ).to.be.ok
      expect( config.get('whatever') ).to.be.true
    
    it 'should throw on missing config value', ->
      fn = -> config.get('whatever')
      expect( fn ).to.throw(KeyError, /Unknown config key/)


    describe 'state', ->

      it 'should set some state', ->
        expect( config.setState('whatever', true) ).to.be.ok

      it 'should get some state', ->
        config.setState('whatever', true)
        expect( config.getState('whatever') ).to.be.true

      it 'should throw on missing state value', ->
        fn = -> config.getState('whatever')
        expect( fn ).to.throw(KeyError, /Unknown state key/)
