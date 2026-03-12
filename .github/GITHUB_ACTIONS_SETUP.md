# GitHub Actions Setup Guide

## Required Secrets

For Docker publishing workflow to work, you need to set up GitHub Secrets in your repository settings.

### 1. Docker Hub Credentials

Required secrets for pushing to Docker Hub:

```
DOCKER_USERNAME   = your-docker-hub-username
DOCKER_PASSWORD   = your-docker-hub-personal-access-token
```

**How to generate Docker PAT:**
1. Go to https://hub.docker.com/settings/security
2. Create a new "Personal Access Token"
3. Copy the token and add it as `DOCKER_PASSWORD` secret

### 2. GitHub Container Registry (GHCR)

Uses `GITHUB_TOKEN` automatically (no setup needed).

Images will be pushed to: `ghcr.io/your-org/production-ready-platform`

---

## Setting up Secrets

### Via GitHub Web UI:
1. Go to **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Add each secret:
   - Name: `DOCKER_USERNAME`
   - Value: your Docker Hub username
   - Click **Add secret**
4. Repeat for `DOCKER_PASSWORD`

### Via GitHub CLI:
```bash
gh secret set DOCKER_USERNAME --body "your-username"
gh secret set DOCKER_PASSWORD --body "your-token"
```

---

## Workflows

### `docker-publish.yml` (Automatic publishing)
- **Triggers:** `push` to `main` branch
- **Actions:**
  1. Builds Maven project (with `ci` profile for strict npm lockfile)
  2. Builds Docker image
  3. Pushes to Docker Hub and GitHub Container Registry
  4. Tags: `latest`, git SHA, semver (if using git tags)

**Example:**
```bash
git push origin main
# → Workflow runs automatically
# → Image published to:
#   - docker.io/your-username/production-ready-platform:latest
#   - ghcr.io/your-org/production-ready-platform:latest
```

### `ci.yml` (Pull request validation)
- **Triggers:** `push` to any branch, `pull_request` to `main`/`develop`
- **Actions:**
  1. Runs Maven build with `ci` profile
  2. Runs all tests
  3. Builds Docker image (without push)
  4. Uploads test reports on failure

---

## Environment Variables Used

Both workflows use the `.env` file via docker-compose, but you can override via GitHub Secrets:

Current setup reads from:
- `.env` file (version controlled)
- GitHub Secrets (for credentials only)

For production deployments, use GitHub environment configurations:
```yaml
environment:
  name: production
  url: https://api.example.com
```

---

## Manual Trigger (Optional)

To add manual trigger capability, update `docker-publish.yml`:

```yaml
on:
  push:
    branches: [ main ]
  workflow_dispatch:  # Add this for manual trigger via GitHub UI
```

Then you can trigger from: **Actions → Docker Publish → Run workflow**

---

## Monitoring Workflow Runs

1. Go to **Actions** tab in your repository
2. Click on **Docker Publish** or **CI Build**
3. View logs in real-time
4. Check build status badge: Add to README:
   ```markdown
   [![CI Build](https://github.com/your-org/production-ready-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/production-ready-platform/actions/workflows/ci.yml)
   [![Docker Publish](https://github.com/your-org/production-ready-platform/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/your-org/production-ready-platform/actions/workflows/docker-publish.yml)
   ```

