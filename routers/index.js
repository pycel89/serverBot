const Router = require('express')
const router = new Router()
const botMassage = require('./botMassage')

router.use('/botMassage',botMassage)

module.exports = router