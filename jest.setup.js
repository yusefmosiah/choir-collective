import '@testing-library/jest-dom'
import 'whatwg-fetch' // Add fetch polyfill

// Mock environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_API_URL: 'http://localhost:8000',
  NODE_ENV: 'test'
}
