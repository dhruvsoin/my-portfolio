-- ─────────────────────────────────────────────────────────────────────────────
-- Dhruv Soin Portfolio — Supabase Database Schema
-- Run this in your Supabase project's SQL editor
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── projects ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT        NOT NULL,
  description TEXT        NOT NULL,
  tech_stack  TEXT[]      NOT NULL DEFAULT '{}',
  github_link TEXT,
  demo_link   TEXT,
  featured    BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_featured
  ON projects (featured) WHERE featured = TRUE;

CREATE INDEX IF NOT EXISTS idx_projects_created_at
  ON projects (created_at DESC);

-- ─── achievements ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS achievements (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  category    TEXT NOT NULL CHECK (category IN ('hackathon', 'award', 'internship', 'milestone', 'other')),
  date        DATE NOT NULL,
  link        TEXT
);

CREATE INDEX IF NOT EXISTS idx_achievements_date
  ON achievements (date DESC);

-- ─── experience ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS experience (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role        TEXT NOT NULL,
  company     TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date  DATE NOT NULL,
  end_date    DATE  -- NULL = "Present"
);

CREATE INDEX IF NOT EXISTS idx_experience_start
  ON experience (start_date DESC);

-- ─── experiments ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS experiments (
  id          UUID   PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT   NOT NULL,
  description TEXT   NOT NULL,
  tech_stack  TEXT[] NOT NULL DEFAULT '{}',
  link        TEXT,
  date        DATE   NOT NULL DEFAULT CURRENT_DATE
);

CREATE INDEX IF NOT EXISTS idx_experiments_date
  ON experiments (date DESC);

-- ─── blog_posts (future) ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT        NOT NULL,
  content    TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Row Level Security ───────────────────────────────────────────────────────
-- Public can read all tables; writes require service role key (admin only)

ALTER TABLE projects    ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience  ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts  ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Public read" ON projects;
DROP POLICY IF EXISTS "Public read" ON achievements;
DROP POLICY IF EXISTS "Public read" ON experience;
DROP POLICY IF EXISTS "Public read" ON experiments;
DROP POLICY IF EXISTS "Public read" ON blog_posts;

CREATE POLICY "Public read" ON projects    FOR SELECT USING (TRUE);
CREATE POLICY "Public read" ON achievements FOR SELECT USING (TRUE);
CREATE POLICY "Public read" ON experience  FOR SELECT USING (TRUE);
CREATE POLICY "Public read" ON experiments FOR SELECT USING (TRUE);
CREATE POLICY "Public read" ON blog_posts  FOR SELECT USING (TRUE);
