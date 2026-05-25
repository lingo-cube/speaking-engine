# Speaking Engine

IELTS speaking practice system — structured sentence-level shadowing with teacher-generated content.

## Project Structure

```
speaking-engine/
├── cmd/            # Go entry point (main.go)
├── internal/       # Backend (Go + Gin + GORM)
│   ├── config/     # Viper config
│   ├── handler/    # HTTP handlers (Gin)
│   ├── middleware/  # CORS, logging, errors
│   ├── model/      # GORM models
│   ├── repository/ # Database access layer
│   ├── service/    # Business logic
│   └── storage/    # File storage abstraction (OSS, mock)
├── seeds/          # Database seed data
├── frontend/       # Frontend (React + TypeScript + TailwindCSS)
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── hooks/       # Custom React hooks
│       ├── mock/        # Mock data for development
│       ├── pages/       # Page components
│       └── types/       # TypeScript type definitions
├── openspec/       # OpenSpec change artifacts
└── .github/        # GitHub Actions CI/CD workflows
```

## Development Workflow

### Git Worktree (Recommended)

Use git worktrees for feature isolation:

```bash
# Create a worktree for a new feature
git worktree add -b feature/my-feature ../speaking-engine-feature main

# Or use the built-in skill
# /using-git-worktrees
```

### Backend Development

```bash
# Run with mock storage (no MySQL needed)
STORAGE_PROVIDER=mock go run cmd/main.go

# Run with seed data
STORAGE_PROVIDER=mock go run cmd/main.go -seed

# Build
go build ./...
go vet ./...
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev          # Development server
npm run build        # Production build
npm run lint         # ESLint
npx tsc --noEmit     # Type check
```

The frontend uses **mock data** by default — no backend connection needed for UI development.

### Code Review

Before pushing, run the review skill:

```
/review
```

This checks for code quality, security issues, and consistency across changes.

## CI/CD

- **Backend CI** (`.github/workflows/backend-ci.yml`): Go lint, build, test on every push/PR to `main`
- **Frontend Deploy** (`.github/workflows/deploy.yml`): React build + deploy to GitHub Pages on push to `main`

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Backend  | Go 1.21+, Gin, GORM, MySQL, Zap     |
| Frontend | React 18, TypeScript, TailwindCSS 4 |
| Storage  | OSS-compatible (mock for dev)       |
| CI/CD    | GitHub Actions                      |
