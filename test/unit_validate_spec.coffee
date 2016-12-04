Validate      = require '../lib/validate'
ValidationError = Validate.ValidationError


describe 'Unit::Validate', ->


  describe 'Class', ->

    describe 'Types', ->

      describe 'Array', ->

        type_str = 'array'
        name_str = 'wakka'

        describe 'Boolean', ->

          it 'should validate an array', ->
            expect( Validate.type([], type_str, name_str) ).to.be.true

          it 'should not validate a non array', ->
            expect( Validate.type('a', type_str, name_str) ).to.be.false


        describe 'Throw', ->

          it 'should validate an array', ->
            expect( Validate.typeThrow([], type_str, name_str) ).to.be.true

          it 'should throw on non array with name', ->
            fn = -> Validate.typeThrow('', type_str, name_str)
            expect( fn ).to.throw ValidationError, 'wakka is not an array'

          it 'should throw on non array without name', ->
            fn = -> Validate.typeThrow('', type_str)
            expect( fn ).to.throw ValidationError, 'Type is not array'


        describe 'Error', ->

          it 'should validate an array', ->
            expect( Validate.typeError([], type_str, name_str) ).to.be.undefined

          it 'should return msg on non array with name', ->
            fn = Validate.typeError('', type_str, name_str)
            expect( fn ).to.equal 'wakka is not an array'

          it 'should return generic msg on non array without name', ->
            fn = Validate.typeError('', type_str)
            expect( fn ).to.equal 'Type is not array'


      describe 'Boolean', ->

        type_str = 'boolean'
        name_str = 'michale'

        describe 'Boolean', ->

          it 'should validate an boolean', ->
            expect( Validate.type(true, type_str, name_str) ).to.be.true

          it 'should not validate a non boolean', ->
            expect( Validate.type('a', type_str, name_str) ).to.be.false


        describe 'Throw', ->

          it 'should validate an boolean', ->
            expect( Validate.typeThrow(true, type_str, name_str) ).to.be.true

          it 'should throw on non boolean with name', ->
            fn = -> Validate.typeThrow('', type_str, name_str)
            expect( fn ).to.throw ValidationError, 'michale is not a boolean'

          it 'should throw on non boolean without name', ->
            fn = -> Validate.typeThrow('', type_str)
            expect( fn ).to.throw ValidationError, 'Type is not boolean'


        describe 'Error', ->

          it 'should validate an boolean', ->
            expect( Validate.typeError(false, type_str, name_str) ).to.be.undefined

          it 'should return msg on non boolean with name', ->
            fn = Validate.typeError('', type_str, name_str)
            expect( fn ).to.equal 'michale is not a boolean'

          it 'should return generic msg on non boolean without name', ->
            fn = Validate.typeError('', type_str)
            expect( fn ).to.equal 'Type is not boolean'


      describe 'Defined', ->

        type_str = 'defined'

        describe 'Boolean', ->

          it 'should validate a defined variable', ->
            expect( Validate.type([], type_str, 'somevar') ).to.be.true

          it 'should not validate a undefined value', ->
            expect( Validate.type(undefined, type_str, 'somevar') ).to.be.false


        describe 'Throw', ->

          it 'should not throw on a defined variable', ->
            expect( Validate.typeThrow(5, type_str, 'somevar') ).to.be.true

          it 'should throw on undefined variable with name', ->
            fn = -> Validate.typeThrow(undefined, type_str, 'somevar')
            expect( fn ).to.throw ValidationError, 'somevar is undefined'

          it 'should throw on undefined variable without name', ->
            fn = -> Validate.typeThrow(undefined, type_str)
            expect( fn ).to.throw ValidationError, 'Value is undefined'


        describe 'Error', ->

          it 'should not return a message for a defined variable', ->
            expect( Validate.typeError(5, type_str, 'somevar') ).to.be.undefined

          it 'should return msg on undefined variable with name', ->
            fn = Validate.typeError(undefined, type_str, 'somevar')
            expect( fn ).to.equal 'somevar is undefined'

          it 'should return generic msg on non string without name', ->
            fn = Validate.typeError(undefined, type_str)
            expect( fn ).to.equal 'Value is undefined'


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


        describe 'Throw', ->

          it 'should validate empty', ->
            expect( Validate.typeThrow([], type_str, name_str) ).to.be.true

          it 'should throw on non emtpy with name', ->
            fn = -> Validate.typeThrow('test', type_str, name_str)
            expect( fn ).to.throw ValidationError, 'label is not empty'

          it 'should throw on non empty without name', ->
            fn = -> Validate.typeThrow('test', type_str)
            expect( fn ).to.throw ValidationError, 'Value is not empty'


        describe 'Error', ->

          it 'should validate empty', ->
            expect( Validate.typeError([], type_str, name_str) ).to.be.undefined

          it 'should return msg on non empty with name', ->
            fn = Validate.typeError('test', type_str, name_str)
            expect( fn ).to.equal 'label is not empty'

          it 'should return generic msg on non empty without name', ->
            fn = Validate.typeError('test', type_str)
            expect( fn ).to.equal 'Value is not empty'


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


        describe 'Error', ->

          it 'should validate an integer', ->
            expect( Validate.typeError(7, type_str, name_str) ).to.be.undefined

          it 'should return msg on non integer with name', ->
            fn = Validate.typeError('', type_str, name_str)
            expect( fn ).to.equal 'the_int is not an integer'

          it 'should return generic msg on non integer without name', ->
            fn = Validate.typeError('', type_str)
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


        describe 'Error', ->

          it 'should validate an string', ->
            expect( Validate.typeError('test', type_str, name_str) ).to.be.undefined

          it 'should return msg on non string with name', ->
            fn = Validate.typeError([], type_str, name_str)
            expect( fn ).to.equal 'description is not a string'

          it 'should return generic msg on non string without name', ->
            fn = Validate.typeError(true, type_str)
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


        describe 'Error', ->

          it 'should validate an undefined variable', ->
            expect( Validate.typeError(undefined, type_str, name_str) ).to.be.undefined

          it 'should return msg on defined variable with name', ->
            fn = Validate.typeError([], type_str, name_str)
            expect( fn ).to.equal 'somevar is defined'

          it 'should return generic msg on non string without name', ->
            fn = Validate.typeError(true, type_str)
            expect( fn ).to.equal 'Value is defined'


    describe 'Length', ->

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
        msg = Validate.lengthMessage('test',5,5,'thestring')
        expect( msg ).to.be.equal "thestring has length 4. Must be 5"

      it 'should return error message', ->
        msg = Validate.lengthMessage('test',5,5,'thestring')
        expect( msg ).to.be.equal "thestring has length 4. Must be 5"

      it 'should return error', ->
        err = Validate.lengthError('test',5,5,'thestring')
        expect( err ).to.be.instanceOf(ValidationError)
        expect( err.message ).to.equal 'thestring has length 4. Must be 5'

      it 'should throw error', ->
        fn = -> Validate.lengthThrow('test',5,5,'thestring')
        expect( fn ).to.throw ValidationError, 'thestring has length 4. Must be 5'

  describe 'Instance', ->

