import '@testing-library/jest-dom'
import { render, screen } from '../../test-utils'
import Page from '../page'
import React from 'react'

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      NODE_ENV: 'test',
      NEXT_PUBLIC_API_URL: 'http://localhost:8000'
    })
  })
) as jest.Mock;

describe('Home Page', () => {
  it('should display "gm" heading', async () => {
    render(<Page />)
    const heading = await screen.findByText('gm')
    expect(heading).toBeInTheDocument()
  })

  // Clean up after each test
  afterEach(() => {
    jest.clearAllMocks()
  })
})
