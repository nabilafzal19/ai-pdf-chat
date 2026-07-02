const uploadeService = require('../services/upload.service')

const { generateHash } = require("../utils/hash");
const documentService = require("../services/document.service");

exports.uploadFile = async(req,res,next)=>{
    try {
        const result = await uploadeService.saveFile(req.file)
            return  res.status(200).json(result)
    } catch (error) {
        next(error)
    }

}