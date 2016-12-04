Validate      = require '../lib/validate'
ValidationError = Validate.ValidationError


describe 'Unit::Validate', ->


  describe 'Class', ->

    describe 'Types', ->

      it 'should return the available types', ->
        expect( Validate.types() )
          .to.be.an 'array'
          .and.to.have.length 26

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
        expect( msg ).to.be.equal "thestring is not alpha [ A-Z a-z ]"

      it 'should return error', ->
        res = Validate.alphaError('test', 'thestring')
        expect( res ).to.be.undefined

      it 'should return error', ->
        err = Validate.alphaError('test!', 'thestring')
        expect( err ).to.be.instanceOf(ValidationError)
        expect( err.message ).to.equal "thestring is not alpha [ A-Z a-z ]"

      it 'should not throw error', ->
        fn = -> Validate.alphaThrow('test', 'thestring')
        expect( fn ).to.not.throw

      it 'should throw error', ->
        fn = -> Validate.alphaThrow('test!', 'thestring')
        expect( fn ).to.throw ValidationError, "thestring is not alpha [ A-Z a-z ]"


    describe 'Numeric', ->

      it 'should return true numeric', ->
        expect( Validate.numeric('0939393', 'thestring') ).to.be.true

      it 'should return true numeric', ->
        expect( Validate.numeric('59!#$%', 'thestring') ).to.be.false

      it 'should return error message', ->
        msg = Validate.numericMessage('2323', 'thestring')
        expect( msg ).to.be.undefined

      it 'should return error message', ->
        msg = Validate.numericMessage('a!b', 'thestring')
        expect( msg ).to.be.equal "thestring is not numeric [ 0-9 ]"

      it 'should return error', ->
        res = Validate.numericError('123453', 'thestring')
        expect( res ).to.be.undefined

      it 'should return error', ->
        err = Validate.numericError('aaas', 'thestring')
        expect( err ).to.be.instanceOf(ValidationError)
        expect( err.message ).to.equal "thestring is not numeric [ 0-9 ]"

      it 'should not throw error', ->
        fn = -> Validate.numericThrow('2', 'thestring')
        expect( fn ).to.not.throw

      it 'should throw error', ->
        fn = -> Validate.numericThrow('test!', 'thestring')
        expect( fn ).to.throw ValidationError, "thestring is not numeric [ 0-9 ]"


    describe 'Alpha Numeric', ->

      it 'should return true alpha numeric', ->
        expect( Validate.alphaNumeric('ab', 'thestring') ).to.be.true

      it 'should return true alpha numeric', ->
        expect( Validate.alphaNumeric('59!#$%', 'thestring') ).to.be.false

      it 'should return error message', ->
        msg = Validate.alphaNumericMessage('ab', 'thestring')
        expect( msg ).to.be.undefined

      it 'should return error message', ->
        msg = Validate.alphaNumericMessage('a!b', 'thestring')
        expect( msg ).to.be.equal "thestring is not alpha numeric [ A-Z a-z 0-9 ]"

      it 'should return error', ->
        res = Validate.alphaNumericError('test', 'thestring')
        expect( res ).to.be.undefined

      it 'should return error', ->
        err = Validate.alphaNumericError('test!', 'thestring')
        expect( err ).to.be.instanceOf(ValidationError)
        expect( err.message ).to.equal "thestring is not alpha numeric [ A-Z a-z 0-9 ]"

      it 'should throw error', ->
        fn = -> Validate.alphaNumericThrow('test', 'thestring')
        expect( fn ).to.not.throw

      it 'should throw error', ->
        fn = -> Validate.alphaNumericThrow('test!', 'thestring')
        expect( fn ).to.throw ValidationError, "thestring is not alpha numeric [ A-Z a-z 0-9 ]"


    describe 'Alpha Numeric Dash Underscore', ->

      err_suffix = "is not alpha numeric dash underscore [ A-Z a-z 0-9 _ - ]"
      name_str = 'thestring'

      it 'should return true alpha numeric', ->
        expect( Validate.alphaNumericDashUnderscore('ab', name_str) ).to.be.true

      it 'should return true alpha numeric', ->
        expect( Validate.alphaNumericDashUnderscore('59!#$%', name_str) ).to.be.false

      it 'should return error message', ->
        msg = Validate.alphaNumericDashUnderscoreMessage('ab', name_str)
        expect( msg ).to.be.undefined

      it 'should return error message', ->
        msg = Validate.alphaNumericDashUnderscoreMessage('a!b', name_str)
        expect( msg ).to.be.equal "#{name_str} #{err_suffix}"

      it 'should return error', ->
        res = Validate.alphaNumericDashUnderscoreError('test', name_str)
        expect( res ).to.be.undefined

      it 'should return error', ->
        err = Validate.alphaNumericDashUnderscoreError('test!', name_str)
        expect( err ).to.be.instanceOf(ValidationError)
        expect( err.message ).to.equal "#{name_str} #{err_suffix}"

      it 'should throw error', ->
        fn = -> Validate.alphaNumericDashUnderscoreThrow('test', name_str)
        expect( fn ).to.not.throw

      it 'should throw error', ->
        fn = -> Validate.alphaNumericDashUnderscoreThrow('test!', name_str)
        expect( fn ).to.throw ValidationError, "#{name_str} #{err_suffix}"




  describe 'Instance', ->


    describe 'creation', ->

      it 'should create an instance', ->
        expect( new Validate() ).to.be.an.instanceOf Validate


    describe 'properties', ->

      validate = null

      beforeEach ->
        validate = new Validate()

      it 'should default to throw', ->
        expect( validate.throw ).to.be.true

      it 'should default to throw', ->
        expect( validate.error ).to.be.false

      it 'should default to throw', ->
        expect( validate.message ).to.be.false

      it 'should default to throw', ->
        expect( validate.result ).to.be.false

      it 'should default to throw', ->
        expect( validate.mode ).to.equal 'throw'


    describe 'add', ->

      validate = null

      before ->
        validate = new Validate()

      it 'should add a test', ->
        expect( validate.add('type','value','string','wakka') ).to.be.ok

      it 'should have a test', ->
        expect( validate._tests.length ).to.equal 1


    describe 'run', ->

      validate = null

      before ->
        validate = new Validate()
        validate.add('type','value','string','wakka')

      it 'should run the tests', ->
        expect( validate.run() ).to.be.ok

      it 'should run the errors', ->
        expect( validate.errors() ).to.eql []


    describe 'throw', ->

      validate = null

      before ->
        validate = new Validate()
        validate.add('type', 5, 'string', 'wakka')

      it 'should run the tests', ->
        fn = -> validate.run()
        expect( fn ).to.throw ValidationError

      it 'should run the errors', ->
        expect( validate.errors() ).to.eql []


    describe 'throw', ->

      validate = null
      errors = null

      before ->
        validate = new Validate({errors: true})
        validate.add('length', 'sa', 1, 256, 'dlen')
        validate.add('type', 5, 'string', 'dtype')

      it 'should run the tests', ->
        expect( validate.run() ).to.be.ok

      it 'should run the errors', ->
        errors = validate.errors()
        expect( errors ).to.be.an 'array'

      it 'has a validation error', ->
        expect( errors[0] ).to.be.an.instanceOf ValidationError
        expect( errors[0].message ).to.equal 'dtype is not a string'

      it 'has the right number of errors', ->
        expect( errors.length ).to.eql 1
