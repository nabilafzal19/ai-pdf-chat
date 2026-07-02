const router = require('express').Router()

const documentController = require('../controllers/document.controller')

router.get(
    "/",
    documentController.getDocuments
);

router.delete('/:id',
    documentController.deleteDocument
)



module.exports = router
