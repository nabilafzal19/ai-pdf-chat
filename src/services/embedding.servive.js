
const {openAiclient} = require('../config/openai')

const generateEmbedding = async (text) => {
    const response = await openAiclient.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
    });

    return response.data[0].embedding;
};

const generateEmbeddings = async (chunks) => {

    const vectors = [];

    for (const chunk of chunks) {

        const embedding =
            await generateEmbedding(chunk.text);

        vectors.push({
            chunkId: chunk.id,
            vector: embedding
        });

    }

    return vectors;
};

module.exports = {
    generateEmbedding,
    generateEmbeddings
};