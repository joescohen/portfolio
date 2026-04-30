import { render, screen } from '@testing-library/react'
import { SysMLDiagram } from '../SysMLDiagram'

describe('SysMLDiagram', () => {
  it('renders the four subsystem blocks', () => {
    render(<SysMLDiagram />)
    expect(screen.getByText('Tanker UAV')).toBeInTheDocument()
    expect(screen.getByText('Boom System')).toBeInTheDocument()
    expect(screen.getByText('Receiver Aircraft')).toBeInTheDocument()
    expect(screen.getByText('Refueling Controller')).toBeInTheDocument()
  })
})
