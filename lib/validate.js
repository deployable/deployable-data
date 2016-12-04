// # Validate

const _ = require('lodash')

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

  static lengthThrow(val, min, max, name = 'Value'){
    let err = Validate.lengthError(val, min, max, name)
    if ( err ) throw err
    return true
  }

  static lengthMessage(val, min, max, name){
    if ( !Validate.length(val) ) {
      let size = _.size(val)
      let msg = `${name} has length ${size}. `
      msg += ( min === max ) ? `Must be ${min}` : `Must be between ${min} and ${max}`
      return msg
    }
    return undefined
  }

  static lengthError(val, min, max, name){
    let msg = Validate.lengthMessage(val,min,max,name)
    if ( msg ) {
      let err = new ValidationError(msg, { val: val, min: min, max: max, name: name })
      return err
    }
    return undefined
  }


  // ### {next}


  // ## Instance

  constructor(options = {}){
    
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
    this.errors = false
    this.message = true
    this.results = false
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


  add( test_type, ...args ){
    let test_def = [test_type, ...args]
    this._tests.push(test_def)
    return test_def
  }

  run(){
    let suffix = this.functionSuffix
    this._tests.forEach(test => {
      let test_type = _.head(test)
      let args = _.tail(test)
      let result = Validate[`${test_type}${suffix}`](...args)
      this._results.push(result)
      if ( result !== true && result !== undefined ) this._errors.push(result)

    })
    return ( _.isEmpty(this._errors) ) ? true : false
  }

  errors(){
    //if ( this._errors.length === 0 ) return false
    return this._errors
  }

}

// Attach class variables
module.exports.type_to_fn = type_to_fn

// Attach errors to the export
module.exports.ValidationError = ValidationError
