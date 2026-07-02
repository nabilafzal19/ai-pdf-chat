const router = require('express').Router()

const chatController = require('../controllers/chat.controller')
router.post('/question',
    chatController.chatQuery
)

module.exports = router
