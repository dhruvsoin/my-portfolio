# Dhruv Soin — Portfolio

Personal portfolio website built with **Next.js 16**, **Tailwind CSS v4**, and **Supabase**.

Live site → [dhruvsoin.vercel.app](https://dhruvsoin.vercel.app) *(update once deployed)*

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 + vanilla CSS design tokens |
| Animations | Framer Motion |
| Database | Supabase (PostgreSQL) |
| Email | Resend API |
| GitHub API | Octokit REST |
| Deployment | Vercel |
| CI/CD | GitHub Actions |

---

## Project Structure

```
app/
  page.tsx              # Home
  about/page.tsx        # About
  projects/page.tsx     # Projects list
  projects/[id]/        # Project detail
  achievements/page.tsx # Achievements
  experience/page.tsx   # Experience
  lab/page.tsx          # Lab / Experiments
  contact/page.tsx      # Contact form
  api/contact/route.ts  # Contact form API (Resend)
components/
  layout/               # Navbar, Footer
  home/                 # Hero, AboutPreview, FeaturedProjects, etc.
  projects/             # ProjectCard
  achievements/         # AchievementCard
  github/               # GitHubStats
  ui/                   # Badge, SectionHeader, AnimatedWrapper
lib/supabase/           # Supabase client + server helpers + queries
utils/                  # Types, formatDate, cn
```

---

## Local Development

```bash
# 1. Clone
git clone https://github.com/dhruvsoin/dhruv-portfolio.git
cd dhruv-portfolio

# 2. Install
npm install

# 3. Environment variables — copy the example and fill in your values
cp .env.example .env.local

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API |
| `GITHUB_TOKEN` | GitHub → Settings → Developer settings → Personal access tokens |
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys |

---

## Deployment (Vercel)

1. Push repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Add all environment variables from the table above
4. Deploy — Vercel auto-detects Next.js

CI runs on every push to `main` via `.github/workflows/ci.yml` (lint → type-check → build).
