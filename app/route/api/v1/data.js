const Promise     = require('bluebird')
const debug       = require('debug')('dply:data:route:api:v1:data')
const router      = require('express').Router()
const bodyParser  = require('body-parser')
const _           = require('lodash')

const Errors      = require('../../../../lib/errors_data')
const config      = require('../../../../lib/config')
const logger      = console

const DataAPI = require('../../../../lib/data_api')
const dataApi = new DataAPI('memory')

// A Promise request handler
const handler = (object, promiseHandler, timeout) => {
  return function(req, res, next){
    debug('handler', req.url, process.env.NODE_ENV)
    debug('req.params',req.params)
    debug('req.params[0]',req.params[0])
    promiseHandler.call(object, req, res)
      .timeout(timeout)
      .then(data => res.json(data))
      .catch(next)
  }
}

const app_info = { 
  name: config.get('package.name'),
  version: config.get('package.version')
}
router.get('/', (req, res) => res.json({ app: app_info }) )

router.use(bodyParser.json())

router.param( 'db', dataApi.dbParamCheck() )
router.param( 'store', dataApi.storeParamCheck() )
router.param( 'entity', dataApi.entityParamCheck() )

// ### Schema

router.post(
  '/store/:store/schema', 
  handler( dataApi, dataApi.createSchema, config.get('timeout.create') )
)
   
router.get(
  '/store/:store/schema', 
  handler( dataApi, dataApi.readSchema, config.get('timeout.read') )
    //res.json({ store: data.store, action:'read', info:data.info })
)

router.patch(
  '/store/:store/schema',
  handler( dataApi, dataApi.updateSchema, config.get('timeout.update') )
)

router.put(
  '/store/:store/schema',
  handler( dataApi, dataApi.replaceSchema, config.get('timeout.replace') )
)
 // .then(result => res.json({ store: result.store, status:'updated', info:result.info }))

router.delete(
  '/store/:store/schema', 
  handler( dataApi, dataApi.deleteSchema, config.get('timeout.delete') )
//  .then(result => res.json({ store: result.store, action:'deleted', info:result.info }))
)


// ### Entity

// The following routes require an entity

router.post(
  '/store/:store/entity/:entity', 
  handler( dataApi, dataApi.create, config.get('timeout.create') )
)
    //.then(result => res.json({ action:'create', data:result.fields }))

router.get(
  '/store/:store/entity/:entity', 
  handler( dataApi, dataApi.read, config.get('timeout.read') )
)

router.patch(
  '/store/:store/entity/:entity',
  handler( dataApi, dataApi.update, config.get('timeout.update') )
)

router.put(
  '/store/:store/entity/:entity',
  handler( dataApi, dataApi.replace, config.get('timeout.update') )
)

router.delete(
  '/store/:store/entity/:entity', 
  handler( dataApi, dataApi.delete, config.get('timeout.update') )
)

// Generic API error handler
router.use(function(error, req, res, next){
  if (!error.status) error.status = 500
  if (error.status >= 500 ) logger.error('Express handled unknown error', error, error.stack)
  let response = { error: error }
  debug('err', req.url, process.env.NODE_ENV)
  if ( process.env.NODE_ENV === 'production' ) delete error.stack
  res.status(error.status).json(response)
})

// Fall back API 404
router.use(function(req,res){
  let err = Errors.HttpError.create(404)
  debug('404 handler', err.message)
  delete err.stack
  res.status(err.status).json({ error: err })
})

module.exports = router
