const Promise     = require('bluebird')
const debug       = require('debug')('dply:data:data_store_base')
const _           = require('lodash')
const Errors      = require('./data-errors')
const {EntityExistsError, StoreMissingError, EntityMissingError} = Errors
const config      = require('./config').instance()
const logger      = console

const DataStoreBase = require('./data_store_base')

// Generic SQL data store
module.exports = class DataStoreSql extends DataStoreBase {

}
