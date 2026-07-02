const multer  = require('multer')

const path = require('path')

const fs = require('fs')


const uploadPath = process.env.UPLOAD_PATH

if(!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath,{recursive:true})
}

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,uploadPath)
    },
    filename(req,file,cb){
        const uniqueName = Date.now() + "_" + Math.round(Math.random()*1e9)+path.extname(file.originalname)
    cb(null,uniqueName)
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype !== 'application/pdf'){
        return cb(new Error("Only pdf files are allowed"))
    }
    cb(null,true)
}

module.exports = multer({
    storage,
    fileFilter,
    limits:{
        fileSize:5*1024*1024
    }
})

