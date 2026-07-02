// CREATE TABLE documents (
//     id SERIAL PRIMARY KEY,

//     original_filename VARCHAR(255) NOT NULL,
//     stored_filename VARCHAR(255) NOT NULL,

//    CREATE UNIQUE INDEX unique_active_document_hash
// ON documents(document_hash)
// WHERE is_deleted = FALSE,

//     storage_path TEXT NOT NULL,

//     page_count INTEGER NOT NULL,
//     chunk_count INTEGER NOT NULL,

//     status VARCHAR(20) NOT NULL,

//is_deleted default false

// deleted_at

//     uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );