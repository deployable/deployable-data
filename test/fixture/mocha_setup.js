global.chai = require('chai')
global.chai.use(require('chai-as-promised'))
global.expect = global.chai.expect
global.sinon = require('sinon')

process.env.NODE_ENV = 'test'
