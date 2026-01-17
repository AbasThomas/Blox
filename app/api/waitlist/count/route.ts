import { supabaseAdmin } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export const revalidate = 60 // Cache for 1 minute

export async function GET() {
  try {
    const { count, error } = await supabaseAdmin
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    if (error) {
      throw error
    }

    return NextResponse.json({ count: count || 0 })
  } catch (error) {
    console.error('Waitlist count error:', error)
    // Fallback gracefully without revealing error details
    return NextResponse.json({ count: 0 }, { status: 200 })
  }
}
