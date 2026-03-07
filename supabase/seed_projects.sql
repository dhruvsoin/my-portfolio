-- ──────────────────────────────────────────────────────────────────────────────
-- Seed: projects table
-- Paste this into Supabase → SQL Editor → New query → Run
-- ──────────────────────────────────────────────────────────────────────────────

-- Clear existing rows first (remove this line if you want to keep existing data)
DELETE FROM projects;

INSERT INTO projects (title, description, tech_stack, github_link, demo_link, featured) VALUES

(
  'EduHats-Streamlit',
  'AI-powered tool that bridges academia and industry by scraping job postings, extracting skills, and aligning educational curricula with real-world market demands.',
  ARRAY['Python', 'Streamlit', 'Groq (Llama 3.1 70B)', 'JobSpy', 'Pandas', 'PyPDF2', 'ReportLab'],
  'https://github.com/dhruvsoin/EduHats-Streamlit',
  NULL,
  TRUE
),

(
  'Expense-Tracker',
  'A command-line expense tracker built with Python and Pandas. Record, categorise, and visualise spending via CSV storage and Matplotlib charts.',
  ARRAY['Python', 'Pandas', 'Matplotlib', 'CSV File Handling'],
  'https://github.com/dhruvsoin/Expense-Tracker',
  NULL,
  FALSE
),

(
  'IntelliMap',
  'Transform messy, inconsistent data into perfect templates — automatically. Uses the Hungarian Algorithm to intelligently map source columns to target schema with minimal user input.',
  ARRAY['Python', 'Streamlit', 'SciPy', 'Pandas', 'CSV', 'Excel', 'JSON'],
  'https://github.com/dhruvsoin/IntelliMap',
  NULL,
  TRUE
),

(
  'KJU-Bot',
  'AI buddy for Kristu Jayanti University — answers student queries about the CS UG department using a RAG pipeline over university documents, powered by Groq Llama-3.3-70B.',
  ARRAY['Python', 'FAISS', 'Sentence Transformers', 'Groq (Llama-3.3-70B)', 'Streamlit', 'RAG'],
  'https://github.com/dhruvsoin/KJU-Bot',
  NULL,
  TRUE
),

(
  'Offline Bot',
  'Privacy-focused offline RAG chatbot using FAISS and Mistral-7B. All inference runs locally — no data leaves your machine.',
  ARRAY['Python', 'FAISS', 'Sentence Transformers', 'Mistral-7B-Instruct', 'GPT4All', 'pypdf', 'RAG'],
  'https://github.com/dhruvsoin/Offline_Bot',
  NULL,
  FALSE
),

(
  'Python Casino Game',
  'A production-ready web Casino Game built with Python and Streamlit. Features slot machine, roulette, and number guessing with a shared player balance and clean UI.',
  ARRAY['Python', 'Streamlit', 'Session State Management'],
  'https://github.com/dhruvsoin/Python_Casino-Game',
  NULL,
  FALSE
),

(
  'Streamlit Expense Tracker',
  'A web-based expense tracker built with Streamlit. Add expenses by category, view spending summaries, and explore interactive Matplotlib charts — all in the browser.',
  ARRAY['Python', 'Streamlit', 'Pandas', 'Matplotlib'],
  'https://github.com/dhruvsoin/streamlit-expense-tracker',
  NULL,
  FALSE
),

(
  'YOLO Posture Detector',
  'A computer vision project using YOLOv8 and OpenCV for real-time object detection and human posture classification from webcam or video input.',
  ARRAY['Python', 'YOLOv8', 'OpenCV', 'NumPy', 'Ultralytics'],
  'https://github.com/dhruvsoin/Yolo_PostureDetector',
  NULL,
  FALSE
);
