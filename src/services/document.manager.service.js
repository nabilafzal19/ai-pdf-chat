const documentRepository = require("./document.service");
const vectorService = require("./vector.service");

const { deleteFile } = require("../utils/file");

exports.deleteDocument = async (documentId) => {

    const document = await documentRepository.findById(documentId);

    if (!document) {
        throw new Error("Document not found.");
    }

    // Delete vectors
    await vectorService.deleteDocumentVectors(document.id);

    // Soft delete database record
    await documentRepository.softDelete(document.id);

    // Best effort cleanup
    try {
        await deleteFile(document.storage_path);
    } catch (error) {
        console.warn(
            "Unable to delete file:",
            document.storage_path
        );
    }

    return {
        success: true,
        message: "Document deleted successfully."
    };
};

exports.getDocuments = async () => {
    return await documentRepository.getDocuments();
};