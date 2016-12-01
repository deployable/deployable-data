const Promise     = require('bluebird')
const debug       = require('debug')('dply:data:route:api:v1:data')
const router      = require('express').Router()
const bodyParser  = require('body-parser')
const _           = require('lodash')
const Errors      = require('../../../../lib/dply-errors')
const config      = require('../../../../lib/config').instance()
const logger      = console

const DataAPI = require('../../../../lib/data_api')
const dataApi = new DataAPI()

// A Promise request handler
const handler = (object, promiseHandler, timeout) => {
  return function(req, res, next){
    promiseHandler.call(object, req, res)
      .timeout(timeout)
      .then(data => res.json(data))
      .catch(next)
  }
}


router.get('/',function(req, res){
  res.json({ app: 'data' })
})

router.param('store', DataAPI.storeParamCheck)

router.get( '/store/:store', handler(dataApi, dataApi.schema, config.get('timeout.read')) )

//    res.json({ store: data.store, action:'read', info:data.info })

router.get('/store/:store/schema', function(req, res, next){
  dataApi.schema( req.params.store ).then(function(data){
    res.json({ store: data.store, action:'read', info:data.info })
  }).timeout(config.get('timeout.read')).catch(next)
})

router.use(bodyParser.json())

router.put('/store/:store/schema', function(req, res, next){
  dataApi.schema( req.params.store )
  .then(result => res.json({ store: result.store, action:'read', info:result.info }))
  .timeout(config.get('timeout.read'))
  .catch(next)
})

router.delete('/store/:store/schema', function(req, res, next){
  dataApi.read( req.params.store, req.params.entity )
  .then(result => res.json({ store: result.store, action:'read', info:result.info }))
  .timeout(config.get('timeout.read'))
  .catch(next)
})

router.param('entity', DataAPI.entityParamCheck)

router.post(
  '/store/:store/entity/:entity', 
  handler( dataApi, dataApi.create, config.get('timeout.create') )
)
    //.then(result => res.json({ action:'create', data:result.fields }))

router.get(
  '/store/:store/entity/:entity', 
  handler( dataApi, dataApi.read, config.get('timeout.read') )
)

//   function(req, res, next){
//   dataApi.read( req.params.store, req.params.entity ).then(function(result){
//     res.json({ action:'read', data:result.fields })
//   }).timeout(config.get('timeout.read')).catch(next)
// })

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


router.use(function(error, req, res, next){
  if (!error.status){
      logger.error(error)
      error.status = 500
  }
  let response = {
    error: {
      status:   error.status,
      simple:   error.simple,
      message:  error.message,
      code:     error.code,
      field:    error.field,
      value:    error.value
    }
  }
  if ( process.env.NODE_ENV !== 'production' ) response.error.stack = error.stack
  res.status(error.status).json(response)
})

router.use(function(req,res){
  let err = Errors.HttpError.create(404)
  debug('404 handler', err.message)
  res.status(err.status).json({ error: err })
})

module.exports = router