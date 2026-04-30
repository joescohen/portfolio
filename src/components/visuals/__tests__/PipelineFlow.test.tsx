import { render, screen } from '@testing-library/react'
import { PipelineFlow } from '../PipelineFlow'

describe('PipelineFlow', () => {
  it('renders all five pipeline stages', () => {
    render(<PipelineFlow />)
    expect(screen.getByText('Conductor')).toBeInTheDocument()
    expect(screen.getByText('Spec Agent')).toBeInTheDocument()
    expect(screen.getByText('Matrix Agent')).toBeInTheDocument()
    expect(screen.getByText(/Executor/)).toBeInTheDocument()
    expect(screen.getByText('Reporter')).toBeInTheDocument()
  })
})
