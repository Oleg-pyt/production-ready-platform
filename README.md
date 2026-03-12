# DevOps-Ready Platform

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
| `http://localhost:8080/swagger-ui/index.html` | Swagger UI |

---

## Local development

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


