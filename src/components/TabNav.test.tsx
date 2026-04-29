import { render, screen, fireEvent } from '@testing-library/react'
import { TabNav } from './TabNav'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'conops', label: 'Problem & CONOPS' },
]

test('renders all tab labels', () => {
  render(<TabNav tabs={tabs} activeTab="overview" onChange={() => {}} />)
  expect(screen.getByText('Overview')).toBeInTheDocument()
  expect(screen.getByText('Problem & CONOPS')).toBeInTheDocument()
})

test('calls onChange with correct id when tab is clicked', () => {
  const onChange = vi.fn()
  render(<TabNav tabs={tabs} activeTab="overview" onChange={onChange} />)
  fireEvent.click(screen.getByText('Problem & CONOPS'))
  expect(onChange).toHaveBeenCalledWith('conops')
})

test('active tab has orange border class', () => {
  render(<TabNav tabs={tabs} activeTab="overview" onChange={() => {}} />)
  const activeBtn = screen.getByText('Overview').closest('button')
  expect(activeBtn).toHaveClass('border-orange-500')
})

test('inactive tab does not have orange border class', () => {
  render(<TabNav tabs={tabs} activeTab="overview" onChange={() => {}} />)
  const inactiveBtn = screen.getByText('Problem & CONOPS').closest('button')
  expect(inactiveBtn).not.toHaveClass('border-orange-500')
})
