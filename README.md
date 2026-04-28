<div align="center">

# Dhruv Soin — Portfolio

**Personal portfolio built with Next.js, Supabase, and Framer Motion.**

[![Live Site](https://img.shields.io/badge/Live%20Site-dhruvsoin.vercel.app-e5b567?style=for-the-badge&logo=vercel&logoColor=black)](https://dhruvsoin.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3fcf8e?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![CI](https://github.com/dhruvsoin/dhruv-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/dhruvsoin/dhruv-portfolio/actions/workflows/ci.yml)

</div>

---

## Overview

A dark, neo-brutalist portfolio showcasing AI & Data Science projects, achievements, work experience, and lab experiments. Content is fully dynamic — managed via Supabase with ISR (Incremental Static Regeneration), so the live site stays up-to-date without a redeploy.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 — App Router, React 19 |
| **Styling** | Tailwind CSS v4 + custom CSS design tokens |
| **Animations** | Framer Motion v12 |
| **Database** | Supabase (PostgreSQL) |
| **Email** | Resend API |
| **GitHub Stats** | Octokit REST |
| **Deployment** | Vercel |
| **CI/CD** | GitHub Actions (lint → type-check → build) |

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, about preview, featured projects, recent achievements |
| `/about` | Full bio, skills matrix, GitHub activity |
| `/projects` | All projects (featured + others) |
| `/projects/[id]` | Individual project detail |
| `/achievements` | Awards, hackathons, milestones — grouped by category |
| `/experience` | Work history timeline |
| `/lab` | Experiments & side builds |
| `/contact` | Contact form + social links |

---

## Project Structure

```
dhruv-portfolio/
├── app/                    # Next.js App Router pages & API routes
│   ├── page.tsx            # Home
│   ├── about/              # About page
│   ├── projects/           # Projects list + [id] detail
│   ├── achievements/       # Achievements page
│   ├── experience/         # Experience timeline
│   ├── lab/                # Lab / experiments
│   ├── contact/            # Contact form
│   └── api/contact/        # Contact API route (Resend)
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── home/               # Hero, AboutPreview, FeaturedProjects, RecentAchievements
│   ├── projects/           # ProjectCard
│   ├── achievements/       # AchievementCard
│   ├── github/             # GitHubStats
│   └── ui/                 # Badge, SectionHeader, AnimatedWrapper
├── lib/
│   ├── supabase/           # Client, server, and all DB queries
│   └── github.ts           # GitHub API helper
├── utils/                  # TypeScript types, cn(), formatDate()
└── public/                 # Static assets (resume.pdf, icons)
```

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/dhruvsoin/dhruv-portfolio.git
cd dhruv-portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your values — see table below

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

Copy `.env.example` → `.env.local` and fill in:

| Variable | Description | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side admin key | Supabase → Project Settings → API |
| `GITHUB_TOKEN` | GitHub Personal Access Token | GitHub → Settings → Developer settings → PAT (scope: `read:public_repo`) |
| `RESEND_API_KEY` | Email API key for contact form | [resend.com](https://resend.com) → API Keys |

> **For GitHub Actions CI:** Add the same values as repository secrets. Use `GH_API_TOKEN` for the GitHub token (since `GITHUB_TOKEN` is reserved by Actions) — the workflow maps it automatically.

---

## Deployment

Deployed on **Vercel** with automatic deploys on every push to `main`.

1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Add all environment variables in the Vercel dashboard
3. Push to `main` — Vercel handles the rest

CI runs on every push and pull request via `.github/workflows/ci.yml`:

```
Lint (ESLint) → Type-check (tsc) → Build (Next.js)
```

---

## Design

- **Dark neo-brutalist** aesthetic — `#111111` background, `#e5b567` champagne gold accent
- Offset box shadows, heavy borders, subtle noise texture overlay
- Scroll-triggered animations via `AnimatedWrapper` (Framer Motion)
- Fully responsive — sidebar nav on desktop, hamburger menu on mobile

---

<div align="center">
  <sub>Built by <a href="https://github.com/dhruvsoin">Dhruv Soin</a> · Data Science · Gen AI · Builder</sub>
</div>
