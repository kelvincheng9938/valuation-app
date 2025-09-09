import { NextResponse } from 'next/server'
import { forceAddProUser } from '@/lib/subscription'

export async function POST(request) {
  try {
    const { email, reason } = await request.json()
    const result = await forceAddProUser(email, reason)
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
