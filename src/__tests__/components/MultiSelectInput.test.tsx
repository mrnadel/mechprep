import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MultiSelectInput from '@/components/question/MultiSelectInput'
import type { MultiSelectQuestion } from '@/data/types'

vi.mock('lucide-react', async () => {
  const React = await import('react')
  const icon = (name: string) => (props: any) =>
    React.createElement('span', { 'data-testid': `icon-${name}`, ...props })
  return {
    Check: icon('Check'),
    Square: icon('Square'),
    CheckSquare: icon('CheckSquare'),
  }
})

const baseQuestion: MultiSelectQuestion = {
  id: 'ms-1',
  type: 'multi-select',
  topic: 'materials-engineering',
  subtopic: 'properties',
  difficulty: 'intermediate',
  question: 'Which are properties of steel?',
  explanation: 'Steel is strong, ductile, and conductive.',
  interviewInsight: 'Know material properties.',
  commonMistake: 'Confusing hardness with toughness.',
  tags: ['materials', 'steel'],
  options: [
    { id: 'a', text: 'High tensile strength' },
    { id: 'b', text: 'Good ductility' },
    { id: 'c', text: 'Electrical insulator' },
    { id: 'd', text: 'Thermal conductor' },
  ],
  correctAnswers: ['a', 'b', 'd'],
}

describe('MultiSelectInput', () => {
  let onSubmit: ReturnType<typeof vi.fn>

  beforeEach(() => {
    onSubmit = vi.fn()
  })

  it('renders all options with "Select all that apply" label', () => {
    render(<MultiSelectInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    expect(screen.getByText('Select all that apply:')).toBeInTheDocument()
    expect(screen.getByText('High tensile strength')).toBeInTheDocument()
    expect(screen.getByText('Good ductility')).toBeInTheDocument()
    expect(screen.getByText('Electrical insulator')).toBeInTheDocument()
    expect(screen.getByText('Thermal conductor')).toBeInTheDocument()
  })

  it('submit button is disabled when nothing is selected', () => {
    render(<MultiSelectInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const submitBtn = screen.getByText('Submit Selection')
    expect(submitBtn).toBeDisabled()
  })

  it('toggling an option enables the submit button', () => {
    render(<MultiSelectInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('High tensile strength'))
    expect(screen.getByText('Submit Selection')).not.toBeDisabled()
  })

  it('toggling an option twice deselects it', () => {
    render(<MultiSelectInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('High tensile strength'))
    fireEvent.click(screen.getByText('High tensile strength'))
    expect(screen.getByText('Submit Selection')).toBeDisabled()
  })

  it('calls onSubmit(true) when exactly the correct answers are selected', () => {
    render(<MultiSelectInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('High tensile strength'))
    fireEvent.click(screen.getByText('Good ductility'))
    fireEvent.click(screen.getByText('Thermal conductor'))
    fireEvent.click(screen.getByText('Submit Selection'))
    expect(onSubmit).toHaveBeenCalledWith(true)
  })

  it('calls onSubmit(false) when an incorrect option is included', () => {
    render(<MultiSelectInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('High tensile strength'))
    fireEvent.click(screen.getByText('Good ductility'))
    fireEvent.click(screen.getByText('Electrical insulator'))
    fireEvent.click(screen.getByText('Submit Selection'))
    expect(onSubmit).toHaveBeenCalledWith(false)
  })

  it('calls onSubmit(false) when only a subset of correct answers is selected', () => {
    render(<MultiSelectInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('High tensile strength'))
    fireEvent.click(screen.getByText('Good ductility'))
    fireEvent.click(screen.getByText('Submit Selection'))
    expect(onSubmit).toHaveBeenCalledWith(false)
  })

  it('hides submit button after submission', () => {
    render(<MultiSelectInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('High tensile strength'))
    fireEvent.click(screen.getByText('Submit Selection'))
    expect(screen.queryByText('Submit Selection')).not.toBeInTheDocument()
  })

  it('disables all option buttons after submission', () => {
    render(<MultiSelectInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('High tensile strength'))
    fireEvent.click(screen.getByText('Submit Selection'))

    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled()
    })
  })

  it('prevents toggling when disabled prop is true', () => {
    render(<MultiSelectInput question={baseQuestion} disabled={true} onSubmit={onSubmit} />)
    const optionButtons = screen.getAllByRole('button').filter(
      btn => btn.textContent !== 'Submit Selection'
    )
    optionButtons.forEach((btn) => {
      expect(btn).toBeDisabled()
    })
  })

  it('shows CheckSquare icons for correct options after submission', () => {
    render(<MultiSelectInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('High tensile strength'))
    fireEvent.click(screen.getByText('Submit Selection'))
    // After submission, correct options get CheckSquare icons
    const checkSquareIcons = screen.getAllByTestId('icon-CheckSquare')
    expect(checkSquareIcons.length).toBeGreaterThanOrEqual(1)
  })
})
