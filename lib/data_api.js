
const Promise     = require('bluebird')
const debug       = require('debug')('dply:data:data_api')
const _           = require('lodash')
const Errors      = require('./errors_data')
const {HttpError, StoreMissingError, EntityMissingError, EntityExistsError } = Errors
const config      = require('./config').instance()
const logger      = console

const DataStore = require('./data_store')


// The controller api that the REST API plugs into
// Actual data access is done via a DataStore

module.exports = class DataAPI {

  constructor(type, options){
    this.store = DataStore.create(type, options)
  }

  // ### Express `param` middleware

  // Returns a middleware function that has the class instance `this` in scope

  dbParamCheck(){
    return (req, res, next) => {
      let db_name = (req.params.db !== undefined) ? req.params.db : req.params[0]
      db_name = String(db_name).replace(/^\//, '')
      debug('Data db param', db_name, req.params)
      try {
        this.store.dbValidate(db_name)
      } catch (e) {
        let err = HttpError.create(400, `Validation of "db" url param failed. ${e.message}`,
          { field: 'db', value: db_name, err: e  })
        return next(err)
      }
      return next()
    }
  }

  storeParamCheck(){
    return (req, res, next) => {
      let store_name = (req.params.store !== undefined) ? req.params.store : req.params[1]
      store_name = String(store_name).replace(/^\//, '')
      debug('Data store param', store_name, req.params)
      try {
        this.store.storeValidate(store_name)
      } catch (e) {
        if ( e.name === 'ValidationError' ){
          let err = HttpError.create(400, `Validation of "store" url param failed. ${e.message}`,
            { field: 'db', value: store_name, err: e  })
          return next(err)
        }
        return next(e)
      }
      return next()
    }
  }

  entityParamCheck(){
    return (req, res, next) => {
      let entity_name = (req.params.entity !== undefined) ? req.params.entity : req.params[2]
      entity_name = String(entity_name).replace(/^\//, '')
      debug('Data entity param', entity_name, req.params)
      try {
        this.store.entityValidate(entity_name)
      } catch (e) {
        let err = HttpError.create(400, `Validation of "entity" url param failed. ${e.message}`,
          { field: 'db', value: entity_name, err: e })
        return next(err)
      }
      return next()
    }
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
      .catch(EntityExistsError, () => {
        throw HttpError.create(400, `Entity exists - ${store} ${entity}`)
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
      .catch(StoreMissingError, () => {
        throw HttpError.create(404, `Store not found - ${store}`)
      })
      .catch(EntityMissingError, () => {
        throw HttpError.create(404, `Entity not found - ${entity}`)
      })
  }

  replace(req){
    let store = req.params.store
    let entity = req.params.entity
    let replace_data = req.body   
    return this.store.replace(store, entity, replace_data)
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
      .then(result => {
        if ( result ) return { status: 'deleted' }
        return { status: 'missing' }
      })
      .catch(StoreMissingError, () => {
        throw HttpError.create(404, `Store not found - ${store}`)
      })
  }

  
  createSchema(req){
    return new Promise((resolve)=>{
      let store = req.params.store
      //return this.store.createSchema(store,req.body)
      resolve({ status:'dunno', store: store })
    })
  }

  readSchema(req){
    return new Promise((resolve)=>{
      let store = req.params.store
      //return this.store.readSchema(store,req.body)
      resolve({ status:'dunno', store: store })
    })
  }

  updateSchema(req){
    return new Promise((resolve)=>{
      let store = req.params.store
      //return this.store.updateSchema(store,req.body)
      resolve({ status:'dunno', store: store })
    })
  }

  replaceSchema(req){
    return new Promise((resolve)=>{
      let store = req.params.store
      //return this.store.replaceSchema(store,req.body)
      resolve({ status:'dunno', store: store })
    })
  }

  deleteSchema(req){
    return new Promise((resolve)=>{
      let store = req.params.store
      //return this.store.deleteSchema(store,req.body)
      resolve({ status:'dunno', store: store })
    })
  }

}