import { render, screen } from '@testing-library/react'
import { HelicopterProfile } from '../HelicopterProfile'

describe('HelicopterProfile', () => {
  it('renders the performance callouts', () => {
    render(<HelicopterProfile />)
    expect(screen.getByText('135 kt')).toBeInTheDocument()
    expect(screen.getByText('50 kg payload')).toBeInTheDocument()
    expect(screen.getByText('1st Place VFS')).toBeInTheDocument()
  })
})
