Logger = require '../lib/logger'
stdout = require("test-console").stdout


describe 'Unit::Logger', ->


  describe 'Class', ()->

    it 'should create a Logger instance', ()->
      expect( new Logger() ).to.be.an.instanceOf(Logger)

    describe 'stdout testing', ->

      inspector = null
    
      beforeEach ->
        inspector = stdout.inspect()

      afterEach ->
        inspector.restore()

      describe 'defaults', ->

        it 'should have .trace', ()->
          Logger.trace()
          inspector.restore()
          expect( inspector.output.length ).to.equal 0

        it 'should have .debug', ()->
          Logger.debug()
          inspector.restore()
          expect( inspector.output.length ).to.equal 0
        
        it 'should have .info', ()->
          Logger.info('info')
          inspector.restore()
          expect( inspector.output.length ).to.equal 1
          expect( inspector.output[0] ).to.match /Z INFO  info/
        
        it 'should have .warn', ()->
          Logger.warn('warn')
          inspector.restore()
          expect( inspector.output.length ).to.equal 1
          expect( inspector.output[0] ).to.match /Z WARN  warn/
        
        it 'should have .error', ()->
          Logger.error('err')
          inspector.restore()
          expect( inspector.output.length ).to.equal 1
          expect( inspector.output[0] ).to.match /Z ERROR err/


      describe 'All log levels enabled', ->

        before ->
          Logger.level = 60

        it 'should output on .trace', ()->
          Logger.trace('a')
          inspector.restore()
          expect( inspector.output[0] ).to.match /Z TRACE a/

        it 'should output on .debug', ()->
          Logger.debug('d')
          inspector.restore()
          expect( inspector.output[0] ).to.match /Z DEBUG d/
        
        it 'should output on .info', ()->
          Logger.info('i')
          inspector.restore()
          expect( inspector.output[0] ).to.match /Z INFO  i/
        
        it 'should output on .warn', ()->
          Logger.warn('w')
          inspector.restore()
          expect( inspector.output[0] ).to.match /Z WARN  w/
        
        it 'should output on .error', ()->
          Logger.error('e')
          inspector.restore()
          expect( inspector.output[0] ).to.match /Z ERROR e/


      describe 'All log levels off', ->

        before ->
          Logger.level = 0

        it 'shouldn\'t output on .trace', ()->
          Logger.trace('t')
          inspector.restore()
          expect( inspector.output.length ).to.equal 0

        it 'shouldn\'t output on .debug', ()->
          Logger.debug('d')
          inspector.restore()
          expect( inspector.output.length ).to.equal 0
        
        it 'shouldn\'t output on .info', ()->
          Logger.info('i')
          inspector.restore()
          expect( inspector.output.length ).to.equal 0
        
        it 'shouldn\'t output on .warn', ()->
          Logger.warn('w')
          inspector.restore()
          expect( inspector.output.length ).to.equal 0
        
        it 'shouldn\'t output on .error', ()->
          Logger.error('e')
          inspector.restore()
          expect( inspector.output.length ).to.equal 0


  describe 'Instance', ()->

    logger = null

    describe 'All log levels enabled', ->

      inspector = null

      beforeEach ->
        logger = new Logger({ level: 60 })
        inspector = stdout.inspect()

      afterEach ->
        inspector.restore()

      it 'should have .trace', ()->
        logger.trace('a trace')
        inspector.restore()
        expect( inspector.output[0] ).to.match /TRACE default a trace/
        expect( inspector.output.length ).to.equal 1

      it 'should have .debug', ()->
        logger.debug('a debug')
        inspector.restore()
        expect( inspector.output[0] ).to.match /DEBUG default a debug/
        expect( inspector.output.length ).to.equal 1
      
      it 'should have .info', ()->
        logger.info('an info')
        inspector.restore()
        expect( inspector.output[0] ).to.match /INFO  default an info/
        expect( inspector.output.length ).to.equal 1
      
      it 'should have .warn', ()->
        logger.warn('a warn')
        inspector.restore()
        expect( inspector.output[0] ).to.match /WARN  default a warn/
        expect( inspector.output.length ).to.equal 1
      
      it 'should have .error', ()->
        logger.error('an error')
        inspector.restore()
        expect( inspector.output[0] ).to.match /ERROR default an error/
        expect( inspector.output.length ).to.equal 1

      it 'should log ', ()->
        logger.log('a log')
        inspector.restore()
        expect( inspector.output[0] ).to.match /ALL   default a log/
        expect( inspector.output.length ).to.equal 1


    describe 'All log levels disabled', ->

      beforeEach ->
        logger = new Logger({ level: 0 })

      it 'should have .trace', ()->
        logger.trace('a trace')

      it 'should have .debug', ()->
        logger.debug('a debug')
      
      it 'should have .info', ()->
        logger.info('an info')
      
      it 'should have .warn', ()->
        logger.warn('a warn')
      
      it 'should have .error', ()->
        logger.error('an error')

      it 'should still log ', ()->
        inspector = stdout.inspect()
        logger.log('a log')
        inspector.restore()
        expect( inspector.output[0] ).to.match /ALL   default a log/
        expect( inspector.output.length ).to.equal 1

    