# LinkedAI Architecture

## Backend

- Express API in TypeScript strict mode.
- Layered structure: routes -> controllers -> services -> repositories.
- JWT auth with refresh token family controls.
- AI agent orchestration under `backend/ai` with tools for hashtags, mentions, memory, and RAG.
- SSE endpoint for streaming generation.
- BullMQ queues for background processing.
- Prisma schema with normalized relational models.

## Frontend

- React 19 + TypeScript + Vite.
- Route-based pages for landing, auth, dashboard, generator, history, analytics, schedule, profile, and settings.
- Zustand for auth state.
- TanStack Query for server-state management.
- Streaming generation client with cancellable fetch.

## Infrastructure

- Docker compose stack includes frontend, backend, PostgreSQL, Redis, and MinIO.
- Swagger docs available at `/api-docs`.