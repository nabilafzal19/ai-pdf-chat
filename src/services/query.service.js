
const embeddingService = require('./embedding.servive')
const vectorService = require('./vector.service')

exports. search = async (
    question
)=>{
const queryEmbedding =
await embeddingService.generateEmbedding(question);

const result =
await vectorService.searchEmbeddings(

    queryEmbedding

);

return result
}