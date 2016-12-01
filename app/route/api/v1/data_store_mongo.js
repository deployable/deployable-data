const Promise     = require('bluebird')
const debug       = require('debug')('dply:data:data_store_mongo')
const _           = require('lodash')
const Errors      = require('../../../../lib/dply-errors')
const config      = require('../../../../lib/config').instance()
const logger      = console
const mongodb     = Promise.promisifyAll(require('mongodb'))

// MongoDB data store
class DataStoreMongo extends DataStoreBase {

  constructor(options){
    super(options)
    this.store = {}
  }

  exists(store, entity){
    return new Promise(resolve => {
      if ( this.store[store][entity] === undefined )
        resolve(true)
      else
        resolve(false)
    })
  }

  create(store, entity, data){
    return new Promise(resolve => {
      this.store[store][entity] = data
      resolve(data)
    })
  }

  read(store, entity){
    return new Promise(resolve => {
      resolve(this.store[store][entity])
    })
  }

  update(store, entity, data){
    return new Promise(resolve => {
      if (this.store[store][entity])
        _.merge( this.store[store][entity], data )
      else
        this.store[store][entity] = data
      resolve(this.store[store][entity])
    })
  }

  delete(store, entity){
    return new Promise(resolve => {
      let value = this.store[store][entity]
      delete this.store[store][entity]
      resolve(value)
    })
  }
}