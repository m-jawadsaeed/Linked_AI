# LinkedAI

LinkedAI is a full stack AI SaaS platform for end-to-end LinkedIn content generation, personalization, scheduling, and publishing.

## Monorepo Structure

- `backend/`: Express + TypeScript API, auth, AI agent pipeline, Prisma schema, BullMQ jobs, Swagger docs.
- `frontend/`: React + TypeScript Vite app, auth UI, dashboard routes, streaming generation interface.
- `docs/`: architecture and implementation notes.
- `docker-compose.yml`: one-command local stack with app services + PostgreSQL + Redis + MinIO.

## Quick Start

1. Copy environment templates:
   - `cp .env.example .env`
   - `cp backend/.env.example backend/.env`
   - `cp frontend/.env.example frontend/.env`
2. Run all services:
   - `docker compose up --build`
3. Open:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:8080`
   - Swagger: `http://localhost:8080/api-docs`

## Core Capabilities

- JWT auth with access/refresh tokens, rotation, reuse detection, token family revocation.
- RBAC middleware (`requireAuth`, `requireRole`).
- AI content generation with mentions, hashtag engine, memory enrichment, and RAG context injection.
- SSE streaming for token-by-token generation.
- LinkedIn connect, publish, and scheduling endpoints.
- Prisma schema containing all requested domain models.
- BullMQ queues for image generation, embeddings, publishing, analytics, and scheduling.