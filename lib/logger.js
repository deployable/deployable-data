// # Logger

const debug       = require('debug')('dply:data:logger')


module.exports = class Logger {

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
    Logger.log(' INFO', ...args)
  }

  static warn (...args) {
    if (Logger.level < 20) return
    Logger.log(' WARN', ...args)
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
    this.level = (options.level === undefined) ? 30 : options.level
  }

  get level(){
    return this._level
  }
  set level(_level){
    debug('setting log level to', _level)
    this._level = _level
  }

  log (...args) {
    Logger.log('  ALL', this.label, ...args)
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

module.exports.level = 40