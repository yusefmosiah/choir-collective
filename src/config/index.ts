interface Config {
  api: {
    url: string;
  };
  solana: {
    programId: string;
  };
}

export function getConfig(): Config {
  // Hardcode the production URL, with fallback for local development
  const apiUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : 'https://choir-collective-api.onrender.com';

  if (process.env.NODE_ENV === 'development') {
    console.log('API URL:', apiUrl);
  }

  return {
    api: {
      url: apiUrl,
    },
    solana: {
      programId: process.env.NEXT_PUBLIC_PROGRAM_ID || '11111111111111111111111111111111',
    },
  };
}
