const documentManager = require("../services/document.manager.service");

exports.deleteDocument = async (req, res, next) => {

    try {

        const result = await documentManager.deleteDocument(
            Number(req.params.id)
        );

        res.json(result);

    } catch (error) {

        next(error);

    }

};

exports.getDocuments = async (req, res, next) => {

    try {

        const documents = await documentManager.getDocuments();

        res.status(200).json({
            success: true,
            data: documents
        });

    } catch (error) {

        next(error);

    }

};