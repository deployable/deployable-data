// # Logger

const debug       = require('debug')('dply:data:logger')
const winston     = require('winston')
const expressWinston = require('express-winston')

let express_logger = expressWinston.logger({
  transports: [
    new winston.transports.Console() //{ json: true, colorize: true }
  ],
  // optional: control whether you want to log the meta data about the 
  // request (default to true)
  meta: true,
  // optional: customize the default logging message. E.g. "{{res.statusCode}}
  // {{req.method}} {{res.responseTime}}ms {{req.url}}"
  msg: 'HTTP {{req.method}} {{req.url}} {{req.ip}}',
  // Use the default Express/morgan request formatting, with the same colors. 
  // Enabling this will override any msg and colorStatus if true. Will only 
  // output colors on transports with colorize set to true
  expressFormat: true,
  // Color the status code, using the Express/morgan color palette 
  // (default green, 3XX cyan, 4XX yellow, 5XX red). 
  // Will not be recognized if expressFormat is true
  colorStatus: false,
  // optional: allows to skip some
  ignoreRoute: () => false
})

let levels_number = {
  0: 'FATAL',
  10: 'ERROR',
  20: 'WARN',
  30: 'INFO',
  40: 'DEBUG',
  50: 'TRACE'
}

let levels_string = {
  FATAL: 0,
  ERROR: 10,
  WARN: 20,
  INFO: 30,
  DEBUG: 40,
  TRACE: 50
}


module.exports = class Logger {

  static setLevel(arg) {
    let str_arg = String(arg)
    if ( this.levels_number[str_arg] !== undefined ) {
      debug('setting Logger level to %s', this.levels_number[str_arg])
      this.level = str_arg
      return this.levels_number[str_arg]
    }
    let upper_str_arg = str_arg.toUpperCase()
    if ( this.levels_string[upper_str_arg] !== undefined ) {
      debug('setting Logger level to %s', upper_str_arg)
      this.level = this.levels_string[upper_str_arg]
      return upper_str_arg
    }
    throw new Error(`No log level - ${arg}`)
  }

  static dateformat () {
    return new Date().toISOString()
  }

  static log (...args) {
    console.log('%s %s', Logger.dateformat(), ...args)
  }

  static trace (...args) {
    if (Logger.level < 50) return
    Logger.log('TRACE', ...args)
  }

  static debug (...args) {
    if (Logger.level < 40) return
    Logger.log('DEBUG', ...args)
  }

  static info (...args) {
    if (Logger.level < 30) return
    Logger.log('INFO ', ...args)
  }

  static warn (...args) {
    if (Logger.level < 20) return
    Logger.log('WARN ', ...args)
  }

  static error (...args) {
    if (Logger.level < 10) return
    Logger.log('ERROR', ...args)
  }

  static fatal (...args) {
    if (Logger.level < 0) return
    Logger.log('FATAL', ...args)
    process.exit(1)
  }

  constructor(options = {}){
    this.label = options.label || 'default'
    this._level = 30
    this.levels_string = options.levels_string || this.constructor.levels_string
    this.levels_number = options.levels_number || this.constructor.levels_number
    if (options.level !== undefined) this.setLevel(options.level)

  }

  setLevel(arg){
    let str_arg = String(arg)
    if ( this.levels_number[str_arg] !== undefined ) {
      debug('setting %s Logger level to %s', this.label, this.levels_number[str_arg])
      this.level = Number(arg)
      return this.levels_number[str_arg]
    }
    let upper_string_arg = str_arg.toUpperCase()
    if ( this.levels_string[upper_string_arg] !== undefined ) {
      debug('setting %s Logger level to %s', this.label, upper_string_arg)
      this.level = this.levels_string[upper_string_arg]
      return upper_string_arg
    }
    throw new Error(`No log level - ${arg}`)
  }
  get level(){
    return this._level
  }
  set level(_level){
    debug('setting log level to', _level)
    if (this.constructor.levels_number[_level] === undefined)
      throw new Error(`No log level - ${_level}`)
    this._level = _level
  }

  log (...args) {
    Logger.log('ALL  ', this.label, ...args)
  }

  trace (...args){
    if ( this.level < 50 ) return
    Logger.log('TRACE', this.label, ...args)
  }

  debug (...args) {
    if ( this.level < 40 ) return
    Logger.log('DEBUG', this.label, ...args)
  }

  info (...args) {
    if ( this.level < 30 ) return
    Logger.log('INFO ', this.label, ...args)
  }

  warn (...args) {
    if ( this.level < 20 ) return
    Logger.log('WARN ', this.label, ...args)
  }

  error (...args) {
    if ( this.level < 10 ) return
    Logger.log('ERROR', this.label, ...args)
  }

  fatal (...args) {
    if ( this.level < 0 ) return
    Logger.log('FATAL', this.label, ...args)
  }

}

module.exports.express_logger = express_logger
module.exports.level = 30
module.exports.levels_number = levels_number
module.exports.levels_string = levels_string