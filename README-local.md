# Midjourney API - NestJS Wrapper

Production-ready NestJS backend for Midjourney image generation. Perfect for SaaS, mobile apps, and automation workflows.

[![NestJS](https://img.shields.io/badge/NestJS-10-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- 🎨 **Image Generation** - Text-to-image with Midjourney
- 📊 **Job Tracking** - Real-time status monitoring
- ⚡ **High Performance** - Built on NestJS for scalability
- 🔐 **Secure** - Rate limiting and validation
- 📚 **API Docs** - Interactive Swagger documentation
- 🐳 **Docker Ready** - Complete containerization
- 🚀 **Deploy Anywhere** - Railway, Vercel, AWS, GCP

## 🚀 Quick Start

### With Docker

```bash
# 1. Clone and configure
git clone https://github.com/sham435/midjourney-api.git
cd midjourney-api
cp .env.example .env
# Edit .env with your Midjourney API key

# 2. Start with Docker Compose
docker-compose up -d

# 3. Access API
open http://localhost:3000/api/docs
```

### Manual Setup

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Build for production
npm run build
npm run start:prod
```

## 📡 API Endpoints

### Generate Image

```bash
POST /api/generate
Content-Type: application/json

{
  "prompt": "cyberpunk cityscape, neon lights, dramatic",
  "seed": 12345,
  "stylize": 100
}
```

**Response:**
```json
{
  "jobId": "job_1733428800000",
  "status": "queued",
  "prompt": "cyberpunk cityscape...",
  "createdAt": "2025-12-05T21:00:00.000Z",
  "estimatedTime": 60
}
```

### Check Status

```bash
GET /api/status/:jobId
```

**Response:**
```json
{
  "jobId": "job_1733428800000",
  "status": "completed",
  "progress": 100,
  "imageUrl": "https://cdn.midjourney.com/...",
  "completedAt": "2025-12-05T21:01:00.000Z"
}
```

### Health Check

```bash
GET /api/health
```

## ⚙️ Configuration

Create `.env` file:

```env
# Required
MJ_API_KEY=your_midjourney_api_key
JWT_SECRET=your_secret_key_min_32_chars

# Optional
PORT=3000
NODE_ENV=production
MJ_API_URL=https://api.midjourney.com/v1
REDIS_URL=redis://localhost:6379
```

## 🚢 Deployment

### Railway

```bash
# Install CLI
npm install -g @railway/cli

# Deploy
railway login
railway up
```

### Docker

```bash
docker build -t midjourney-api .
docker run -p 3000:3000 \
  -e MJ_API_KEY=your_key \
  -e JWT_SECRET=your_secret \
  midjourney-api
```

### Vercel

```bash
npm install -g vercel
vercel deploy
```

## 📚 Documentation

Interactive API documentation: `http://localhost:3000/api/docs`

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

## 📁 Project Structure

```
src/
├── modules/
│   ├── generate/     # Image generation
│   ├── status/       # Job tracking
│   └── health/       # Health checks
├── common/           # Shared utilities
├── config/           # Configuration
└── main.ts          # Bootstrap
```

## 🔒 Security

- ✅ Input validation with class-validator
- ✅ Rate limiting (10 req/min default)
- ✅ Environment validation
- ✅ CORS configuration
- ✅ Security headers

## 📄 License

MIT © [sham435](https://github.com/sham435)

---

Built with [NestJS](https://nestjs.com/) 🚀
