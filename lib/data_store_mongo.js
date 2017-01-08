const Promise     = require('bluebird')
const debug       = require('debug')('dply:data:data_store_mongo')
const _           = require('lodash')
const Errors      = require('./errors_data')
const config      = require('./config')
const logger      = require('./logger')
const mongodb     = Promise.promisifyAll(require('mongodb'))
const MongoClient = mongodb.MongoClient

const DataStoreBase = require('./data_store_base')

// MongoDB data store
module.exports = class DataStoreMongo extends DataStoreBase {

  constructor(options){
    super(options)
    this.store = {}
    this.url = 'mongodb://localhost:27017/data'
    debug('connecting to db %s',this.url)
    MongoClient.connectAsync(this.url).then(db => {
      this.db = db
      debug('connected to db', db)
    })
  }

  exists(store, entity){
    return new Promise(resolve => {
      let col = this.db.collection(store)
      return col.findOneAsync({ _id: entity }).then(res => {
        if (res) return resolve(true)
        return resolve(false)
      })
    })
  }

  create(store, entity, data){
    return new Promise(resolve => {
      let col = this.db.collection(store)
      let doc = _.merge( { _id: entity }, data)
      return col.insertAsync(doc)
      .then(res => {
        if (res) return resolve(res)
        throw new Error('create nope')
      })
    })
  }

  read(store, entity){
    return new Promise(resolve => {
      let col = this.db.collection(store)
      return col.findOneAsync({ _id: entity }).then(res => {
        if (res) return resolve(res)
        throw new Errors.EntityMissingError('')
      })
    })
  }

  update(store, entity, data){
    return new Promise(resolve => {
      let col = this.db.collection(store)
      let doc = _.merge( { _id: entity }, data)
      return col.updateOneAsync({ _id: entity }, doc).then(res => {
        if (res) return resolve(res)
        throw new Error('create nope')
      })
    })
  }

  replace(store, entity, data){
    return new Promise(resolve => {
      let col = this.db.collection(store)
      let doc = _.merge( { _id: entity }, data)
      return col.replaceOneAsync({ _id: entity }, doc).then(res => {
        if (res) return resolve(res)
        throw new Error('create nope')
      })
    })
  }

  delete(store, entity){
    return new Promise(resolve => {
      let col = this.db.collection(store)
      let doc = { _id: entity }
      return col.deleteOneAsync(doc).then(res => {
        if (res) return resolve(res)
        throw new Error('create nope')
      })
    })
  }
}
