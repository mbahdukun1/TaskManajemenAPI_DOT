# Tasky Nest (Mini Project)

Tech: **NestJS**, **TypeORM**, **PostgreSQL**, **Redis Cache**, **Swagger**, **JWT Auth**

## Quick Start

```bash
# 1) copy env
cp .env.example .env

# 2) install deps
npm install

# 3) run in devn
npm run start:dev
```

- Swagger: http://localhost:3000/api
- Healthcheck: GET `/health`
- Login/Register: `/auth/register`, `/auth/login`

## Default Roles
- `ADMIN` and `USER` (RBAC)

## Modules
- `auth` (JWT)
- `users` (CRUD, admin-only list/delete)
- `tasks` (CRUD with transaction + audit logs)
- `integrations` (demo call to public API)
- `common` (guards, decorators, interceptors, filters)
- `cache` (Redis via CacheModule)

See `src/` for structure.
