// # Config

const Promise = require('bluebird')
const _ = require('lodash')
const yaml = require('js-yaml')
const path = require('path')
const fs = Promise.promisifyAll(require('fs'))

const package_json = require('../package.json')
const {KeyError} = require('./errors_dply')


module.exports = class Config {

  // `Config.instance()` returns the singleton instance
  static instance(){ 
    if ( this._instance ) return this._instance
    return this._instance = new Config()
  }

  //     new Config({ file_path: '/whatever/config.yaml', singleton: false }}
  constructor( options = {} ){

    // Config store
    this.config = {}
   
    // State store
    this.state = {}

    // file path
    this.file_path = options.file_path
    this.load(this.file_path) 
    
    // Store the singleton if not there or required
    if (!this.constructor._instance || options.singleton ) this.constructor._instance = this

    // Store package.json 
    this.config.package = package_json

  }

  load( file_path ){
    if ( !file_path ) file_path = path.resolve(__dirname, '..', 'config.yaml')
    return this.config = yaml.load(fs.readFileSync(file_path))
  }

  // Get a property from config
  fetch( key ){
    return _.get(this.config, key)
  }

  // Get a property from config config
  get( key ){
    if ( ! _.hasIn(this.config, key) ) throw new KeyError('Unknown config key', {key:key})
    return _.get(this.config, key)
  }

  // Set a property in config config
  set( key, value ){
    return _.set(this.config, key, value)
  }


  getState( key ){
    if ( ! _.hasIn(this.state, key) ) throw new KeyError('Unknown state key', {key:key})
    return _.get(this.state, key)
  }

  setState( key, value ){
    return _.set(this.state, key, value)
  }

}

// Export custom error along with class
module.exports.KeyError = KeyError
