interface Config {
  api: {
    url: string;
  };
  solana: {
    programId: string;
  };
}

// Simple synchronous config that uses environment variables
export function getConfig(): Config {
  return {
    api: {
      url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    },
    solana: {
      programId: process.env.NEXT_PUBLIC_PROGRAM_ID || '11111111111111111111111111111111',
    },
  };
}
