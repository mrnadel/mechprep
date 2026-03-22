import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EstimationInput from '@/components/question/EstimationInput'
import type { EstimationQuestion } from '@/data/types'

vi.mock('lucide-react', async () => {
  const React = await import('react')
  const icon = (name: string) => (props: any) =>
    React.createElement('span', { 'data-testid': `icon-${name}`, ...props })
  return {
    Target: icon('Target'),
    Lightbulb: icon('Lightbulb'),
    ArrowRight: icon('ArrowRight'),
  }
})

const baseQuestion: EstimationQuestion = {
  id: 'est-1',
  type: 'estimation',
  topic: 'fluid-mechanics',
  subtopic: 'flow-rates',
  difficulty: 'intermediate',
  question: 'Estimate the Reynolds number for water flowing in a pipe.',
  explanation: 'Reynolds number determines flow regime.',
  interviewInsight: 'Shows engineering intuition.',
  commonMistake: 'Forgetting to convert units.',
  tags: ['fluids', 'estimation'],
  hints: [
    'Consider the pipe diameter',
    'Use typical flow velocity',
    'Remember kinematic viscosity of water',
  ],
  acceptableRange: {
    low: 2000,
    high: 10000,
    unit: 'Re',
    bestEstimate: 5000,
  },
  approachSteps: [
    'Identify pipe diameter and flow velocity',
    'Look up kinematic viscosity',
    'Calculate Re = VD/ν',
  ],
}

const questionNoHints: EstimationQuestion = {
  ...baseQuestion,
  id: 'est-2',
  hints: [],
}

describe('EstimationInput', () => {
  let onSubmit: ReturnType<typeof vi.fn>

  beforeEach(() => {
    onSubmit = vi.fn()
  })

  it('renders the number input and unit display', () => {
    render(<EstimationInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText('Your estimate')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'number')
    expect(screen.getByText('Re')).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<EstimationInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    expect(screen.getByText(/Submit Estimate/)).toBeInTheDocument()
  })

  it('submit button is disabled when input is empty', () => {
    render(<EstimationInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const submitBtn = screen.getByText(/Submit Estimate/)
    expect(submitBtn).toBeDisabled()
  })

  it('entering a number enables the submit button', async () => {
    const user = userEvent.setup()
    render(<EstimationInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText('Your estimate')
    await user.type(input, '5000')
    expect(screen.getByText(/Submit Estimate/)).not.toBeDisabled()
  })

  it('shows hint toggle button when hints are available', () => {
    render(<EstimationInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    expect(screen.getByText('Need a hint?')).toBeInTheDocument()
  })

  it('does not show hint toggle when no hints', () => {
    render(<EstimationInput question={questionNoHints} disabled={false} onSubmit={onSubmit} />)
    expect(screen.queryByText('Need a hint?')).not.toBeInTheDocument()
  })

  it('clicking "Need a hint?" toggles hints visibility', () => {
    render(<EstimationInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('Need a hint?'))

    expect(screen.getByText('Consider the pipe diameter')).toBeInTheDocument()
    expect(screen.getByText('Use typical flow velocity')).toBeInTheDocument()
    expect(screen.getByText('Remember kinematic viscosity of water')).toBeInTheDocument()
    expect(screen.getByText('Hide hints')).toBeInTheDocument()
  })

  it('clicking "Hide hints" hides the hints', () => {
    render(<EstimationInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('Need a hint?'))
    expect(screen.getByText('Consider the pipe diameter')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Hide hints'))
    expect(screen.queryByText('Consider the pipe diameter')).not.toBeInTheDocument()
    expect(screen.getByText('Need a hint?')).toBeInTheDocument()
  })

  it('calls onSubmit(true) when value is within acceptable range', async () => {
    const user = userEvent.setup()
    render(<EstimationInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText('Your estimate')
    await user.type(input, '5000')
    fireEvent.click(screen.getByText(/Submit Estimate/))
    expect(onSubmit).toHaveBeenCalledWith(true)
  })

  it('calls onSubmit(true) when value equals the low boundary', async () => {
    const user = userEvent.setup()
    render(<EstimationInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText('Your estimate')
    await user.type(input, '2000')
    fireEvent.click(screen.getByText(/Submit Estimate/))
    expect(onSubmit).toHaveBeenCalledWith(true)
  })

  it('calls onSubmit(true) when value equals the high boundary', async () => {
    const user = userEvent.setup()
    render(<EstimationInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText('Your estimate')
    await user.type(input, '10000')
    fireEvent.click(screen.getByText(/Submit Estimate/))
    expect(onSubmit).toHaveBeenCalledWith(true)
  })

  it('calls onSubmit(false) when value is below acceptable range', async () => {
    const user = userEvent.setup()
    render(<EstimationInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText('Your estimate')
    await user.type(input, '500')
    fireEvent.click(screen.getByText(/Submit Estimate/))
    expect(onSubmit).toHaveBeenCalledWith(false)
  })

  it('calls onSubmit(false) when value is above acceptable range', async () => {
    const user = userEvent.setup()
    render(<EstimationInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText('Your estimate')
    await user.type(input, '50000')
    fireEvent.click(screen.getByText(/Submit Estimate/))
    expect(onSubmit).toHaveBeenCalledWith(false)
  })

  it('shows result feedback after submission with in-range value', async () => {
    const user = userEvent.setup()
    render(<EstimationInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText('Your estimate')
    await user.type(input, '5000')
    fireEvent.click(screen.getByText(/Submit Estimate/))

    expect(screen.getByText('Within acceptable range!')).toBeInTheDocument()
  })

  it('shows result feedback after submission with out-of-range value', async () => {
    const user = userEvent.setup()
    render(<EstimationInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText('Your estimate')
    await user.type(input, '500')
    fireEvent.click(screen.getByText(/Submit Estimate/))

    expect(screen.getByText('Outside the expected range')).toBeInTheDocument()
  })

  it('displays the range values and best estimate after submission', async () => {
    const user = userEvent.setup()
    render(<EstimationInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText('Your estimate')
    await user.type(input, '5000')
    fireEvent.click(screen.getByText(/Submit Estimate/))

    expect(screen.getByText('Low end')).toBeInTheDocument()
    expect(screen.getByText('Best estimate')).toBeInTheDocument()
    expect(screen.getByText('High end')).toBeInTheDocument()
  })

  it('shows approach steps after submission', async () => {
    const user = userEvent.setup()
    render(<EstimationInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText('Your estimate')
    await user.type(input, '5000')
    fireEvent.click(screen.getByText(/Submit Estimate/))

    expect(screen.getByText('Estimation Approach:')).toBeInTheDocument()
    baseQuestion.approachSteps.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument()
    })
  })

  it('hides submit button after submission', async () => {
    const user = userEvent.setup()
    render(<EstimationInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText('Your estimate')
    await user.type(input, '5000')
    fireEvent.click(screen.getByText(/Submit Estimate/))

    expect(screen.queryByText(/Submit Estimate/)).not.toBeInTheDocument()
  })

  it('hides hint toggle after submission', async () => {
    const user = userEvent.setup()
    render(<EstimationInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText('Your estimate')
    await user.type(input, '5000')
    fireEvent.click(screen.getByText(/Submit Estimate/))

    expect(screen.queryByText('Need a hint?')).not.toBeInTheDocument()
    expect(screen.queryByText('Hide hints')).not.toBeInTheDocument()
  })

  it('disables input when disabled prop is true', () => {
    render(<EstimationInput question={baseQuestion} disabled={true} onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText('Your estimate')
    expect(input).toBeDisabled()
  })
})
