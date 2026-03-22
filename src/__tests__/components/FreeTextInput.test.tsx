import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FreeTextInput from '@/components/question/FreeTextInput'
import type { FreeTextQuestion } from '@/data/types'

vi.mock('lucide-react', async () => {
  const React = await import('react')
  const icon = (name: string) => (props: any) =>
    React.createElement('span', { 'data-testid': `icon-${name}`, ...props })
  return {
    Send: icon('Send'),
    CheckCircle: icon('CheckCircle'),
    BookOpen: icon('BookOpen'),
  }
})

const baseQuestion: FreeTextQuestion = {
  id: 'ft-1',
  type: 'free-text',
  topic: 'thermodynamics',
  subtopic: 'cycles',
  difficulty: 'intermediate',
  question: 'Explain the Carnot cycle.',
  explanation: 'The Carnot cycle is an idealized thermodynamic cycle.',
  interviewInsight: 'Very common interview question.',
  commonMistake: 'Forgetting isothermal steps.',
  tags: ['thermo', 'cycles'],
  sampleAnswer: 'The Carnot cycle consists of two isothermal and two adiabatic processes, providing maximum theoretical efficiency.',
  keyPoints: [
    'Two isothermal processes',
    'Two adiabatic processes',
    'Maximum theoretical efficiency',
  ],
}

describe('FreeTextInput', () => {
  let onSubmit: ReturnType<typeof vi.fn>

  beforeEach(() => {
    onSubmit = vi.fn()
  })

  it('renders a textarea with placeholder', () => {
    render(<FreeTextInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const textarea = screen.getByPlaceholderText(/Type your answer here/i)
    expect(textarea).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<FreeTextInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    expect(screen.getByText('Submit Answer')).toBeInTheDocument()
  })

  it('submit button is disabled when textarea is empty', () => {
    render(<FreeTextInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const submitBtn = screen.getByText('Submit Answer')
    expect(submitBtn).toBeDisabled()
  })

  it('submit button is disabled when textarea has only whitespace', async () => {
    const user = userEvent.setup()
    render(<FreeTextInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const textarea = screen.getByPlaceholderText(/Type your answer here/i)
    await user.type(textarea, '   ')
    const submitBtn = screen.getByText('Submit Answer')
    expect(submitBtn).toBeDisabled()
  })

  it('typing text enables the submit button', async () => {
    const user = userEvent.setup()
    render(<FreeTextInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const textarea = screen.getByPlaceholderText(/Type your answer here/i)
    await user.type(textarea, 'The Carnot cycle has four stages')
    expect(screen.getByText('Submit Answer')).not.toBeDisabled()
  })

  it('submitting shows the model answer', async () => {
    const user = userEvent.setup()
    render(<FreeTextInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const textarea = screen.getByPlaceholderText(/Type your answer here/i)
    await user.type(textarea, 'My answer about the Carnot cycle')
    fireEvent.click(screen.getByText('Submit Answer'))

    expect(screen.getByText('Model Answer')).toBeInTheDocument()
    expect(screen.getByText(baseQuestion.sampleAnswer)).toBeInTheDocument()
  })

  it('submitting shows the key points', async () => {
    const user = userEvent.setup()
    render(<FreeTextInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const textarea = screen.getByPlaceholderText(/Type your answer here/i)
    await user.type(textarea, 'My answer')
    fireEvent.click(screen.getByText('Submit Answer'))

    expect(screen.getByText('Key Points to Hit:')).toBeInTheDocument()
    baseQuestion.keyPoints.forEach((point) => {
      expect(screen.getByText(point)).toBeInTheDocument()
    })
  })

  it('submitting shows self-assessment buttons', async () => {
    const user = userEvent.setup()
    render(<FreeTextInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const textarea = screen.getByPlaceholderText(/Type your answer here/i)
    await user.type(textarea, 'My answer')
    fireEvent.click(screen.getByText('Submit Answer'))

    expect(screen.getByText('I covered the key points')).toBeInTheDocument()
    expect(screen.getByText('I missed important parts')).toBeInTheDocument()
  })

  it('clicking "I covered the key points" calls onSubmit(true)', async () => {
    const user = userEvent.setup()
    render(<FreeTextInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const textarea = screen.getByPlaceholderText(/Type your answer here/i)
    await user.type(textarea, 'Full answer')
    fireEvent.click(screen.getByText('Submit Answer'))
    fireEvent.click(screen.getByText('I covered the key points'))

    expect(onSubmit).toHaveBeenCalledWith(true)
  })

  it('clicking "I missed important parts" calls onSubmit(false)', async () => {
    const user = userEvent.setup()
    render(<FreeTextInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const textarea = screen.getByPlaceholderText(/Type your answer here/i)
    await user.type(textarea, 'Partial answer')
    fireEvent.click(screen.getByText('Submit Answer'))
    fireEvent.click(screen.getByText('I missed important parts'))

    expect(onSubmit).toHaveBeenCalledWith(false)
  })

  it('hides self-assessment buttons after making a choice', async () => {
    const user = userEvent.setup()
    render(<FreeTextInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const textarea = screen.getByPlaceholderText(/Type your answer here/i)
    await user.type(textarea, 'Answer')
    fireEvent.click(screen.getByText('Submit Answer'))
    fireEvent.click(screen.getByText('I covered the key points'))

    expect(screen.queryByText('I covered the key points')).not.toBeInTheDocument()
    expect(screen.queryByText('I missed important parts')).not.toBeInTheDocument()
  })

  it('does not call onSubmit on initial submit (only after self-assessment)', async () => {
    const user = userEvent.setup()
    render(<FreeTextInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const textarea = screen.getByPlaceholderText(/Type your answer here/i)
    await user.type(textarea, 'Answer')
    fireEvent.click(screen.getByText('Submit Answer'))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('hides the submit button after submission and shows model answer instead', async () => {
    const user = userEvent.setup()
    render(<FreeTextInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const textarea = screen.getByPlaceholderText(/Type your answer here/i)
    await user.type(textarea, 'Answer')
    fireEvent.click(screen.getByText('Submit Answer'))

    expect(screen.queryByText('Submit Answer')).not.toBeInTheDocument()
    expect(screen.getByText('Model Answer')).toBeInTheDocument()
  })

  it('disables the textarea when disabled prop is true', () => {
    render(<FreeTextInput question={baseQuestion} disabled={true} onSubmit={onSubmit} />)
    const textarea = screen.getByPlaceholderText(/Type your answer here/i)
    expect(textarea).toBeDisabled()
  })

  it('disables the textarea after submission', async () => {
    const user = userEvent.setup()
    render(<FreeTextInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const textarea = screen.getByPlaceholderText(/Type your answer here/i)
    await user.type(textarea, 'Answer')
    fireEvent.click(screen.getByText('Submit Answer'))

    expect(textarea).toBeDisabled()
  })
})
