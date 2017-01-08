// # Config

const {Config} = require('deployable-config')
const path = require('path')

config = Config.createInstance('deployable-data', {
  path: path.join(__dirname, '..'), 
  file: 'config.yaml',
  package: require('../package.json')
})

module.exports = config

