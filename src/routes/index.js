const router = require('express').Router()

const uploadRoutes  = require('./upload.routes')
const chatRoutes = require('./chat.routes')
const documentRoutes = require('./document.routes')


router.use("/upload",uploadRoutes)
router.use('/chat',chatRoutes)
router.use('/document',documentRoutes)

module.exports = router