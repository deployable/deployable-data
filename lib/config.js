// # Config

const Promise = require('bluebird')
const _ = require('lodash')
const yaml = require('js-yaml')
const path = require('path')
const fs = Promise.promisifyAll(require('fs'))


module.exports = class Config {

  // `Config.instance()` returns the singleton instance
  static instance(){ 
    if ( this._instance ) return this._instance
    return this._instance = new Config()
  }

  //     new Config({ file_path: '/whatever/config.yaml', singleton: false }}
  constructor( options = {} ){
   
    // file path
    this.file_path = options.file_path
    this.load(this.file_path) 
    
    // Store the singleton if not there or required
    if (!this.constructor._instance || options.singleton ) this.constructor._instance = this
  }

  load( file_path ){
    if ( !file_path ) file_path = path.resolve(__dirname, '..', 'config.yaml')
    return this.data = yaml.load(fs.readFileSync(file_path))
  }

  get( key ){
    return _.get(this.data, key)
  }

  set( key, value ){
    return _.set(this.data, key, value)
  }

}

