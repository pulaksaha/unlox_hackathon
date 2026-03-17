import { createClient } from '@supabase/supabase-js';

// This client connects to the ASSIGNMENTS Supabase project (n8n data source)
const ASSIGNMENTS_URL = import.meta.env.VITE_ASSIGNMENTS_SUPABASE_URL;
const ASSIGNMENTS_KEY = import.meta.env.VITE_ASSIGNMENTS_SUPABASE_KEY;

export const assignmentsClient = createClient(ASSIGNMENTS_URL, ASSIGNMENTS_KEY);
