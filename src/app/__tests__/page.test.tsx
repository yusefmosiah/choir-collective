import '@testing-library/jest-dom'
import { render, screen } from '../../test-utils'
import Page from '../page'

describe('Home Page', () => {
  it('should display "gm" heading', () => {
    render(<Page />)
    const heading = screen.getByRole('heading', { name: /gm/i })
    expect(heading).toBeInTheDocument()
  })
})
