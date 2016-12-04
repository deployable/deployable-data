Validate      = require '../lib/validate'
ValidationError = Validate.ValidationError


describe 'Unit::Validate', ->


  describe 'Class', ->

    describe 'Types', ->

      it 'should return the available types', ->
        expect( Validate.types() )
          .to.be.an 'array'
          .and.to.have.length 26

      it 'should fail to return a missing type', ->
        fn = -> Validate.type(8, 'what')
        expect( fn ).to.throw Error, /The type "what" is not able to be validated/


      describe 'Array', ->

        type_str = 'array'
        name_str = 'wakka'

        describe 'Boolean', ->

          it 'should validate an array', ->
            expect( Validate.type([], type_str, name_str) ).to.be.true

          it 'should not validate a non array', ->
            expect( Validate.type('a', type_str, name_str) ).to.be.false


        describe 'Error', ->

          it 'should validate an array', ->
            expect( Validate.typeMessage([], type_str, name_str) ).to.be.undefined

          it 'should return msg on non array with name', ->
            fn = Validate.typeMessage('', type_str, name_str)
            expect( fn ).to.equal 'wakka is not an array'

          it 'should return generic msg on non array without name', ->
            fn = Validate.typeMessage('', type_str)
            expect( fn ).to.equal 'Type is not array'


        describe 'Throw', ->

          it 'should validate an array', ->
            expect( Validate.typeThrow([], type_str, name_str) ).to.be.true

          it 'should throw on non array with name', ->
            fn = -> Validate.typeThrow('', type_str, name_str)
            expect( fn ).to.throw ValidationError, 'wakka is not an array'

          it 'should throw on non array without name', ->
            fn = -> Validate.typeThrow('', type_str)
            expect( fn ).to.throw ValidationError, 'Type is not array'



      describe 'Boolean', ->

        type_str = 'boolean'
        name_str = 'michale'

        describe 'Boolean', ->

          it 'should validate an boolean', ->
            expect( Validate.type(true, type_str, name_str) ).to.be.true

          it 'should not validate a non boolean', ->
            expect( Validate.type('a', type_str, name_str) ).to.be.false


        describe 'Message', ->

          it 'should validate an boolean', ->
            expect( Validate.typeMessage(false, type_str, name_str) ).to.be.undefined

          it 'should return msg on non boolean with name', ->
            fn = Validate.typeMessage('', type_str, name_str)
            expect( fn ).to.equal 'michale is not a boolean'

          it 'should return generic msg on non boolean without name', ->
            fn = Validate.typeMessage('', type_str)
            expect( fn ).to.equal 'Type is not boolean'


        describe 'Throw', ->

          it 'should validate an boolean', ->
            expect( Validate.typeThrow(true, type_str, name_str) ).to.be.true

          it 'should throw on non boolean with name', ->
            fn = -> Validate.typeThrow('', type_str, name_str)
            expect( fn ).to.throw ValidationError, 'michale is not a boolean'

          it 'should throw on non boolean without name', ->
            fn = -> Validate.typeThrow('', type_str)
            expect( fn ).to.throw ValidationError, 'Type is not boolean'



      describe 'Defined', ->

        type_str = 'defined'

        describe 'Boolean', ->

          it 'should validate a defined variable', ->
            expect( Validate.type([], type_str, 'somevar') ).to.be.true

          it 'should not validate a undefined value', ->
            expect( Validate.type(undefined, type_str, 'somevar') ).to.be.false


        describe 'Message', ->

          it 'should not return a message for a defined variable', ->
            expect( Validate.typeMessage(5, type_str, 'somevar') ).to.be.undefined

          it 'should return msg on undefined variable with name', ->
            fn = Validate.typeMessage(undefined, type_str, 'somevar')
            expect( fn ).to.equal 'somevar is undefined'

          it 'should return generic msg on non string without name', ->
            fn = Validate.typeMessage(undefined, type_str)
            expect( fn ).to.equal 'Value is undefined'


        describe 'Throw', ->

          it 'should not throw on a defined variable', ->
            expect( Validate.typeThrow(5, type_str, 'somevar') ).to.be.true

          it 'should throw on undefined variable with name', ->
            fn = -> Validate.typeThrow(undefined, type_str, 'somevar')
            expect( fn ).to.throw ValidationError, 'somevar is undefined'

          it 'should throw on undefined variable without name', ->
            fn = -> Validate.typeThrow(undefined, type_str)
            expect( fn ).to.throw ValidationError, 'Value is undefined'



      describe 'Empty', ->

        type_str = 'empty'
        name_str = 'label'

        describe 'Boolean', ->

          it 'should validate empty', ->
            expect( Validate.type('', type_str, name_str) ).to.be.true

          it 'should validate empty', ->
            expect( Validate.type([], type_str, name_str) ).to.be.true

          it 'should validate empty', ->
            expect( Validate.type({}, type_str, name_str) ).to.be.true

          it 'should validate empty', ->
            expect( Validate.type(7, type_str, name_str) ).to.be.true

          it 'should not validate a non empty', ->
            expect( Validate.type('a', type_str, name_str) ).to.be.false


        describe 'Message', ->

          it 'should validate empty', ->
            expect( Validate.typeMessage([], type_str, name_str) ).to.be.undefined

          it 'should return msg on non empty with name', ->
            fn = Validate.typeMessage('test', type_str, name_str)
            expect( fn ).to.equal 'label is not empty'

          it 'should return generic msg on non empty without name', ->
            fn = Validate.typeMessage('test', type_str)
            expect( fn ).to.equal 'Value is not empty'


        describe 'Throw', ->

          it 'should validate empty', ->
            expect( Validate.typeThrow([], type_str, name_str) ).to.be.true

          it 'should throw on non emtpy with name', ->
            fn = -> Validate.typeThrow('test', type_str, name_str)
            expect( fn ).to.throw ValidationError, 'label is not empty'

          it 'should throw on non empty without name', ->
            fn = -> Validate.typeThrow('test', type_str)
            expect( fn ).to.throw ValidationError, 'Value is not empty'



      describe 'Integer', ->

        type_str = 'integer'
        name_str = 'the_int'

        describe 'Boolean', ->

          it 'should validate an integer', ->
            expect( Validate.type(5, type_str, name_str) ).to.be.true

          it 'should not validate a non integer', ->
            expect( Validate.type(5.5, type_str, name_str) ).to.be.false

          it 'should not validate a non integer', ->
            expect( Validate.type('a', type_str, name_str) ).to.be.false


        describe 'Throw', ->

          it 'should validate an integer', ->
            expect( Validate.typeThrow(6, type_str, name_str) ).to.be.true

          it 'should throw on non integer with name', ->
            fn = -> Validate.typeThrow('', type_str, name_str)
            expect( fn ).to.throw ValidationError, 'the_int is not an integer'

          it 'should throw on non integer without name', ->
            fn = -> Validate.typeThrow('', type_str)
            expect( fn ).to.throw ValidationError, 'Type is not integer'


        describe 'Message', ->

          it 'should validate an integer', ->
            expect( Validate.typeMessage(7, type_str, name_str) ).to.be.undefined

          it 'should return msg on non integer with name', ->
            fn = Validate.typeMessage('', type_str, name_str)
            expect( fn ).to.equal 'the_int is not an integer'

          it 'should return generic msg on non integer without name', ->
            fn = Validate.typeMessage('', type_str)
            expect( fn ).to.equal 'Type is not integer'


      describe 'String', ->

        type_str = 'string'
        name_str = 'description'

        describe 'Boolean', ->

          it 'should validate an string', ->
            expect( Validate.type("test", type_str, name_str) ).to.be.true

          it 'should not validate a non string', ->
            expect( Validate.type(5, type_str, name_str) ).to.be.false


        describe 'Throw', ->

          it 'should validate an string', ->
            expect( Validate.typeThrow('test', type_str, name_str) ).to.be.true

          it 'should throw on non string with name', ->
            fn = -> Validate.typeThrow(5, type_str, name_str)
            expect( fn ).to.throw ValidationError, 'description is not a string'

          it 'should throw on non string without name', ->
            fn = -> Validate.typeThrow({}, type_str)
            expect( fn ).to.throw ValidationError, 'Type is not string'


        describe 'Message', ->

          it 'should validate an string', ->
            expect( Validate.typeMessage('test', type_str, name_str) ).to.be.undefined

          it 'should return msg on non string with name', ->
            fn = Validate.typeMessage([], type_str, name_str)
            expect( fn ).to.equal 'description is not a string'

          it 'should return generic msg on non string without name', ->
            fn = Validate.typeMessage(true, type_str)
            expect( fn ).to.equal 'Type is not string'


      describe 'Undefined', ->

        type_str = 'undefined'
        name_str = 'somevar'

        describe 'Boolean', ->

          it 'should validate undefined', ->
            expect( Validate.type(undefined, type_str, name_str) ).to.be.true

          it 'should not validate a defined value', ->
            expect( Validate.type(5, type_str, name_str) ).to.be.false


        describe 'Throw', ->

          it 'should validate an undefined variable', ->
            expect( Validate.typeThrow(undefined, type_str, name_str) ).to.be.true

          it 'should throw on defined variable with name', ->
            fn = -> Validate.typeThrow(5, type_str, name_str)
            expect( fn ).to.throw ValidationError, 'somevar is defined'

          it 'should throw on defined variable without name', ->
            fn = -> Validate.typeThrow({}, type_str)
            expect( fn ).to.throw ValidationError, 'Value is defined'


        describe 'Message', ->

          it 'should validate an undefined variable', ->
            expect( Validate.typeMessage(undefined, type_str, name_str) ).to.be.undefined

          it 'should return msg on defined variable with name', ->
            fn = Validate.typeMessage([], type_str, name_str)
            expect( fn ).to.equal 'somevar is defined'

          it 'should return generic msg on non string without name', ->
            fn = Validate.typeMessage(true, type_str)
            expect( fn ).to.equal 'Value is defined'


    describe 'Length', ->

      it 'should return true for the length of string', ->
        expect( Validate.length('a', 1, 256, 'thestring') ).to.be.true

      it 'should return true for the length of string', ->
        expect( Validate.length('test',4,4,'thestring') ).to.be.true

      it 'should return true for above the length of string', ->
        expect( Validate.length('test',3,5,'thestring') ).to.be.true

      it 'should return false for below the length of string', ->
        expect( Validate.length('test',3,3,'thestring') ).to.be.false

      it 'should return false for above the length of string', ->
        expect( Validate.length('test',5,5,'thestring') ).to.be.false

      it 'should return true for only a min', ->
        expect( Validate.length('test',4) ).to.be.true

      it 'should return false for only a min above', ->
        expect( Validate.length('test',5) ).to.be.false

      it 'should return false for only a min below', ->
        expect( Validate.length('test',3) ).to.be.false

      it 'should return error message', ->
        msg = Validate.lengthMessage('test',1,5,'thestring')
        expect( msg ).to.be.undefined

      it 'should return error message', ->
        msg = Validate.lengthMessage('test',5,5,'thestring')
        expect( msg ).to.be.equal "thestring has length 4. Must be 5"

      it 'should return error message', ->
        msg = Validate.lengthMessage('tes', 4, 5, 'thestring')
        expect( msg ).to.be.equal "thestring has length 3. Must be between 4 and 5"

      it 'should return error', ->
        res = Validate.lengthError('test', 1, 5,'thestring')
        expect( res ).to.be.undefined

      it 'should return error', ->
        err = Validate.lengthError('test', 5, 5,'thestring')
        expect( err ).to.be.instanceOf(ValidationError)
        expect( err.message ).to.equal 'thestring has length 4. Must be 5'

      it 'should throw error', ->
        fn = -> Validate.lengthThrow('test', 1, 5,'thestring')
        expect( fn ).to.not.throw

      it 'should throw error', ->
        fn = -> Validate.lengthThrow('test', 5, 5,'thestring')
        expect( fn ).to.throw ValidationError, 'thestring has length 4. Must be 5'


    describe 'Alpha', ->

      it 'should return true alpha', ->
        expect( Validate.alpha('ab', 'thestring') ).to.be.true

      it 'should return true alpha', ->
        expect( Validate.alpha('59!#$%', 'thestring') ).to.be.false

      it 'should return error message', ->
        msg = Validate.alphaMessage('ab', 'thestring')
        expect( msg ).to.be.undefined

      it 'should return error message', ->
        msg = Validate.alphaMessage('a!b', 'thestring')
        expect( msg ).to.be.equal '"thestring" must only contain [ A-Z a-z ]'

      it 'should return error message', ->
        msg = Validate.alphaMessage('a!b')
        expect( msg ).to.be.equal 'Value must only contain [ A-Z a-z ]'

      it 'should return error', ->
        res = Validate.alphaError('test', 'thestring')
        expect( res ).to.be.undefined

      it 'should return error', ->
        err = Validate.alphaError('test!', 'thestring')
        expect( err ).to.be.instanceOf(ValidationError)
        expect( err.message ).to.equal '"thestring" must only contain [ A-Z a-z ]'

      it 'should not throw error', ->
        expect( Validate.alphaThrow('test', 'thestring') ).to.be.true

      it 'should throw error', ->
        fn = -> Validate.alphaThrow('test!', 'thestring')
        expect( fn ).to.throw ValidationError, '"thestring" must only contain [ A-Z a-z ]'


    describe 'Numeric', ->

      name_str = "thestring"
      name_str_msg = "\"#{name_str}\" "
      error_msg = "must only contain [ 0-9 ]"

      it 'should return true numeric', ->
        expect( Validate.numeric('0939393', name_str) ).to.be.true

      it 'should return true numeric', ->
        expect( Validate.numeric('59!#$%', name_str) ).to.be.false

      it 'should return error message', ->
        msg = Validate.numericMessage('2323', name_str)
        expect( msg ).to.be.undefined

      it 'should return error message', ->
        msg = Validate.numericMessage('a!b', name_str)
        expect( msg ).to.be.equal "#{name_str_msg}#{error_msg}"

      it 'should return error message', ->
        msg = Validate.numericMessage('a!b')
        expect( msg ).to.be.equal "Value #{error_msg}"

      it 'should return error', ->
        res = Validate.numericError('123453', name_str)
        expect( res ).to.be.undefined

      it 'should return error', ->
        err = Validate.numericError('aaas', name_str)
        expect( err ).to.be.instanceOf(ValidationError)
        expect( err.message ).to.equal "#{name_str_msg}#{error_msg}"

      it 'should not throw error', ->
        expect( Validate.numericThrow('2', name_str) ).to.be.true

      it 'should throw error', ->
        fn = -> Validate.numericThrow('test!', name_str)
        expect( fn ).to.throw ValidationError, "#{name_str_msg}#{error_msg}"


    describe 'Alpha Numeric', ->

      name_str = "thestring"
      name_str_msg = "\"#{name_str}\" "
      error_msg = "must only contain [ A-Z a-z 0-9 ]"

      it 'should return true alpha numeric', ->
        expect( Validate.alphaNumeric('ab', name_str) ).to.be.true

      it 'should return true alpha numeric', ->
        expect( Validate.alphaNumeric('59!#$%', name_str) ).to.be.false

      it 'should return error message', ->
        msg = Validate.alphaNumericMessage('ab', name_str)
        expect( msg ).to.be.undefined

      it 'should return error message', ->
        msg = Validate.alphaNumericMessage('a!b', name_str)
        expect( msg ).to.be.equal "#{name_str_msg}#{error_msg}"

      it 'should return error message', ->
        msg = Validate.alphaNumericMessage('a!b')
        expect( msg ).to.be.equal "Value #{error_msg}"

      it 'should return error', ->
        res = Validate.alphaNumericError('test', name_str)
        expect( res ).to.be.undefined

      it 'should return error', ->
        err = Validate.alphaNumericError('test!', name_str)
        expect( err ).to.be.instanceOf(ValidationError)
        expect( err.message ).to.equal "#{name_str_msg}#{error_msg}"

      it 'should not throw error', ->
        expect( Validate.alphaNumericThrow('test', name_str) ).to.be.true

      it 'should throw error', ->
        fn = -> Validate.alphaNumericThrow('test!', name_str)
        expect( fn ).to.throw ValidationError, "#{name_str_msg}#{error_msg}"


    describe 'Alpha Numeric Dash Underscore', ->

      err_suffix = "must only contain alphanumeric, dash and underscore [ A-Z a-z 0-9 _ - ]"
      name_str = 'thestring'

      it 'should return true alpha numeric', ->
        expect( Validate.alphaNumericDashUnderscore('ab', name_str) ).to.be.true

      it 'should return true alpha numeric', ->
        expect( Validate.alphaNumericDashUnderscore('a!b', name_str) ).to.be.false

      it 'should return error message', ->
        msg = Validate.alphaNumericDashUnderscoreMessage('ab', name_str)
        expect( msg ).to.be.undefined

      it 'should return error message', ->
        msg = Validate.alphaNumericDashUnderscoreMessage('a!b', name_str)
        expect( msg ).to.be.equal "\"#{name_str}\" #{err_suffix}"

      it 'should return error', ->
        res = Validate.alphaNumericDashUnderscoreError('test', name_str)
        expect( res ).to.be.undefined

      it 'should return error', ->
        err = Validate.alphaNumericDashUnderscoreError('test!', name_str)
        expect( err ).to.be.instanceOf(ValidationError)
        expect( err.message ).to.equal "\"#{name_str}\" #{err_suffix}"

      it 'should throw error', ->
        fn = -> Validate.alphaNumericDashUnderscoreThrow('test', name_str)
        expect( fn ).to.not.throw

      it 'should throw error', ->
        fn = -> Validate.alphaNumericDashUnderscoreThrow('test!', name_str)
        expect( fn ).to.throw ValidationError, "\"#{name_str}\" #{err_suffix}"




  describe 'Instance', ->


    describe 'creation', ->

      it 'should create an instance', ->
        expect( new Validate() ).to.be.an.instanceOf Validate


    describe 'properties', ->

      validate = null

      beforeEach ->
        validate = new Validate()

      it 'should default throw to true', ->
        expect( validate.throw ).to.be.true

      it 'should default error mode to false', ->
        expect( validate.error ).to.be.false

      it 'should default message mode to false', ->
        expect( validate.message ).to.be.false

      it 'should default results mode to false', ->
        expect( validate.result ).to.be.false

      it 'should default `mode` to throw', ->
        expect( validate.mode ).to.equal 'throw'

      it 'should get errors', ->
        expect( validate.errors ).to.eql []

      it 'should fail to set errors', ->
        fn = -> validate.errors = ['test']
        expect( fn ).to.throw Error, /errors should not be set/




    describe 'add', ->

      validate = null

      before ->
        validate = new Validate()

      it 'should add a test to validate', ->
        expect( validate.add('type','value','string','wakka') ).to.be.ok

      it 'should have a test in the array', ->
        expect( validate._tests.length ).to.equal 1


    describe 'run', ->

      validate = null

      before ->
        validate = new Validate()
        validate.add('type','value','string','wakka')

      it 'should run the tests', ->
        expect( validate.run() ).to.be.ok

      it 'should run the errors', ->
        expect( validate.errors ).to.eql []


    describe 'throw simples', ->

      validate = null

      before ->
        validate = new Validate()
        validate.add('type', 5, 'string', 'wakka')

      it 'should run the tests', ->
        fn = -> validate.run()
        expect( fn ).to.throw ValidationError

      it 'should run the errors', ->
        expect( validate.errors ).to.eql []


    describe 'throw extended', ->

      validate = null
      errors = null

      before ->
        validate = new Validate({errors: true})
          .add('length', 'sa', 1, 256, 'dlen')
          .add('type', 5, 'string', 'dtype')
          .add('alphaNumericDashUnderscore', 'a!b', 'dstr')

      it 'should run the tests', ->
        expect( validate.run() ).to.be.ok

      it 'should contain errors after run', ->
        errors = validate.errors
        expect( errors ).to.be.an 'array'

      it 'should have a validation error for dtype', ->
        expect( errors[0] ).to.be.an.instanceOf ValidationError
        expect( errors[0].message ).to.equal 'dtype is not a string'

      it 'should have a second validation error for dstr', ->
        expect( errors[1] ).to.be.an.instanceOf ValidationError
        expect( errors[1].message ).to.equal '"dstr" must only contain alphanumeric, dash and underscore [ A-Z a-z 0-9 _ - ]'

      it 'has the right number of errors', ->
        expect( errors.length ).to.eql 2


    describe 'messages', ->

      validate = null
      errors = null

      before ->
        validate = new Validate({messages: true})
          .add('length', 'sa', 1, 256, 'dlen')
          .add('type', 5, 'string', 'dtype')
          .add('alphaNumericDashUnderscore', 'a!b', 'dstr')

      it 'should run the tests', ->
        expect( validate.run() ).to.be.ok

      it 'should run the errors', ->
        errors = validate.errors
        expect( errors ).to.be.an 'array'

      it 'has a validation error', ->
        expect( errors[0] ).to.equal 'dtype is not a string'

      it 'has a validation error', ->
        expect( errors[1] ).to.equal '"dstr" must only contain alphanumeric, dash and underscore [ A-Z a-z 0-9 _ - ]'

      it 'has the right number of errors', ->
        expect( errors.length ).to.eql 2



    describe 'results', ->

      validate = null
      errors = null

      before ->
        validate = new Validate({results: true})
          .add('length', 'sa', 1, 256, 'dlen')
          .add('type', 5, 'string', 'dtype')
          .add('alphaNumericDashUnderscore', 'a!b', 'dstr')

      it 'should run the tests', ->
        expect( validate.run() ).to.be.ok

      it 'should run the errors', ->
        errors = validate.errors
        expect( errors ).to.be.an 'array'

      it 'has a validation error', ->
        expect( errors[0] ).to.be.an 'array'
        .and.to.contain 'dtype'

      it 'has a validation error', ->
        expect( errors[1] ).to.be.an 'array'
        .and.to.contain 'dstr'

      it 'has the right number of errors', ->
        expect( errors.length ).to.eql 2

