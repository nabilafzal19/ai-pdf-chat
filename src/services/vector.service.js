const chromaClient = require('../config/chroma')

const COLLECTION_NAME = "pdf-chat";


exports. getCollection = async () => {

    return await chromaClient.getOrCreateCollection({
        name: COLLECTION_NAME,
        embeddingFunction: null
    });
    return collection
};

exports.storeEmbeddings = async({
    document,
    chunks,
    vectors,
    file
})=>{
    const collection = await this.getCollection()

    const ids = [];
    const documents = [];
    const embeddings = [];
    const metadatas = [];

    for(let i=0;i<chunks.length;i++){


           ids.push(
            `${document.id}_${chunks[i].id}`
        );
        documents.push(chunks[i].text)
        embeddings.push(vectors[i].vector)

          metadatas.push({
            filename: file.filename,
            chunkId: chunks[i].id,
            wordCount: chunks[i].wordCount,
            documentId:document.id,
            startWord: chunks[i].startWord,
            endWord: chunks[i].endWord
        });

    }
 await collection.add({

        ids,

        embeddings,

        documents,

        metadatas

    });

     return ids.length;

}

exports. clearCollection = async () => {

    await chromaClient.deleteCollection({
        name: COLLECTION_NAME
    });

};

exports. searchEmbeddings = async (
    embedding,
    limit = 3
)=>{
const collection =
await this.getCollection();

const result =
await collection.query({

    queryEmbeddings:[
        embedding
    ],

    nResults:limit,

    include:[
        "documents",
        "metadatas",
        "distances"
    ]

});

return result
}

exports. deleteDocumentVectors = async (documentId) => {
    const collection = await this.getCollection();

    await collection.delete({
        where: {
            documentId,
        },
    });
};

