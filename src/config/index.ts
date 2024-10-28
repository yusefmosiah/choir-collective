interface Config {
  api: {
    url: string;
  };
  solana: {
    programId: string;
  };
}

export function getConfig(): Config {
  // Use environment variable with fallback for local development
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  return {
    api: {
      url: apiUrl,
    },
    solana: {
      programId: process.env.NEXT_PUBLIC_PROGRAM_ID || '11111111111111111111111111111111',
    },
  };
}
