Logger     = require '../lib/logger'


describe 'Unit::Logger', ->


  describe 'Class', ()->

    it 'should have .trace', ()->
      Logger.trace()

    it 'should have .debug', ()->
      Logger.debug()
    
    it 'should have .info', ()->
      Logger.info()
    
    it 'should have .warn', ()->
      Logger.warn()
    
    it 'should have .error', ()->
      Logger.error()

    it 'should create a Logger instance', ()->
      expect( new Logger() ).to.be.an.instanceOf(Logger)


    describe 'All log levels enabled', ->

      before ->
        Logger.level = 60

      it 'should output on .trace', ()->
        Logger.trace()

      it 'should output on .debug', ()->
        Logger.debug()
      
      it 'should output on .info', ()->
        Logger.info()
      
      it 'should output on .warn', ()->
        Logger.warn()
      
      it 'should output on .error', ()->
        Logger.error()


    describe 'All log levels off', ->

      before ->
        Logger.level = 0

      it 'shouldn\'t output on .trace', ()->
        Logger.trace()

      it 'shouldn\'t output on .debug', ()->
        Logger.debug()
      
      it 'shouldn\'t output on .info', ()->
        Logger.info()
      
      it 'shouldn\'t output on .warn', ()->
        Logger.warn()
      
      it 'shouldn\'t output on .error', ()->
        Logger.error()


  describe 'Instance', ()->

    logger = null

    describe 'All log levels enabled', ->

      beforeEach ->
        logger = new Logger({ level: 60 })

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

      it 'should log ', ()->
        logger.log('a log')


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

      it 'should log ', ()->
        logger.log('a log')

    