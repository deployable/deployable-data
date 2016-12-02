const debug       = require('debug')('dply:data:data_store_base')
const logger      = require('./logger')


module.exports = class DataStoreBase {

  constructor(options = {}){
    this.logger = options.logger || logger
  }

  exists(store, entity){
    debug(store, entity)
    throw new Error('Not implemented')
  }
  schema(store, schema){
    debug(store, schema)
    throw new Error('Not implemented')
  }
  create(store, entity, data){
    debug(store, entity, data)
    throw new Error('Not implemented')
  }
  read(store, entity){
    debug(store, entity)
    throw new Error('Not implemented')
  }
  update(store, entity, data){
    debug(store, entity, data)
    throw new Error('Not implemented')
  }
  replace(store, entity, data){
    debug(store, entity, data)
    throw new Error('Not implemented')
  }
  delete(store, entity){
    debug(store, entity)
    throw new Error('Not implemented')
  }
}
