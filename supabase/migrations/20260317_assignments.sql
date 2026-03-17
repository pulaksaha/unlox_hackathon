-- ============================================================
-- CampusPal: Assignments Table (synced from n8n)
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Create the assignments table (matches your other project's schema)
CREATE TABLE IF NOT EXISTS public.assignments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  type        TEXT,                          -- e.g. "Quiz", "Lab", "Project"
  deadline    TIMESTAMPTZ,
  link        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;

-- Policy: All logged-in users can view assignments
CREATE POLICY "Authenticated users can view assignments"
  ON public.assignments
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Service role (n8n) can insert/update/delete
CREATE POLICY "Service role can manage assignments"
  ON public.assignments
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
