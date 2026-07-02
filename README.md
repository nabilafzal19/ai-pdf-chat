# ai-pdf-chat


# PDF Chat AI (RAG)

An AI-powered document question answering system that implements a complete Retrieval-Augmented Generation (RAG) pipeline using Node.js, PostgreSQL, ChromaDB, and OpenAI Embeddings.

The application processes PDF documents, generates vector embeddings, stores semantic representations in a vector database, and retrieves relevant context to produce grounded responses from a Large Language Model (LLM). The project emphasizes a modular architecture with clear separation between document management, vector storage, and retrieval workflows.

---

# Features

## Document Management

- PDF upload
- SHA-256 based duplicate detection
- Retry processing for failed documents
- Soft delete support
- Document listing
- Automatic processing status tracking

Document states:

- PROCESSING
- READY
- FAILED

---

## AI Pipeline

- PDF text extraction
- Text preprocessing and normalization
- Configurable text chunking
- OpenAI embedding generation
- Vector storage in ChromaDB
- Semantic similarity search
- Retrieval-Augmented Generation (RAG)
- Context-aware response generation using LLMs

---

## Storage Layer

### PostgreSQL

Stores application metadata including:

- Document information
- Upload status
- SHA-256 document hash
- Page count
- Chunk count
- Processing timestamps
- Soft delete information

### ChromaDB

Stores vector embeddings for semantic retrieval.

Each vector contains metadata linking it to the corresponding document in PostgreSQL, enabling efficient document management while maintaining separation between transactional and vector storage.

---

## Infrastructure

- Dockerized PostgreSQL
- Dockerized ChromaDB
- Environment-based configuration
- Modular service architecture

---

# Technology Stack

## Backend

- Node.js
- Express.js

## AI

- OpenAI Embeddings API
- ChromaDB
- Retrieval-Augmented Generation (RAG)

## Database

- PostgreSQL

## Infrastructure

- Docker
- Docker Compose

---

# Architecture

```text
                Upload PDF
                     │
                     ▼
             Generate SHA-256 Hash
                     │
                     ▼
          Duplicate Document Check
                     │
         ┌───────────┴────────────┐
         │                        │
         ▼                        ▼
    Duplicate                 New Upload
         │                        │
         ▼                        ▼
      Reject             Extract PDF Text
                                  │
                                  ▼
                           Clean Text
                                  │
                                  ▼
                          Text Chunking
                                  │
                                  ▼
                    Generate Embeddings
                                  │
                                  ▼
                     Store in ChromaDB
                                  │
                                  ▼
              Store Metadata in PostgreSQL
                                  │
                                  ▼
                           Status = READY
```

---

# Project Structure

```text
src
│
├── config
├── controllers
├── middleware
├── routes
├── services
├── utils
└── uploads
```

---

# System Design

## Duplicate Detection

Every uploaded document is hashed using SHA-256 before processing.

The hash is stored in PostgreSQL and checked against existing active documents to prevent duplicate uploads.

A partial unique index allows previously soft-deleted documents to be uploaded again without violating uniqueness constraints.

---

## Data Storage Strategy

The system separates transactional data from vector storage.

### PostgreSQL

Responsible for:

- Document metadata
- Upload lifecycle
- Processing status
- Business logic

### ChromaDB

Responsible for:

- Vector embeddings
- Semantic retrieval
- Similarity search

This separation enables independent scaling of relational and vector storage while simplifying maintenance.

---

## Deletion Workflow

Document deletion follows a hybrid strategy:

- Soft delete document metadata in PostgreSQL
- Permanently remove embeddings from ChromaDB
- Delete the uploaded PDF from local storage

This approach preserves audit history while ensuring deleted documents are excluded from retrieval operations.

---

# Current Capabilities

- PDF upload and management
- Duplicate detection using SHA-256
- OpenAI embedding generation
- Semantic vector search
- ChromaDB integration
- PostgreSQL metadata management
- Retrieval-Augmented Generation (RAG)
- Soft delete workflow
- Retry failed document processing
- Docker-based local deployment

---

# Roadmap

Planned enhancements include:

- Background processing with job queues
- Streaming LLM responses
- Hybrid search (keyword + semantic retrieval)
- Metadata filtering during retrieval
- Incremental embedding updates
- Multi-document retrieval
- Evaluation and benchmarking pipeline
- LangGraph orchestration workflows
- Agentic document processing
- Multi-tenant architecture
- Cloud object storage integration (Amazon S3)
- Production deployment with container orchestration

---

# Engineering Highlights

- Manual implementation of the Retrieval-Augmented Generation (RAG) pipeline without high-level orchestration frameworks
- Separation of transactional and vector storage
- SHA-256 based duplicate detection
- Metadata-driven document lifecycle management
- Modular service-oriented architecture
- Soft delete implementation with PostgreSQL partial unique indexing
- Dockerized development environment
- Scalable architecture for production-grade document intelligence systems

---

# Author

**Nabil Afzal**

AI Engineer | Backend Engineer

Focused on building scalable AI systems, Retrieval-Augmented Generation (RAG) applications, vector search pipelines, LLM integrations, and production-ready backend architectures.
