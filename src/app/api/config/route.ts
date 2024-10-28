import { NextResponse } from 'next/server';

export async function GET() {
  // Get the request host to determine environment
  const isRender = process.env.RENDER === '1';

  // Use environment variables if set, otherwise construct URLs based on environment
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ||
    (isRender ? 'https://choir-collective-api.onrender.com' : 'http://localhost:8000');

  const programId = process.env.NEXT_PUBLIC_PROGRAM_ID || '11111111111111111111111111111111';

  return NextResponse.json({
    apiUrl,
    programId,
    isRender,
  });
}
