const router = require('express').Router()

const uploadController = require('../controllers/upload.controller')
const uploadMiddleware = require('../middleware/upload.middleware')
router.post('/pdf',
    uploadMiddleware.single("pdf-chat"),
    uploadController.uploadFile
)

module.exports = router
