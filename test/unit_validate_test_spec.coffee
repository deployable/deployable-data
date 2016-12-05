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
        
      it 'should accept a new function template message', ->
        expect( test.message = -> 'this is a message' ).to.be.ok
        expect( test.buildMessage({one:'giggidy'}) ).to.equal 'this is a message'

      it 'should accept a new function template message', ->
        test.message = (params)-> "#{params.one}"
        expect( test.buildMessage({one:'giggidy'}) ).to.equal 'giggidy'

      it 'shouldnt accept a template directly', ->
        fn = -> test.template = ''
        expect( fn ).to.throw Error, /The test template can not be set directly/

      it 'should build a message from args', ->
        test.arg_names = ['value','arg']
        test.message = "{{value}} {{arg}} {{name}}"
        expect( test.buildMessageFromArgs('one','two','three') ).to.equal 'one two "three"'

      it 'should build a message without quotes', ->
        test.word_quotes = ''
        test.arg_names = ['value','arg']
        test.message = "{{value}} {{arg}} {{name}}"
        expect( test.buildMessageFromArgs('one','two','three') ).to.equal 'one two three'

      it 'should error on a bad message', ->
        fn = -> test.message = undefined
        expect( fn ).to.throw Error, /property must be a string or function/


    describe 'tests', ->

      it 'should accept a new test', ->
        expect( test.test = -> false ).to.be.ok

      it 'should run a new test', ->
        test.test = -> true
        expect( test.run() ).to.be.ok

      it 'should fail to set a bad test', ->
        fn = -> test.test = ''
        expect( fn ).to.throw Error, /The "test" property must be a function, not a string/


    describe 'group', ->

      it 'should accept a new group', ->
        expect(test.group = 'yep').to.be.ok

      it 'should accept a new group', ->
        test.group = 'yep'
        expect( test.group ).to.equal 'yep'


    describe 'arg_names', ->

      it 'should accept a arg_names', ->
        expect(test.arg_names = []).to.be.ok

      it 'should return new arg_names', ->
        test.arg_names = ['one']
        expect( test.arg_names ).to.eql ['one']

      it 'should fail to set bad arg_names', ->
        fn = -> test.arg_names = 'test'
        expect( fn ).to.throw Error, /The test "arg_names" must be an array/


