const debug  = require('debug')('dply:data:route:api:v1:teapot')
const router = require('express').Router()

router.all( ['','/'], (req, res) => res.status(418).json({ teapot: '\n                       (\n            _           ) )\n         _,(_)._        ((\n    ___,(_______).        )\n  ,\'__.   /       \\    /\\_\n /,\' /  |""|       \\  /  /\n| | |   |__|       |,\'  /\n \\`.|                  /\n  `. :           :    /\n    `.            :.,\'\n      `-.________,-\''
}))

module.exports = router
