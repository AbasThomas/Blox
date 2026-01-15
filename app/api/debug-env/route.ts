import { NextResponse } from 'next/server'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const resendKey = process.env.RESEND_API_KEY

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    variables: {
      NEXT_PUBLIC_SUPABASE_URL: {
        defined: !!url,
        length: url?.length,
        value_preview: url ? `${url.substring(0, 8)}...` : null
      },
      NEXT_PUBLIC_SUPABASE_ANON_KEY: {
        defined: !!anonKey,
        length: anonKey?.length,
        is_service_role: anonKey?.startsWith('eyJ') ? 'JWT format detected' : 'Unknown format'
      },
      SUPABASE_SERVICE_ROLE_KEY: {
        defined: !!serviceKey,
        length: serviceKey?.length,
        // Check if it looks like a JWT
        is_jwt: serviceKey?.startsWith('eyJ'),
        value_preview: serviceKey ? `${serviceKey.substring(0, 10)}...${serviceKey.substring(serviceKey.length - 5)}` : null
      },
      RESEND_API_KEY: {
        defined: !!resendKey,
        length: resendKey?.length,
        prefix: resendKey?.startsWith('re_') ? 're_' : 'unknown'
      }
    }
  })
}
