const Promise     = require('bluebird')
const debug       = require('debug')('dply:data:data_store_base')
const _           = require('lodash')
const Errors      = require('./data-errors')
const {EntityExistsError, StoreMissingError, EntityMissingError, EntityError, StoreError} = Errors
const config      = require('./config').instance()
const logger      = console

const DataStoreBase = require('./data_store_base')

// JS In memory hash datastore
module.exports = class DataStoreMemory extends DataStoreBase {

  constructor(options){
    debug('creating memory store with options', options)
    super(options)
    this.store = {}
  }

  schema(store){
    if ( ! _.isString(store) ) throw new StoreError('No store provided')
    return false
  }


  exists(store, entity){
    return new Promise((resolve) => {
      if ( ! _.isString(store) ) throw new StoreError('No store provided')
      if ( ! _.isString(entity) ) throw new EntityError('No entity provided')
      if ( this.store[store] === undefined || this.store[store][entity] === undefined )
        return resolve(false)
      return resolve(true)
    })
  }

  create(store, entity, data){
    return new Promise((resolve, reject) => {
      if ( ! _.isString(store) ) return reject( new StoreError('No store provided') )
      if ( ! _.isString(entity) ) return reject( new EntityError('No entity provided') )
      if (!this.store[store]) this.store[store] = {}
      if (this.store[store][entity]) 
        return reject(new EntityExistsError('Entity Exists', {store:store, entity:entity}))
      this.store[store][entity] = data
      return resolve(this.store[store][entity])
    })
  }

  read(store, entity){
    return new Promise((resolve, reject) => {
      if ( ! _.isString(store) ) throw new StoreError('No store provided')
      if ( ! _.isString(entity) ) throw new EntityError('No entity provided')
      if (!this.store[store])
        return reject(new StoreMissingError('Store Missing', {store:store}))
      if (this.store[store][entity] === undefined)
        return reject(new EntityMissingError('Entity Missing', {store:store, entity:entity }))
      return resolve(this.store[store][entity])
    })
  }

  update(store, entity, data){
    return new Promise((resolve, reject) => {
      if ( ! _.isString(store) ) throw new StoreError('No store provided')
      if ( ! _.isString(entity) ) throw new EntityError('No entity provided')
      if (!this.store[store])
        return reject(new StoreMissingError('Store Missing', {store:store}))
      //if (!this.store[store]) this.store[store] = {}
      if (this.store[store][entity] === undefined)
        return reject(new EntityMissingError('Entity Missing', {store:store, entity:entity }))
      return resolve( _.merge(this.store[store][entity], data) )
    })
  }

  replace(store, entity, data){
    return new Promise((resolve, reject) => {
      if ( ! _.isString(store) ) return reject(new StoreError('No store provided'))
      if ( ! _.isString(entity) ) return reject(new EntityError('No entity provided'))
      if (!this.store[store])
        return reject(new StoreMissingError('Store Missing', {store:store}))
      if (this.store[store][entity] === undefined)
        return reject(new EntityMissingError('Entity Missing', {store:store, entity:entity }))
      return resolve(this.store[store][entity] = data)
    })
  }

  // Happy to delete a non existant key
  delete(store, entity){
    return new Promise((resolve, reject) => {
      if ( ! _.isString(store) ) throw new StoreError('No store provided')
      if ( ! _.isString(entity) ) throw new EntityError('No entity provided')
      if (!this.store[store])
        return reject(new StoreMissingError('Store Missing', {store:store}))
      if (this.store[store][entity] === undefined) return resolve(false)
      delete this.store[store][entity]
      return resolve(true)
    })
  }
}

