var router = require('express').Router()

router.get('/',function(req,res){
  res.json({message:'hello'})
})

module.exports = router
