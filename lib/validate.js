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
const ValidateTest = require('./validate_test')
const ValidateGroup = require('./validate_group')



// `join` is the english join
// `negate` is when the negative has it's own word

const type_to_fn = {
  'array': {
    fn: _.isArray,
    join: 'an',
    negate: 'message'
  }
}


const tests = {

  // It got a bit to meta here
  // type: {
  //   args: ['type', 'value', '...args'],
  //   test: ( type, value, ...args ) => Validate.type( type, value, ...args ),
  //   //message: '{{name}} {{type}} mismatch for {{value}}'
  //   message: (params) => Validate.typeMessage(params.test)
  // },

  array: {
    args: ['value'],
    test: _.isArray,
    message: '{{name}} must be an array',
    group: 'language'
  },
  boolean: {
    args: ['value'],
    test: _.isBoolean,
    message: '{{name}} must be a boolean',
    group: 'language'
  },
  buffer: {
    args: ['value'],
    test: _.isBuffer,
    message: '{{name}} must be a buffer',
    group: 'language'
  },
  date: {
    args: ['value'],
    test: _.isDate,
    message: '{{name}} must be a date',
    group: 'language'
  },
  element: {
    args: ['value'],
    test: _.isElement,
    message: '{{name}} must be an element',
    group: 'language'
  },
  error: {
    args: ['value'],
    test: _.isError,
    message: '{{name}} must be an error',
    group: 'language'
  },
  finite: {
    args: ['value'],
    test: _.isFinite,
    message: '{{name}} must be finite'
  },
  function: {
    args: ['value'],
    test: _.isFunction,
    message: '{{name}} must be a function',
    group: 'language'
  },
  map: {
    args: ['value'],
    test: _.isMap,
    message: '{{name}} must be a map',
    group: 'language'
  },
  nan: {
    args: ['value'],
    test: _.isNaN,
    message: '{{name}} must be Not A Number',
    group: 'language'
  },
  number: {
    args: ['value'],
    test: _.isNumber,
    message: '{{name}} must be a Number',
    group: 'language'
  },
  object:     {
    args: ['value'],
    test: _.isObject,
    message: '{{name}} must be an object',
    group: 'language'
  },
  plainobject: {
    args: ['value'],
    test: _.isPlainObject,
    message: '{{name}} must be a plain object',
    group: 'language'
  },
  regexp:     {
    args: ['value'],
    test: _.isRegExp,
    message: '{{name}} must be a Regular Expression',
    group: 'language'
  },
  safeinteger:{
    args: ['value'],
    test: _.isSafeInteger,
    negate: 'an unsafe integer',
    message: '{{name}} must be a safe integer'
  },
  set:        {
    args: ['value'],
    test: _.isSet,
    message: '{{name}} must be a set',
    group: 'language'
  },
  string:     {
    args: ['value'],
    test: _.isString,
    message: '{{name}} must be a string',
    group: 'language'
  },
  symbol:     {
    args: ['value'],
    test: _.isSymbol,
    message: '{{name}} must be a symbol',
    group: 'language'
  },
  typedarray: {
    args: ['value'],
    test: _.isTypedArray,
    message: '{{name}} must be a typed array',
    group: 'language'
  },
  weakmap:    {
    args: ['value'],
    test: _.isWeakMap,
    message: '{{name}} must be a weak map',
    group: 'language'
  },
  weakset:    {
    args: ['value'],
    test: _.isWeakSet,
    message: '{{name}} must be a weak set',
    group: 'language'
  },
  nil:        { 
    args: ['value'],
    test: _.isNil,
    message: '{{name}} must be nil'
  },
  notNil:        { 
    args: ['value'],
    test: (value) => !_.isNil(value),
    message: '{{name}} must not be nil'
  },
  empty: { 
    args: ['value'],
    test: _.isEmpty,
    join: '',
    name: 'Value',
    message: '{{name}} must be empty'
  },
  notEmpty: { 
    args: ['value'],
    test: (value) => !_.isEmpty(value),
    join: '',
    name: 'Value',
    message: '{{name}} must not be empty'
  },
  undefined:  { 
    args: ['value'],
    test: _.isUndefined,    
    negate: 'defined',  
    name: 'Value',
    message: '{{name}} must be undefined'
  },
  defined: { 
    args: ['value'],
    test: (val) => !_.isUndefined(val),
    negate: 'undefined',
    name: 'Value',
    message: '{{name}} must be defined'
  },

  length: {
    args: ['value', 'min', 'max'],
    test: (value, min, max) => {
      if (max === undefined ) max = min
      let size =  _.size(value)
      return ( size >= min && size <= max )
    },
    message: '{{name}} must be {{min}} to {{max}}'
  },

  integer: {
    args: ['value'],
    test: (value) => ( _.isInteger(value) ),
    message: '{{name}} must be an integer',
    group: 'number'
  },
  range: {
    args: ['value','min','max'],
    test: (value, min, max) => ( value >= min && value <= max ),
    message: '{{name}} must be in {{min}} .. {{max}}',
    group: 'number'
  },
  between: {
    args: ['value','min','max'],
    test: (value, min, max) => ( value > min && value < max ),
    message: '{{name}} must be between {{min}} and {{max}}',
    group: 'number'
  },

  match: {
    args: ['string', 'regex'],
    test: ( string, regex ) => ( _.isString(string) && Boolean(string.match(regex)) ),
    message: '{{name}} must match regular expression {{regex}}',
    group: 'string'
  },
  alphaNumericDashUnderscore: {
    args: ['string'],
    test: (string) => ( _.isString(string) && Boolean(string.match(/^[A-Za-z0-9_-]+$/)) ),
    message: '{{name}} must only contain letters, numbers, dash and underscore [ A-Z a-z 0-9 _ - ]',
    group: 'string'
  },
  alphaNumeric: { 
    args: ['string'],
    test: (string) => ( _.isString(string) && Boolean(string.match(/^[A-Za-z0-9]+$/)) ),
    message: '{{name}} must only contain letters and numbers [ A-Z a-z 0-9 ]',
    group: 'string'
  },
  alpha: { 
    args: ['string'],
    test: (string) => ( _.isString(string) && Boolean(string.match(/^[A-Za-z]+$/)) ),
    message: '{{name}} must only contain letters [ A-Z a-z ]',
    group: 'string'
  },
  numeric: { 
    args: ['string'],
    test: (string) => ( _.isString(string) && Boolean(string.match(/^[0-9]+$/)) ),
    message: '{{name}} must only contain numbers [ 0-9 ]',
    group: 'string'
  },

  testing: { 
    args: ['string'],
    test: () => ( false ),
    message: '{{name}} must be true'
  }
}


//module.exports = class Validate {
class Validate {

  static init(){
    Validate._tests = {}
    _.forEach(tests, (test_name, test_details)=> {
      Validate._tests[test_name] = new ValidateTest(test_name, test_details)
    })
  }

  static string(...args){ 
    let test = args[0]
    let group = Validate.getTest(test)
    if (!group) throw new Error(`No test "${test}" in group "string"`)
    return Validate.as(...args)
  }

  static number(...args){ 
    let test = args[0]
    let group = Validate.getTest(test)
    if (!group) throw new Error(`No test "${test}" in group "number"`)
    return Validate.as(...args)
  }

  static a(...args){ return Validate.as(...args) }
  static an(...args){ return Validate.as(...args) }
  static as(test, ...args){
    let mtest = Validate.getTest(test)
    let res = mtest.test(...args)
    return res
  }

  static andThrow(...args){
    let err = ( ! Validate.as(...args) ) ? Validate.getError(...args) : false
    if ( err ) throw err
    return true
  }

  static toMessage(...args){
    let msg = ( ! Validate.as(...args) ) ? Validate.getMessage(...args) : undefined
    return msg
  }

  static toError(...args){
    let err = ( ! Validate.as(...args) ) ? Validate.getError(...args) : undefined
    return err
  }

  // static getGroup(group_name){
  //   let grp = groups_tests[group_name]
  //   if (!grp) throw Error(`No group "${group_name}"`)
  //   return grp
  // }

  // static getGroup(test_name){
  //   //let group = Validate.getGroup(group_name)
  //   let test = tests[test_name]
  //   if (!test) throw Error(`No test "${test_name}"`)
  //   return test.group
  // }

  static getTest(test_name){
    //let group = Validate.getGroup(group_name)
    let test = Validate._tests[test_name]
    if (!test) throw Error(`No test named "${test_name}" available`)
    return test
  }

  static getError(...args){
    let msg = Validate.getMessage(...args)
    let params = Validate.getParamObject(...args)
    let err = new ValidationError(msg, params)
    return err
  }

  static getParamObject(test, ...args){
    let mtest = Validate.getTest(test)
    let params = _.zipObject( ['test', ...mtest.args, 'name'], [test, ...args] )
    return params
  }

  static getMessage(test, ...args){
    return Validate.getTest(test).buildMessageFromArgs(...args)
  }

  // Defaults a name to Value, or surrounds name in quotes. 
  // For message output
  static nameOrValue(name){
    return ( name === undefined ) ? 'Value' :  `"${name}"`
  }

  static buildTypeErrorMessage(val, type, name, info){
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
    this.function = 'andThrow'
  }
  modeErrors(){
    this.mode = 'errors'
    this.throw = false
    this.error = true
    this.message = false
    this.result = false
    this.function = 'toError'
  }
  modeMessages(){
    this.mode = 'message'
    this.throw = false
    this.error = false
    this.message = true
    this.result = false
    this.function = 'toMessage'
  }
  modeResults(){
    this.mode = 'results'
    this.throw = false
    this.error = false
    this.message = false
    this.result = true
    this.function = 'as'
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
    let valfn = this.function
    this._tests.forEach(test => {
      let test_type = _.head(test)
      let args = _.tail(test)
      let result = Validate[valfn](test_type, ...args)
      debug('result mode thisres[%s] type[%s] valfn[%s] result[%s]', this.result, test_type, valfn, result)
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

// Init the tests in a class variable
Validate._tests = {}
_.forEach(tests, (test_details, test_name)=> {
  debug('test_name[%s] details', test_name, test_details)
  Validate._tests[test_name] = new ValidateTest(test_name, test_details)
})

// Attach class variables
module.exports = Validate
module.exports.tests = tests
module.exports.type_to_fn = type_to_fn

// Attach errors to the export
module.exports.ValidationError = ValidationError
