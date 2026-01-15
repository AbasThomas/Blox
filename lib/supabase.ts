import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!')
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local')
}

if (!supabaseServiceKey) {
  console.warn('Warning: SUPABASE_SERVICE_ROLE_KEY is missing. Server-side operations may fail due to RLS policies.')
}

// Client for browser/client-side usage
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
)

// Admin client for server-side API routes (bypasses RLS)
if (!supabaseServiceKey) {
  console.warn('⚠️ SUPABASE_SERVICE_ROLE_KEY is missing/undefined. Admin client will not funciton correctly.');
  console.log('Environment check:', {
    hasUrl: !!supabaseUrl,
    urlLength: supabaseUrl?.length,
    hasAnon: !!supabaseAnonKey,
    anonLength: supabaseAnonKey?.length,
    hasService: !!supabaseServiceKey,
    // Do NOT log the actual key for security
    serviceKeyLength: supabaseServiceKey?.length
  });
}

export const supabaseAdmin = createClient(
  supabaseUrl || '',
  supabaseServiceKey || '', // Removed fallback to anon key to fail explicitly if service key is missing
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
