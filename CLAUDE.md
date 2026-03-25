# CLAUDE.md — TaskPulse

## Repository Layout

This is a monorepo. Backend lives in `/backend`, frontend lives in `/frontend`.

## Commit Convention

Use conventional commits. Keep changes scoped to your assigned directory.

Examples:
- `feat(backend): add DELETE /tasks/:id endpoint`
- `feat(frontend): add task completion toggle`
- `fix(backend): handle missing task id`

## Boundaries

Do not modify files outside your assigned directory without coordinating with the lead.

- Backend engineer: work only in `/backend`
- Frontend engineer: work only in `/frontend`
- Lead: manages root files (`package.json`, `README.md`, `CLAUDE.md`)
