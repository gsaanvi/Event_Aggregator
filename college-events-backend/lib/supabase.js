const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  throw new Error('Missing env var SUPABASE_URL');
}

if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing env var SUPABASE_SERVICE_ROLE_KEY');
}

// Service role key bypasses RLS so the backend can do admin operations.
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

module.exports = { supabase };

