import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MultipleChoiceInput from '@/components/question/MultipleChoiceInput'
import type { MultipleChoiceQuestion } from '@/data/types'

vi.mock('lucide-react', async () => {
  const React = await import('react')
  const icon = (name: string) => (props: any) =>
    React.createElement('span', { 'data-testid': `icon-${name}`, ...props })
  return {
    Check: icon('Check'),
    X: icon('X'),
  }
})

const baseQuestion: MultipleChoiceQuestion = {
  id: 'mc-1',
  type: 'multiple-choice',
  topic: 'thermodynamics',
  subtopic: 'first-law',
  difficulty: 'beginner',
  question: 'What is the first law of thermodynamics?',
  explanation: 'Energy cannot be created or destroyed.',
  interviewInsight: 'Common interview topic.',
  commonMistake: 'Confusing with second law.',
  tags: ['thermo', 'laws'],
  options: [
    { id: 'a', text: 'Energy is conserved' },
    { id: 'b', text: 'Entropy always increases' },
    { id: 'c', text: 'Heat flows from cold to hot' },
    { id: 'd', text: 'Force equals mass times acceleration' },
  ],
  correctAnswer: 'a',
}

describe('MultipleChoiceInput', () => {
  let onSubmit: ReturnType<typeof vi.fn>

  beforeEach(() => {
    onSubmit = vi.fn()
  })

  it('renders all four options', () => {
    render(<MultipleChoiceInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)

    expect(screen.getByText('Energy is conserved')).toBeInTheDocument()
    expect(screen.getByText('Entropy always increases')).toBeInTheDocument()
    expect(screen.getByText('Heat flows from cold to hot')).toBeInTheDocument()
    expect(screen.getByText('Force equals mass times acceleration')).toBeInTheDocument()
  })

  it('renders the Submit Answer button', () => {
    render(<MultipleChoiceInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    expect(screen.getByText('Submit Answer')).toBeInTheDocument()
  })

  it('submit button is disabled until an option is selected', () => {
    render(<MultipleChoiceInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const submitBtn = screen.getByText('Submit Answer')
    expect(submitBtn).toBeDisabled()
  })

  it('selecting an option enables the submit button', () => {
    render(<MultipleChoiceInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('Energy is conserved'))
    const submitBtn = screen.getByText('Submit Answer')
    expect(submitBtn).not.toBeDisabled()
  })

  it('calls onSubmit(true) when the correct answer is selected', () => {
    render(<MultipleChoiceInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('Energy is conserved'))
    fireEvent.click(screen.getByText('Submit Answer'))
    expect(onSubmit).toHaveBeenCalledWith(true)
  })

  it('calls onSubmit(false) when a wrong answer is selected', () => {
    render(<MultipleChoiceInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('Entropy always increases'))
    fireEvent.click(screen.getByText('Submit Answer'))
    expect(onSubmit).toHaveBeenCalledWith(false)
  })

  it('hides the submit button after submission', () => {
    render(<MultipleChoiceInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('Energy is conserved'))
    fireEvent.click(screen.getByText('Submit Answer'))
    expect(screen.queryByText('Submit Answer')).not.toBeInTheDocument()
  })

  it('disables option buttons after submission', () => {
    render(<MultipleChoiceInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('Energy is conserved'))
    fireEvent.click(screen.getByText('Submit Answer'))

    const optionButtons = screen.getAllByRole('button')
    optionButtons.forEach((btn) => {
      expect(btn).toBeDisabled()
    })
  })

  it('prevents interaction when disabled prop is true', () => {
    render(<MultipleChoiceInput question={baseQuestion} disabled={true} onSubmit={onSubmit} />)
    const optionButtons = screen.getAllByRole('button').filter(btn => btn.textContent !== 'Submit Answer')
    optionButtons.forEach((btn) => {
      expect(btn).toBeDisabled()
    })
  })

  it('does not call onSubmit if no option selected and submit is clicked', () => {
    render(<MultipleChoiceInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('Submit Answer'))
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('shows check icon on correct option after submission', () => {
    render(<MultipleChoiceInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('Energy is conserved'))
    fireEvent.click(screen.getByText('Submit Answer'))
    expect(screen.getByTestId('icon-Check')).toBeInTheDocument()
  })

  it('shows X icon when wrong answer is selected after submission', () => {
    render(<MultipleChoiceInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('Entropy always increases'))
    fireEvent.click(screen.getByText('Submit Answer'))
    expect(screen.getByTestId('icon-X')).toBeInTheDocument()
    expect(screen.getByTestId('icon-Check')).toBeInTheDocument()
  })
})
