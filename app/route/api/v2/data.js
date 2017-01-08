const router      = require('express').Router()
const bodyParser  = require('body-parser')
const _           = require('lodash')
const debug       = require('debug')('dply:data:route:api:v2:data')
const config      = require('../../../../lib/config')

router.use(bodyParser.json())

const app_info = { 
  name: config.get('package.name'),
  version: config.get('package.version')
}
router.get('/', (req, res) => res.json({ app: app_info }) )

module.exports = router

