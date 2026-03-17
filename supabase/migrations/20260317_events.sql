-- ============================================================
-- CampusPal: Notices & Events Table
-- Run this in your ASSIGNMENTS/n8n Supabase project URL
-- ============================================================

-- 1. Create the events table
CREATE TABLE IF NOT EXISTS public.events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  deadline text NOT NULL, -- e.g. 'Mar 25'
  icon text DEFAULT 'Megaphone', -- 'Megaphone', 'Code2', 'Trophy', 'GraduationCap', 'Calendar'
  accent text DEFAULT 'neon-cyan', -- 'neon-cyan', 'neon-purple', 'neon-blue'
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Turn on Row Level Security (RLS)
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 3. Allow ANYONE to read the events (so the website can fetch them without login)
CREATE POLICY "Public can read events" 
  ON public.events 
  FOR SELECT 
  TO anon 
  USING (true);

-- 4. Enable Realtime subscriptions for this table
-- This allows the website to update instantly when n8n adds a new event
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime;
COMMIT;
ALTER PUBLICATION supabase_realtime ADD TABLE public.events;


