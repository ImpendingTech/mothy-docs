---
title: "Documents and Answers"
description: "How Mothy ingests documents, retrieves relevant passages with hybrid search, and keeps answers grounded. Covers formats, ownership on ingest, chunking, retrieval, the grounding discipline, and evaluation."
---

Mothy's core job is to answer from your documents. This page covers how content
gets in and how answers stay grounded.

## Ingesting documents

Put files in `./data` and run `npm run ingest`. Structure-preserving extraction
handles PDF, Word (via mammoth, so headings, lists, and tables survive), `.txt`,
and `.md`. PDF table reconstruction is best-effort; a document with important
tables, such as a fee schedule, is better ingested as `.docx` or `.md`.

State ownership explicitly at ingest time:

- `npm run ingest -- --owner <user>` ingests into that user's private corpus.
- `npm run ingest -- --shared` ingests into the common corpus that every user can
  read.

After changing the corpus, build the indexes with `npm run db:index`.

## How retrieval works

Retrieval is hybrid. A semantic search over vector embeddings (pgvector, HNSW
cosine index) runs alongside a keyword search over Postgres full-text (a GIN
index), and the two result sets are fused with Reciprocal Rank Fusion. Semantic
search finds passages that mean the same thing in different words; keyword search
anchors on exact terms and figures. Fusing them is more reliable than either
alone.

Content is chunked structure-first: it splits into semantic blocks such as
headings, paragraphs, lists, and tables, keeps tables whole, tags each chunk with
its heading trail, and falls back to sentence boundaries only for oversized
paragraphs. Embeddings are produced locally by Ollama.

## The grounding discipline

The prompt that produces answers is deliberately strict. Mothy answers only from
the retrieved passages, quotes figures exactly, gives both the components and the
total for a structured answer, says plainly when something is not in the
documents, and never invents a figure. The web UI carries a sources block, ready
to show the grounding passages behind an answer.

## Evaluation

Answer quality is measured, not assumed. A scored evaluation set is the yardstick
for any change to retrieval, the prompt, or the model (`npm run eval`). A
fostering evaluation set adds a repeatable pass-or-fail check, including a guard
against a wrong-band answer and a check that Mothy refuses to invent a figure the
documents do not contain (`npm run eval:fostering`).

## Related

- [Core concepts](./concepts.md)
- [Commands](./commands.md)
