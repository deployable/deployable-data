
// # ValidateTest


const _ = require('lodash')
const debug = require('debug')('dply:data:validate_test')
const {ValidationError} = require('./errors_dply')

module.exports = class ValidateTest {

  constructor ( label, options = {} ) {
    
    // Label/name of test
    this.label = label

    // Template options for _.template (set before .message!)
    this.template_options = options.template_options || { interpolate: /{{([\s\S]+?)}}/g }

    // The test function to use
    this.test = options.test

    // The string template to use as a message, or function to return string message
    this.message = options.message

    // Names of arguments, used for templates
    this.args = options.args || ['value']
    this.arg_names = options.arg_names || options.args || ['value']
    debug('this.args', this.args)
    debug('this.arg_names', this.arg_names)

    // Group this test belongs to
    this.group = options.group

    // A default value name when one is not passed in
    this.default_value_name = options.default_value_name || 'Value'

  }

  // label
  get label() { return this._label }
  set label(str) { this._label = str }

  // template_options
  get template_options(){ return this._template_options }
  set template_options(opts){ this._template_options = opts }

  // test
  get test() { return this._test }
  set test(test_fn) { 
    if ( ! _.isFunction(test_fn) ) throw new Error(`Test must be a function. ${this.label} got ${typeof test_fn}`)
    this._test = test_fn
  }

  // message
  get message(){ return this._message}
  // Set a new template string/fn for the message
  set message(msg){
    if ( ! _.isString(msg) && ! _.isFunction(msg) ) 
      throw new Error(`Message must be a string or function. Got ${typeof msg}`)
    this._message = msg
    if ( _.isString(msg) ) this.compileTemplate()
  }

  // template
  get template(){ return this._template }
  set template(tmpl){
    throw Error('Nope, set the message')
  }

  // arg_names
  get arg_names() { return this._arg_names }
  set arg_names(args) { 
    if ( !_.isArray(args) ) throw new Error('Property arg_names must be an array')
    this._arg_names = args
  }

  // group
  get group() { return this._group }
  set group(str) { this._group = str }

  

  compileTemplate(){
    debug('template compiled for "%s" [%s]. options: ', this.label, this._message, this.template_options)
    return this._template = _.template(this._message, this._template_options)
  }

  // Fill the template with values
  buildMessage(params){
    params.name = this.strOrValue(params.name)
    debug('building message with for %s', this.label, params)
    if ( _.isString(this.message) ) return this.template(params)
    if ( _.isFunction(this.message) ) return this.message(params)
    throw new Error(`Test "message" is of unkown type "${typeof this.message}`)
  }

  // Fill the template with values
  buildMessageFromArgs(...args){
    let params = this.argsToParams(...args)
    return this.buildMessage(params)
  }

  // Create a name:value object from an array of function argument 
  // names, and an array of argument values
  // This is used for template generation
  argsToParams(...args){
    // `['a','b'] [1,2]` becomes `{ a:1, b:2 }`
    return _.zipObject( ['test', ...this.arg_names, 'name'], [this.label, ...args] )
  }

  // Defaults a str to Value, or surrounds str in quotes. 
  // For message output
  strOrValue(str){
    return ( str === undefined ) ? this.default_value_name :  `"${str}"`
  }


  getError(...args){
    let params = this.argsToParams(...args)
    let msg = this.buildMessage(params)
    let err = new ValidationError(msg, params)
    return err
  }


}