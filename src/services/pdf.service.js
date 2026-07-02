const fs = require('fs')

const pdf = require('pdf-parse');

const extractText = async(filePath)=>{
    
    const buffer = fs.readFileSync(filePath)
    const data = await pdf(buffer);

    return{
        pages :data.numpages,
        text  : data.text
    }
    
}

module.exports={
    extractText
}