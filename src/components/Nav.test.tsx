import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Nav } from './Nav'

function renderNav() {
  return render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  )
}

test('renders name', () => {
  renderNav()
  expect(screen.getByText('Joe Cohen')).toBeInTheDocument()
})

test('renders Projects link', () => {
  renderNav()
  expect(screen.getByText('Projects')).toBeInTheDocument()
})
