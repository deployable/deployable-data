ValidateTest      = require '../lib/validate_test'
ValidationError = ValidateTest.ValidationError


describe 'Unit::ValidateTest', ->


  describe 'Class', ->

    it 'should create an instance', ->
      test = new ValidateTest('unit', { test: () => true } )
      expect( test).to.be.an.instanceOf ValidateTest

    it 'should export ValidationError', ->
      expect( ValidateTest.ValidationError ).to.be.ok


  describe 'Instance', ->

    test = null

    beforeEach ->
      test = new ValidateTest('unit', { test: () => true } )

    it 'should have a label', ->
      expect( test.label ).to.equal 'unit'

    it 'should have a message', ->
      expect( test.message ).to.be.a 'string'

    it 'should have a message', ->
      expect( test.message ).to.be.equal '{{name}} failed validation'