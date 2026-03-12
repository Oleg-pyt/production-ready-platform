# DevOps-Ready Platform

[![CI Build](https://github.com/benatti-io/production-ready-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/benatti-io/production-ready-platform/actions/workflows/ci.yml)
[![Docker Publish](https://github.com/benatti-io/production-ready-platform/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/benatti-io/production-ready-platform/actions/workflows/docker-publish.yml)

## Build architecture

```
api/swagger.json
      │
      ├──► openapi-generator ──► api-java (Spring interfaces + DTOs)  ─┐
      │                                                                  ├──► backend.jar  ◄── Docker image
      └──► openapi-generator ──► api npm package ──► frontend.jar     ─┘
```

One `mvn package` → one fat JAR → one Docker container.  
The JAR includes: Spring Boot backend + Angular SPA + generated API interfaces.

---

## Run via Docker (production)

### Setup environment
```bash
# Copy the example environment file
cp .env.example .env

# Adjust values if needed (default values work for local Docker)
```

### Start services
```bash
# 1. Build (once, or after any changes)
mvn -f pom.xml -DskipTests package

# 2. Start
docker compose up -d
```

Available endpoints:
| URL | Description |
|-----|-------------|
| `http://localhost:8080/` | Angular SPA |
| `http://localhost:8080/api/health` | Health check |

---

## Environment Configuration

The project uses `.env` files for configuration:

- **`.env.example`** — Template with all available variables (committed to git)
- **`.env`** — Local configuration (ignored by git, use for secrets)

### Setup for development or Docker

```bash
cp .env.example .env
```

Default values work for local Docker setup. For production, update:
- `POSTGRES_PASSWORD` — Use a strong password
- `SPRING_PROFILES_ACTIVE` — Set to `prod`
- `LOGGING_LEVEL_ROOT` — Set to `WARN`

---

## Available endpoints

### PostgreSQL
```bash
docker compose up postgres -d
```

### Backend
```bash
cd backend
mvn spring-boot:run
```

### Frontend (dev server with hot reload)
```bash
cd frontend
npm install
ng serve
```

---

## Maven profiles

| Command | npm behaviour |
|---------|---------------|
| `mvn -f pom.xml package` | `npm install` (local dev, no strict lockfile) |
| `mvn -f pom.xml -P ci package` | `npm ci` (CI/CD, strict lockfile) |


