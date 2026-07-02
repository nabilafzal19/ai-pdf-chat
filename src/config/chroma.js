const { ChromaClient } = require("chromadb");

const chromaClient = new ChromaClient({
     host: process.env.CHROMA_HOST,
    port: Number(process.env.CHROMA_PORT),
    ssl: false,
});

module.exports = chromaClient;