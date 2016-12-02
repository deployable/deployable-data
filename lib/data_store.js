const Promise     = require('bluebird')
const debug       = require('debug')('dply:data:data_store')
const _           = require('lodash')
const Errors      = require('./errors_data')
const config      = require('./config').instance()
const logger      = require('./logger')

const DataStoreSql = require('./data_store_sql')
const DataStoreMongo = require('./data_store_mongo')
const DataStoreMemory = require('./data_store_memory')

// ## DataStore
// DataStore factory class, for the different types of datastore

module.exports = class DataStore {
  static create(name, ...args){
    debug('creating DataStore %s with ', name, ...args)
    if (!this.map[name]) throw new Error(`Unknown data store [${name}]`)
    return new this.map[name].class(...args)
  }
}
// Can't create class variables in a es6 class definition :/
module.exports.map = {
  'sql': {
    class: DataStoreSql,
    description: 'Generic SQL Store'
  },
  'mongo': {
    'class': DataStoreMongo,
    description: 'MongoDB'
  },
  'memory': {
    'class': DataStoreMemory,
    'description': 'In memory hash store'
  }
}
