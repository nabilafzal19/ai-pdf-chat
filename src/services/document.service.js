const pool = require("../config/postgres");

const findByHash = async (documentHash) => {
  const result = await pool.query(
    `SELECT * FROM documents WHERE document_hash = $1 AND is_deleted = FALSE`,
    [documentHash]
  );

  return result.rows[0];
};

const createDocument = async (document) => {
  const result = await pool.query(
    `
    INSERT INTO documents
    (
      original_filename,
      stored_filename,
      document_hash,
      storage_path,
      page_count,
      chunk_count,
      status
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *;
    `,
    [
      document.originalFilename,
      document.storedFilename,
      document.documentHash,
      document.storagePath,
      document.pageCount,
      document.chunkCount,
      document.status,
    ]
  );

  return result.rows[0];
};

const updateStatus = async (id, status) => {
  const result = await pool.query(
    `
    UPDATE documents
    SET status = $1
    WHERE id = $2
    RETURNING *;
    `,
    [status, id]
  );

  return result.rows[0];
};

const updateDocument = async (id, data) => {

    const result = await pool.query(
        `
        UPDATE documents
        SET
            page_count = $1,
            chunk_count = $2,
            status = $3
        WHERE id = $4
        RETURNING *;
        `,
        [
            data.pageCount,
            data.chunkCount,
            data.status,
            id,
        ]
    );

    return result.rows[0];
};

const findById = async (id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM documents
        WHERE id = $1
        AND is_deleted = FALSE
        `,
        [id]
    );

    return result.rows[0];
};

const softDelete = async (id) => {

    const result = await pool.query(
        `
        UPDATE documents
        SET
            is_deleted = TRUE,
            deleted_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *;
        `,
        [id]
    );

    return result.rows[0];
};

const getDocuments = async () => {

    const result = await pool.query(
        `
        SELECT
            id,
            original_filename,
            page_count,
            chunk_count,
            status,
            uploaded_at
        FROM documents
        WHERE is_deleted = FALSE
        ORDER BY uploaded_at DESC
        `
    );

    return result.rows;
};

module.exports = {
  findByHash,
  createDocument,
  updateStatus,
  updateDocument,
  findById,
  softDelete,
  getDocuments
};