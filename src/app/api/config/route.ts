import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    programId: process.env.NEXT_PUBLIC_PROGRAM_ID,
  });
}
