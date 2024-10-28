import { NextResponse } from 'next/server';

// Store build time when the server starts
const BUILD_TIME = new Date().toISOString();

export async function GET() {
  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    BUILD_TIME,
    RAW_ENV: { ...process.env },
    PROCESS_CWD: process.cwd(),
    PROCESS_VERSION: process.version,
    IS_RENDER: process.env.RENDER === '1',
    HAS_ENV_LOCAL: require('fs').existsSync('.env.local'),
    HAS_ENV_PRODUCTION: require('fs').existsSync('.env.production')
  };

  return NextResponse.json(envVars);
}
