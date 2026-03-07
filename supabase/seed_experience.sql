-- ──────────────────────────────────────────────────────────────────────────────
-- Seed: experience table
-- Paste this into Supabase → SQL Editor → New query → Run
-- ──────────────────────────────────────────────────────────────────────────────

-- Clear existing rows first
DELETE FROM experience;

INSERT INTO experience (role, company, description, start_date, end_date) VALUES

(
  'Data Analytics Intern',
  'Sepiolite Technology Pvt Ltd',
  'Collected, cleaned, and structured multi-source datasets to ensure data accuracy; supported KPI reporting and dashboard creation.',
  '2025-07-01',
  '2025-08-31'
),

(
  'Sales Marketing Advisor',
  'Sparta Telecom',
  'Promoted landline and internet plans, converting leads, and maintaining accurate lead records in coordination with QA teams.',
  '2023-09-01',
  '2024-03-31'
),

(
  'Business Development Executive',
  'CertOcean',
  'Generated and qualified executive-level leads via LinkedIn for corporate clients and updated CRM systems to track performance.',
  '2023-06-01',
  '2023-09-30'
),

(
  'E-Commerce Intern',
  'La Chic Pick',
  'Managed order and payment data using Excel to support operations and ensured accurate data entry for inventory and trend monitoring.',
  '2023-04-01',
  '2023-06-30'
);
