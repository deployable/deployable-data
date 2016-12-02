const Promise     = require('bluebird')
const debug       = require('debug')('dply:data:data_store_sql')
const _           = require('lodash')
const Errors      = require('./errors_data')
const config      = require('./config').instance()
const logger      = require('./logger')

const DataStoreBase = require('./data_store_base')

// Generic SQL data store
module.exports = class DataStoreSql extends DataStoreBase {

}
