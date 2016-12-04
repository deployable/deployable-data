// # Validate


// The main validation function return true when OK and false when validation failes
// `*Throw` returns true on ok and nothing on validation failure.

// The `*Message` and `*Error` functions/methods flip the return as they 
// are generating a message or error object.  They will return the 
// message or error if one exists. Otherwise they will return
// `undefined` when validation is ok, which is the logic opposite.


const _ = require('lodash')
const debug = require('debug')('dply:data:validate')

const {ValidationError} = require('./errors_dply')



// `join` is the english join
// `negate` is when the negative has it's own word

const type_to_fn = {
  'array':      { fn: _.isArray,        join: 'an' },
  'boolean':    { fn: _.isBoolean,      join: 'a'  },
  'buffer':     { fn: _.isBuffer,       join: 'a'  },
  'date':       { fn: _.isDate,         join: 'a'  },
  'element':    { fn: _.isElement,      join: 'an' },
  'empty': { 
    fn: _.isEmpty,
    join: '',
    name: 'Value'
  },
  'error':      { fn: _.isError,        join: 'an' },
  'finite':     { fn: _.isFinite,       join: ''   },
  'function':   { fn: _.isFunction,     join: 'a'  },
  'integer':    { fn: _.isInteger,      join: 'an' },
  'map':        { fn: _.isMap,          join: 'a'  },
  'nan':        { fn: _.isNaN,          join: ''   },
  'nil':        { fn: _.isNil,          join: ''   },
  'number':     { fn: _.isNumber,       join: 'a'  },
  'object':     { fn: _.isObject,       join: 'an' },
  'plainobject': { fn: _.isPlainObject, join: 'a'  },
  'regexp':     { fn: _.isRegexp,       join: 'a'  },
  'safeinteger':{
    fn: _.isSafeInteger,
    negate: 'an unsafe integer'
  },
  'set':        { fn: _.isSet,          join: 'a'  },
  'string':     { fn: _.isString,       join: 'a'  },
  'symbol':     { fn: _.isSymbol,       join: 'a'  },
  'typedarray': { fn: _.isTypedArray,   join: 'a'  },
  'undefined':  { 
    fn: _.isUndefined,    
    negate: 'defined',  
    name: 'Value'
  },
  'defined':    { 
    fn: (val) => !_.isUndefined(val),
    negate: 'undefined',
    name: 'Value'
  },
  'weakmap':    { fn: _.isWeakMap,      join: 'a' },
  'weakset':    { fn: _.isWeakSet,      join: 'a' }
}



module.exports = class Validate {

  // ### type

  static buildErrorMessage(val, type, name, info){
    let join = ''
    let negate = info.negate
    if ( name ) {
      join = info.join
    }
    else {
      name = info.name || 'Type'
      join = ''
    }
    if ( join !== '' ) join += ' '
    if (!negate) negate = `not ${join}${type}`
    return `${name} is ${negate}`
  }

  static types(){
    return _.keys(type_to_fn)
  }

  // `Config.instance()` returns the singleton instance
  static type(val, type, name){ 
    let info = type_to_fn[type]
    if ( !info ) throw new ValidationError(`The type "${type}" is not able to be validated`, { type: type, val: val, name: name })
    //if ( !info.fn(val) ) throw new ValidationError(`${name} is not ${join}${type} `, { type: type, val: val, name: name })
    return info.fn(val)
  }

  static typeMessage(val, type, name){
    if ( !Validate.type(val, type, name) ) {
      let info = type_to_fn[type]
      let msg = Validate.buildErrorMessage(val, type, name, info)
      return msg
    }
    return undefined
  }

  static typeError(val, type, name){
    let msg = Validate.typeMessage(val, type, name)
    if ( msg ) {
      let err = new ValidationError(msg, { type: type, val: val, name: name })
      return err
    }
    return undefined
  }

  static typeThrow(val, type, name){
    let err = Validate.typeError(val, type, name)
    if ( err ) throw err
    return true
  }


  // ### length

  static length(val, min, max){
    let size = _.size(val)
    if ( max === undefined ) max = min
    return (size >= min && size <= max )
  }

  static lengthThrow(val, min, max, name){
    let err = Validate.lengthError(val, min, max, name)
    if ( err ) throw err
    return true
  }

  static lengthMessage(val, min, max, name = 'Value'){
    if ( !Validate.length(val, min, max, name) ) {
      let size = _.size(val)
      let msg = `${name} has length ${size}. `
      msg += ( min === max ) ? `Must be ${min}` : `Must be between ${min} and ${max}`
      return msg
    }
    return undefined
  }

  static lengthError(val, min, max, name){
    let msg = Validate.lengthMessage(val, min, max, name)
    if ( msg ) {
      let err = new ValidationError(msg, { test: 'length', value: val, min: min, max: max, name: name })
      return err
    }
    return undefined
  }


  // ### alpha 

  static alpha(string){
    return ( _.isString(string) && !!string.match(/^[A-Za-z]+$/) )
  }

  static alphaThrow(string, name){
    let err = Validate.alphaError(string, name)
    if ( err ) throw err
    return true
  }

  static alphaMessage(string, name){
    if ( !Validate.alpha(string, name) ) {
      if ( name === undefined ) name = 'Value'
      else name = `"${name}"`
      return `${name} must only contain [ A-Z a-z ]`
    }
    return undefined
  }

  static alphaError(string, name){
    let msg = Validate.alphaMessage(string, name)
    if ( msg ) {
      let err = new ValidationError(msg, { test: 'alpha', value: string, name: name })
      return err
    }
    return undefined
  }


  // ### numeric 

  static numeric(string){
    return ( _.isString(string) && !!string.match(/^[0-9]+$/) )
  }

  static numericThrow(string, name){
    let err = Validate.numericError(string, name)
    if ( err ) throw err
    return true
  }

  static numericMessage(string, name){
    if ( !Validate.numeric(string, name) ) {
      if ( name === undefined ) name = 'Value'
      else name = `"${name}"`
      return `${name} must only contain [ 0-9 ]`
    }
    return undefined
  }

  static numericError(string, name){
    let msg = Validate.numericMessage(string, name)
    if ( msg ) {
      let err = new ValidationError(msg, { test: 'numeric', value: string, name: name })
      return err
    }
    return undefined
  }


  // ### alpha numeric

  static alphaNumeric(string){
    return ( _.isString(string) && !!string.match(/^[A-Za-z0-9]+$/) )
  }

  static alphaNumericThrow(string, name){
    let err = Validate.alphaNumericError(string, name)
    if ( err ) throw err
    return true
  }

  static alphaNumericMessage(string, name){
    if ( !Validate.alphaNumeric(string, name) ) {
      if ( name === undefined ) name = 'Value'
      else name = `"${name}"`
      return `${name} must only contain [ A-Z a-z 0-9 ]`
    }
    return undefined
  }

  static alphaNumericError(string, name){
    let msg = Validate.alphaNumericMessage(string, name)
    if ( msg ) {
      let err = new ValidationError(msg, { test: 'alphaNumeric', value: string, name: name })
      return err
    }
    return undefined
  }


  // ### alpha numeric with dash and underscore

  static alphaNumericDashUnderscore(string){
    return ( _.isString(string) && !!string.match(/^[a-z0-9_-]+$/i) )
  }

  static alphaNumericDashUnderscoreMessage(string, name){
    if ( !Validate.alphaNumeric(string, name) ) {
      if ( name === undefined ) name = 'Value'
      else name = `"${name}"`
      return `${name} must only contain alphanumeric, dash and underscore [ A-Z a-z 0-9 _ - ]`
    }
    return undefined
  }

  static alphaNumericDashUnderscoreError(string, name){
    let msg = Validate.alphaNumericDashUnderscoreMessage(string, name)
    if ( msg ) {
      let err = new ValidationError(msg, { test: 'alphaNumericDashUnderscore', value: string, name: name })
      return err
    }
    return undefined
  }

  static alphaNumericDashUnderscoreThrow(string, name){
    let err = Validate.alphaNumericDashUnderscoreError(string, name)
    if ( err ) throw err
    return true
  }


  // ## Instance

  constructor(options = {}){
    debug('creating Validation instance', options)
    
    // Store a suite of tests
    this._tests = []

    // Store test results
    this._results = []

    // Store test errors
    this._errors = []

    // Test mode
    // `throw` errors
    // Return an array of `error`
    // Return an array of `message`
    // Return an array of `boolean` test results
    if ( options.throw ) this.modeThrow()
    if ( options.errors ) this.modeErrors()
    if ( options.messages ) this.modeMessages()
    if ( options.results ) this.modeResults()
    if ( ! this.mode ) this.modeThrow()

  }

  modeThrow(){
    this.mode = 'throw'
    this.throw = true
    this.error = false
    this.message = false
    this.result = false
    this.functionSuffix = 'Throw'
  }
  modeErrors(){
    this.mode = 'errors'
    this.throw = false
    this.error = true
    this.message = false
    this.result = false
    this.functionSuffix = 'Error'
  }
  modeMessages(){
    this.mode = 'message'
    this.throw = false
    this.error = false
    this.message = true
    this.result = false
    this.functionSuffix = 'Message'
  }
  modeResults(){
    this.mode = 'results'
    this.throw = false
    this.error = false
    this.message = false
    this.result = true
    this.functionSuffix = ''
  }


  // Add a test definition to array to be run
  // Type is require. args are dependent on the validation test
  add( test_type, ...args ){
    let test_def = [test_type, ...args]
    debug('add test_def', test_def)
    this._tests.push(test_def)
    return this
  }

  run(){
    let suffix = this.functionSuffix
    this._tests.forEach(test => {
      let test_type = _.head(test)
      let args = _.tail(test)
      let result = Validate[`${test_type}${suffix}`](...args)
      debug('result mode', this.result, test_type, suffix, result)
      if (this.result) {
        this._results.push([result, ...test])
        if ( result !== true && result !== undefined ) this._errors.push([result, ...test])
      } else {
        this._results.push(result)
        if ( result !== true && result !== undefined ) this._errors.push(result)
      }

    })
    //return ( _.isEmpty(this._errors) ) ? true : false
    return this
  }

  get errors(){
    //if ( this._errors.length === 0 ) return false
    return this._errors
  }

  set errors(arg){
    throw new Error('errors should not be set', {arg:arg})
  }

}

// Attach class variables
module.exports.type_to_fn = type_to_fn

// Attach errors to the export
module.exports.ValidationError = ValidationError
