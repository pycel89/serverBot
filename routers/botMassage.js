const Router = require('express')
const router = new Router()
const botMessageGontrollers = require('../controllers/botMessageGontrollers')

router.get('/messages/:id',botMessageGontrollers.sendAll)
router.get('/token',botMessageGontrollers.getToken)
router.post('/messages',botMessageGontrollers.getMessage)

module.exports = router