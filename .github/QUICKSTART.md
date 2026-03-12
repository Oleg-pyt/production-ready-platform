# Quick Start: GitHub Actions CI/CD

## TL;DR Setup (5 minutes)

### 1. Add Docker Hub credentials to GitHub Secrets

```bash
# Go to: GitHub → Settings → Secrets and variables → Actions

# Add these two secrets:
DOCKER_USERNAME = your-docker-username
DOCKER_PASSWORD = your-docker-hub-pat-token
```

### 2. Push to main branch

```bash
git push origin main
```

### 3. Watch it build and publish

Go to: **GitHub → Actions** to see real-time build logs

Your Docker image will be published to:
- **Docker Hub**: `docker.io/your-username/production-ready-platform:latest`
- **GitHub Container Registry**: `ghcr.io/your-org/production-ready-platform:latest`

---

## What Happens Automatically

### On `push` to `main`:
1. ✅ Checkout code
2. ✅ Setup Java 25
3. ✅ Build with Maven (uses `ci` profile for strict npm lockfile)
4. ✅ Build Docker image
5. ✅ Push to Docker Hub & GHCR with auto-generated tags

### On `push` to any branch or `pull_request`:
1. ✅ Build and test
2. ✅ Build Docker image (no push)
3. ✅ Upload test reports if tests fail

---

## Docker Image Tags (auto-generated)

When you push to `main`:
- `latest` — latest stable
- `sha-xxxxxxx` — current commit SHA
- `main` — latest from main branch

When you create a git tag:
- `v1.0.0` — semantic version
- `1.0` — major.minor
- `1` — major only

Example:
```bash
git tag v1.0.0
git push origin v1.0.0
# → Creates tags: v1.0.0, 1.0, 1
```

---

## Manual Docker Usage

Pull and run the published image:

```bash
docker pull docker.io/your-username/production-ready-platform:latest
docker run -d \
  -p 8080:8080 \
  -e POSTGRES_HOST=your-postgres-host \
  -e POSTGRES_PASSWORD=your-password \
  docker.io/your-username/production-ready-platform:latest
```

---

## Troubleshooting

### "Docker push failed: 401 Unauthorized"
→ Check `DOCKER_PASSWORD` is a valid Personal Access Token (not your main password)

### "Maven build failed"
→ Check `.github/workflows/docker-publish.yml` logs for details
→ Common cause: missing dependencies or compilation errors

### "Image not pushed but build succeeded"
→ Only `main` branch triggers push
→ Other branches only build locally (for PR validation)

---

## See Also

- [GitHub Actions Setup Guide](./.github/GITHUB_ACTIONS_SETUP.md) — Detailed configuration
- [README.md](../README.md) — Main project documentation
- [.env.example](../.env.example) — Environment variables

