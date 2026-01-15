import { createClient } from '@supabase/supabase-js'

// Helper to strip quotes if accidentally added in environment variables
const stripQuotes = (value: string | undefined) => value?.replace(/^"|"$/g, '').trim() || ''

const supabaseUrl = stripQuotes(process.env.NEXT_PUBLIC_SUPABASE_URL)
const supabaseAnonKey = stripQuotes(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
const supabaseServiceKey = stripQuotes(process.env.SUPABASE_SERVICE_ROLE_KEY)

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!')
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local')
}

// Client for browser/client-side usage
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)

// Admin client for server-side API routes (bypasses RLS)
if (!supabaseServiceKey) {
  console.warn('Warning: SUPABASE_SERVICE_ROLE_KEY is missing. Server-side operations may fail due to RLS policies.')
}

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || supabaseAnonKey, // Fallback to anon key but warned above
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
