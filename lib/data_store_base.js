const debug       = require('debug')('dply:data:data_store_base')
const logger      = require('./logger')
const Validate    = require('./validate')


module.exports = class DataStoreBase {

  constructor(options = {}){
    this.logger = options.logger || logger
  }

  globalValidate(str, name){
    new Validate()
      .add('type', str, 'string', name)
      .add('length', str, 1, 256, name)
      .add('alphaNumericDashUnderscore', str)
      .run()
  }

  dbValidate(db_str){
    this.globalValidate(db_str, 'db')
  }

  storeValidate(store_str){
    this.globalValidate(store_str, 'store')
  }

  entityValidate(entity_str){
    this.globalValidate(entity_str, 'entity')
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
