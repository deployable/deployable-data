// # Logger

const debug       = require('debug')('dply:data:logger')

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

module.exports.level = 30
module.exports.levels_number = levels_number
module.exports.levels_string = levels_string