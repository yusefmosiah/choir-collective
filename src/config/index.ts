interface Config {
  api: {
    url: string;
  };
  solana: {
    programId: string;
  };
}

async function loadConfig(): Promise<Config> {
  // Default values for SSR
  const defaults = {
    api: {
      url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    },
    solana: {
      programId: process.env.NEXT_PUBLIC_PROGRAM_ID || '11111111111111111111111111111111',
    },
  };

  // Only fetch config in browser
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/api/config');
      if (!response.ok) {
        throw new Error(`Config endpoint returned ${response.status}`);
      }
      const data = await response.json();

      // Log the received configuration in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Loaded config:', data);
      }

      return {
        api: {
          url: data.apiUrl || defaults.api.url,
        },
        solana: {
          programId: data.programId || defaults.solana.programId,
        },
      };
    } catch (error) {
      console.warn('Failed to load config, using defaults:', error);
    }
  }

  return defaults;
}

// Export a function to get config instead of the config directly
export async function getConfig(): Promise<Config> {
  return await loadConfig();
}
