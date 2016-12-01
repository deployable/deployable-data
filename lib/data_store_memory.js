const Promise     = require('bluebird')
const debug       = require('debug')('dply:data:data_store_base')
const _           = require('lodash')
const Errors      = require('./data-errors')
const {EntityExistsError, StoreMissingError, EntityMissingError} = Errors
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

  exists(store, entity){
    return new Promise((resolve) => {
      if ( this.store[store] === undefined || this.store[store][entity] === undefined )
        return resolve(false)
      return resolve(true)
    })
  }

  create(store, entity, data){
    return new Promise((resolve, reject) => {
      if (!this.store[store]) this.store[store] = {}
      if (this.store[store][entity]) 
        return reject(new EntityExistsError('Entity Exists', {store:store, entity:entity}))
      this.store[store][entity] = data
      return resolve(this.store[store][entity])
    })
  }

  read(store, entity){
    return new Promise((resolve, reject) => {
      if (!this.store[store])
        return reject(new StoreMissingError('Store Missing', {store:store}))
      if (this.store[store][entity] === undefined)
        return reject(new EntityMissingError('Entity Missing', {store:store, entity:entity }))
      return resolve(this.store[store][entity])
    })
  }

  update(store, entity, data){
    return new Promise((resolve, reject) => {
      if (!this.store[store])
        return reject(new StoreMissingError('Store Missing', {store:store}))
      //if (!this.store[store]) this.store[store] = {}
      if (this.store[store][entity])
        _.merge(this.store[store][entity], data)
      else
        this.store[store][entity] = data
      return resolve(this.store[store][entity])
    })
  }

  replace(store, entity, data){
    return new Promise((resolve, reject) => {
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
      if (!this.store[store])
        return reject(new StoreMissingError('Store Missing', {store:store}))
      if (this.store[store][entity] === undefined) return resolve(false)
      delete this.store[store][entity]
      return resolve(true)
    })
  }
}

