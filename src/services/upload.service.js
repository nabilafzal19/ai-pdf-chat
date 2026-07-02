const { chunkText } = require("../utils/chunkText");
const { cleanText } = require("../utils/cleanText");
const { generateHash } = require("../utils/hash");

const pdfService = require("./pdf.service");
const embeddingService = require("./embedding.servive");
const vectorService = require("./vector.service");
const documentService = require("./document.service");

exports.saveFile = async (file) => {
    const documentHash = generateHash(file.path);

    let document = await documentService.findByHash(documentHash);

    if (document) {

        if (document.status === "READY") {
            throw new Error("Document already uploaded.");
        }

        if (document.status === "PROCESSING") {
            throw new Error("Document is already being processed.");
        }

        // Retry failed upload
        await vectorService.deleteDocumentVectors(document.id);

        await documentService.updateStatus(
            document.id,
            "PROCESSING"
        );

    } else {

        document = await documentService.createDocument({
            originalFilename: file.originalname,
            storedFilename: file.filename,
            documentHash,
            storagePath: file.path,
            pageCount: 0,
            chunkCount: 0,
            status: "PROCESSING",
        });
    }

    return processDocument(document, file);
};

async function processDocument(document, file) {

    try {

        const pdfData = await pdfService.extractText(file.path);

        const cleanTextData = cleanText(pdfData.text);

        const chunks = chunkText(cleanTextData);

        const vectors = await embeddingService.generateEmbeddings(chunks);

        await vectorService.storeEmbeddings({
            document,
            chunks,
            vectors,
            file,
        });

        await documentService.updateDocument(document.id, {
            pageCount: pdfData.pages,
            chunkCount: chunks.length,
            status: "READY",
        });

        return {
            documentId: document.id,
            filename: file.originalname,
            pages: pdfData.pages,
            totalChunks: chunks.length,
            totalVectors: vectors.length,
        };

    } catch (error) {

        await documentService.updateStatus(
            document.id,
            "FAILED"
        );

        throw error;
    }
}