import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  };

  const status = Object.entries(envVars).reduce((acc, [key, value]) => {
    acc[key] = {
      exists: !!value,
      preview: value ? `${value.substring(0, 5)}...` : null,
    };
    return acc;
  }, {} as Record<string, { exists: boolean; preview: string | null }>);

  console.log('--- DEBUG ENV VARS ---');
  console.log(JSON.stringify(status, null, 2));
  console.log('----------------------');
  console.log("RESEND KEY:", process.env.RESEND_API_KEY ? "FOUND" : "MISSING");

  return NextResponse.json(status);
}
