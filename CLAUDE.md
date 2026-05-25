# Speaking Engine

IELTS speaking practice system — structured sentence-level shadowing with teacher-generated content.

---

## Two Independent Projects

This repository contains **two separate projects** with clear boundaries:

|                    | Backend                        | Frontend                          |
| ------------------ | ------------------------------ | --------------------------------- |
| **Directory**      | `./` (root)                    | `./frontend/`                     |
| **Language**       | Go 1.21+                       | TypeScript 5 + React 18           |
| **Framework**      | Gin + GORM                     | Vite + TailwindCSS 4              |
| **Database**       | MySQL                          | None (mock data at dev time)      |
| **Package manager** | Go modules (`go.mod`)         | npm (`frontend/package.json`)     |
| **Dev server**     | `go run cmd/main.go`           | `npm run dev`                     |
| **Build**          | `go build ./...`               | `npm run build`                   |
| **Lint**           | `go vet ./...`                 | `npm run lint`                    |
| **Type check**     | `go vet ./...`                 | `npx tsc --noEmit`                |
| **Test**           | `go test ./...`                | —                                 |

**The frontend is fully self-contained.** It uses mock data from `frontend/src/mock/data.ts` and does not require the backend to run. The backend serves the REST API independently.

### Why a monorepo?

- Both projects share the same domain model (topics, questions, answers, chunks)
- A single PR can deliver a full-stack feature
- One CI/CD pipeline, one issue tracker, one release cycle

---

## GitHub Flow

This project follows **GitHub Flow** — a lightweight, branch-based workflow.

```
main (production)
  └── feature/my-feature (work branch)
       │
       ├── commit 1
       ├── commit 2
       └── PR → review → merge → deploy
```

### Step by step

1. **Create a feature branch from `main`**

   Use git worktrees for isolation (recommended):
   ```
   /using-git-worktrees
   ```
   This creates an isolated workspace so you can work on the feature without affecting your main checkout.

   Or manually:
   ```bash
   git checkout main && git pull
   git checkout -b feature/my-feature
   ```

2. **Work on the feature**

   Develop backend and/or frontend changes. Commit small, logical units.

3. **Review before pushing**

   Run the review skill to catch issues early:
   ```
   /review
   ```
   This checks for code quality, security issues, regressions, and consistency across the change set.

4. **Open a Pull Request against `main`**

   CI will automatically:
   - **Backend changed?** → Go lint, build, test
   - **Frontend changed?** → ESLint, TypeScript check, Vite build, preview deploy

   Fix any CI failures before requesting review.

5. **Merge to `main`**

   After approval and green CI, merge via squash or rebase.

6. **Deploy (automatic)**

   On merge to `main`:
   - Frontend deploys to GitHub Pages (`gh-pages` branch)
   - Backend is build-verified (manual deploy for now)

---

## Development

### Backend (`./`)

```bash
# Run with mock storage (no MySQL needed for dev)
STORAGE_PROVIDER=mock go run cmd/main.go

# Run with seed data (populates sample IELTS content)
STORAGE_PROVIDER=mock go run cmd/main.go -seed

# Quality checks
go build ./...
go vet ./...
go test ./...
```

### Frontend (`./frontend/`)

```bash
cd frontend

# Install dependencies (first time only)
npm install

# Development server with HMR
npm run dev

# Quality checks before commit
npm run lint
npx tsc --noEmit
npm run build
```

The frontend uses mock data by default. All pages and components work without a running backend.

---

## CI/CD Pipelines

### Backend CI (`.github/workflows/backend-ci.yml`)

**Triggers**: Push/PR to `main` when Go files change (`**.go`, `go.mod`, `go.sum`)

| Step      | On PR | On push to main |
| --------- | ----- | --------------- |
| Go lint   | ✅    | ✅              |
| Go build  | ✅    | ✅              |
| Go test   | ✅    | ✅              |

### Frontend Deploy (`.github/workflows/deploy.yml`)

**Triggers**: Push/PR to `main` when frontend files change (`frontend/**`, workflow file)

| Step        | On PR | On push to main |
| ----------- | ----- | --------------- |
| ESLint      | ✅    | ✅              |
| Type check  | ✅    | ✅              |
| Vite build  | ✅    | ✅              |
| Deploy      | —     | ✅ (gh-pages)   |

---

## Project Structure

```
speaking-engine/
│
├── Backend (Go) ────────────────────────────
│   ├── cmd/main.go              # Entry point
│   ├── internal/
│   │   ├── config/              # Viper config (env vars)
│   │   ├── handler/             # Gin HTTP handlers (REST)
│   │   ├── middleware/           # CORS, logging, errors
│   │   ├── model/               # GORM models (Topic, Question, Answer, Chunk)
│   │   ├── repository/          # Database access layer
│   │   ├── service/             # Business logic + sentence splitting
│   │   └── storage/             # File storage abstraction (OSS, mock, future S3/R2)
│   ├── seeds/                   # Sample IELTS data
│   ├── go.mod / go.sum
│
├── Frontend (React) ─────────────────────────
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/      # 8 reusable components
│   │   │   │   ├── AudioPlayer.tsx
│   │   │   │   ├── ChunkCard.tsx
│   │   │   │   ├── FrameworkTag.tsx
│   │   │   │   ├── QuestionCard.tsx
│   │   │   │   ├── RecordButton.tsx
│   │   │   │   ├── ShadowingPanel.tsx
│   │   │   │   ├── TopicCard.tsx
│   │   │   │   └── TypeTag.tsx
│   │   │   ├── hooks/           # useAudioPlayer, useRecorder
│   │   │   ├── mock/            # Mock data (15 questions with answers)
│   │   │   ├── pages/           # TopicListPage, PracticePage
│   │   │   ├── types/           # TypeScript interfaces
│   │   │   ├── App.tsx          # React Router setup
│   │   │   └── main.tsx         # Entry point
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── tsconfig.json
│
├── Shared ───────────────────────────────────
│   ├── .github/workflows/       # CI/CD pipeline definitions
│   │   ├── backend-ci.yml       # Backend: lint, build, test
│   │   └── deploy.yml           # Frontend: lint, check, build, deploy
│   ├── openspec/                # Specs, design, tasks (spec-driven workflow)
│   └── PRD.md                   # Product requirements
```

---

## Worktree Quick Reference

Create an isolated workspace before starting any feature:

```
/using-git-worktrees
```

This spawns a new git worktree, leaving your main checkout untouched.

```bash
# Manual equivalent
git worktree add -b feature/my-change ../speaking-engine-wt main
```

When the feature is done and merged, clean up:
```bash
git worktree remove ../speaking-engine-wt
git branch -d feature/my-change
```

---

## Code Review Checklist

Before opening a PR, run:
```
/review
```

Manual checklist for reviewers:
- [ ] Backend: builds, vets, tests pass
- [ ] Frontend: lint, type-check, build pass
- [ ] Mock data still works (frontend runs without backend)
- [ ] No hardcoded URLs or credentials
- [ ] New endpoints have corresponding handlers
- [ ] Storage interface is used (not direct OSS/S3 calls)
- [ ] Mobile-first responsive layout preserved
