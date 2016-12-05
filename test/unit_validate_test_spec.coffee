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

    describe 'properties',

      test = null

      beforeEach ->
        test = new ValidateTest('unit', { test: () => true } )

      it 'should have a label', ->
        expect( test.label ).to.equal 'unit'

      it 'should have a default string message', ->
        expect( test.message ).to.be.a 'string'

      it 'should have a default message', ->
        expect( test.message ).to.be.equal '{{name}} failed validation'

      it 'should have a template set', ->
        expect( test.template ).to.be.ok
        expect( test.template ).to.be.an.instanceOf(Function)

      it 'should have default arg of "value"', ->
        expect( test.arg_names ).to.be.eql ['value']

      it 'should have a default_value_name of Value', ->
        expect( test.default_value_name ).to.be.equal 'Value'

    
    describe 'messages', ->

      it 'should build a message from the default', ->
        expect( test.buildMessage({name:'blah'}) ).to.equal '"blah" failed validation'

      it 'should accept a new message', ->
        expect( test.message = 'yep').to.be.ok
        expect( test.buildMessage() ).to.equal 'yep'
        
      it 'should accept a new template message', ->
        expect( test.message = '{{one}}').to.be.ok
        expect( test.buildMessage({one:'giggidy'}) ).to.equal 'giggidy'
        
