const Promise     = require('bluebird')
const debug       = require('debug')('dply:data:data_store_base')
const _           = require('lodash')
const Errors      = require('./dply-errors')
const config      = require('./config').instance()
const logger      = console


module.exports = class DataStoreBase {
  exists(store, entity){
    logger.debug(store, entity)
    throw new Error('Not implemented')
  }
  schema(store, schema){
    logger.debug(store, schema)
    throw new Error('Not implemented')
  }
  create(store, entity, data){
    logger.debug(store, entity, data)
    throw new Error('Not implemented')
  }
  read(store, entity){
    logger.debug(store, entity)
    throw new Error('Not implemented')
  }
  update(store, entity, data){
    logger.debug(store, entity, data)
    throw new Error('Not implemented')
  }
  replace(store, entity, data){
    logger.debug(store, entity, data)
    throw new Error('Not implemented')
  }
  delete(store, entity){
    logger.debug(store, entity)
    throw new Error('Not implemented')
  }
}