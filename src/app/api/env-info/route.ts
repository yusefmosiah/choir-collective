import { NextResponse } from 'next/server';

export async function GET() {
  // Get all environment variables
  const envVars = {
    // Build environment
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    RENDER: process.env.RENDER,
    PORT: process.env.PORT,

    // Build info
    BUILD_TIME: new Date().toISOString(),

    // Raw env object
    RAW_ENV: { ...process.env },

    // Process info
    PROCESS_CWD: process.cwd(),
    PROCESS_VERSION: process.version,

    // Check if we're in Render
    IS_RENDER: process.env.RENDER === '1',

    // Check file existence
    HAS_ENV_LOCAL: require('fs').existsSync('.env.local'),
    HAS_ENV_PRODUCTION: require('fs').existsSync('.env.production')
  };

  return NextResponse.json(envVars);
}
