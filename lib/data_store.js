const debug       = require('debug')('dply:data:data_store')
const Errors      = require('./errors_data')
const config      = require('./config')
const logger      = require('./logger')

const DataStoreSql = require('./data_store_sql')
const DataStoreMongo = require('./data_store_mongo')
const DataStoreMemory = require('./data_store_memory')
const DataStorePostgres = require('./data_store_sql')
const DataStoreSQLLite = require('./data_store_sql')
const DataStoreMysql = require('./data_store_sql')

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
  'memory': {
    class: DataStoreMemory,
    description: 'In memory hash store',
    file: './data_store_memory'
  },
  'mongo': {
    class: 'DataStoreMongo',
    description: 'MongoDB',
    file: './data_store_mongo'
  },
  'sql': {
    class: 'DataStoreSql',
    description: 'Generic SQL Store',
    file: './data_store_sql'
  },
  'sqlite': {
    class: 'DataStoreSqlite3',
    description: 'SQLLite3 Store',
    file: './data_store_sqllite3'
  },
  'mysql': {
    class: 'DataStoreMysql',
    description: 'MySql Store',
    file: './data_store_mysql'
  },
  'postgres': {
    class: 'DataStorePostgres',
    description: 'MySql Store',
    file: './data_store_postgresql'
  }
}
