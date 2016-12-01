
const Promise     = require('bluebird')
const debug       = require('debug')('dply:data:data_api')
const _           = require('lodash')
const Errors      = require('./data-errors')
const {HttpError, StoreMissingError, EntityMissingError } = Errors
const config      = require('./config').instance()
const logger      = console

const DataStoreMemory = require('./data_store_memory')


// The controller api that the REST API plugs into
// Actual data access is done via a DataStore

module.exports = class DataAPI {

  static storeParamCheck(req, res, next) {
    let store_name = (req.params.store !== undefined) ? req.params.store : req.params[0]
    store_name = String(store_name)
    store_name = store_name.replace(/^\//, '')
    debug('Data store', store_name, req.params)
    if ( store_name === undefined || !store_name.match(/^[a-z0-9]{1,128}$/i) ){
      let err = HttpError.create(400, 'Store name must be alpha numeric',
          { field: 'store', value: store_name })
      return next(err)
    }
    return next()
  }

  static entityParamCheck(req, res, next) {
    let entity_name = (req.params.entity !== undefined) ? req.params.entity : req.params[1]
    entity_name = String(entity_name)
    entity_name = entity_name.replace(/^\//, '')
    debug('Data entity', entity_name, req.params)
    if ( entity_name === undefined || !entity_name.match(/^[a-z0-9]{1,128}$/i) ){
      let err = HttpError.create(400, 'Entity must be alpha numeric',
          { field: 'entity', value: entity_name })
      return next(err)
    }
    return next()
  }

  constructor(){
    this.store = new DataStoreMemory()
  }

  create(req){ //store, entity, create_data){
    let store = req.params.store
    let entity = req.params.entity
    let create_data = req.body
    return this.store.create(store, entity, create_data)
      .then( data => {
        debug('created data %s %s', store, entity, data)
        return { status: 'created', data: data }
      })
  }

  read(req){
    let store = req.params.store
    let entity = req.params.entity
    return this.store.read(store, entity)
      .then(data => ({ status: 'read', data: data }))
      .catch(StoreMissingError, () => {
        throw HttpError.create(404, `Store not found - ${store}`)
      })
      .catch(EntityMissingError, () => {
        throw HttpError.create(404, `Entity not found - ${entity}`)
      })
  }

  update(req){
    let store = req.params.store
    let entity = req.params.entity
    let update_data = req.body   
    return this.store.update(store, entity, update_data)
      .then(data => ({ status:'updated', data: data }))
  }

  replace(req){
    let store = req.params.store
    let entity = req.params.entity
    let replace_data = req.body   
    return this.store.update(store, entity, replace_data)
      .then(data => ({ status:'replaced', data: data }))
      .catch(StoreMissingError, () => {
        throw HttpError.create(404, `Store not found - ${store}`)
      })
      .catch(EntityMissingError, () => {
        throw HttpError.create(404, `Entity not found - ${entity}`)
      })
  }

  delete(req){
    let store = req.params.store
    let entity = req.params.entity
    return this.store.delete(store, entity)
      .then(() => ({ status:'deleted' }))
      .catch(StoreMissingError, () => {
        throw HttpError.create(404, `Store not found - ${store}`)
      })
      .catch(EntityMissingError, () => {
        throw HttpError.create(404, `Entity not found - ${entity}`)
      })
  }

  schema(store){
    return new Promise.resolve('dunno')
  }
}