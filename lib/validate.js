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

  // `Config.instance()` returns the singleton instance
  static type(val, type, name){ 
    let info = type_to_fn[type]
    if ( !info ) throw new ValidationError(`Type ${type} cannot be tested`, { type: type, val: val, name: name })
    //if ( !info.fn(val) ) throw new ValidationError(`${name} is not ${join}${type} `, { type: type, val: val, name: name })
    return info.fn(val)
  }

  static typeThrow(val, type, name){
    let msg = Validate.typeError(val, type, name)
    if ( msg ) throw new ValidationError(msg, { type: type, val: val, name: name })
    return true
  }

  static typeError(val, type, name){
    if ( !Validate.type(val, type, name) ) {
      let info = type_to_fn[type]
      let msg = Validate.buildErrorMessage(val, type, name, info)
      return msg
    }
    return undefined
  }


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

  constructor(options){
    this.errors = []

    // Throw early on first error
    this.early = !Boolean(options.early)
  }

}

// Attach class variables
module.exports.type_to_fn = type_to_fn

// Attach errors to the export
module.exports.ValidationError = ValidationError
