import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import RankingInput from '@/components/question/RankingInput'
import type { RankingQuestion } from '@/data/types'

vi.mock('lucide-react', async () => {
  const React = await import('react')
  const icon = (name: string) => (props: any) =>
    React.createElement('span', { 'data-testid': `icon-${name}`, ...props })
  return {
    GripVertical: icon('GripVertical'),
    ArrowUp: icon('ArrowUp'),
    ArrowDown: icon('ArrowDown'),
    Check: icon('Check'),
    X: icon('X'),
  }
})

// Mock shuffleArray to return items in a known order (reversed) so tests are deterministic
vi.mock('@/lib/utils', async () => {
  const actual = await vi.importActual<typeof import('@/lib/utils')>('@/lib/utils')
  return {
    ...actual,
    shuffleArray: <T,>(arr: T[]): T[] => [...arr].reverse(),
  }
})

const baseQuestion: RankingQuestion = {
  id: 'rank-1',
  type: 'ranking',
  topic: 'strength-of-materials',
  subtopic: 'stress-analysis',
  difficulty: 'advanced',
  question: 'Rank these failure modes by likelihood',
  explanation: 'Fatigue is most common in cyclic loading.',
  interviewInsight: 'Know failure modes.',
  commonMistake: 'Ignoring fatigue.',
  tags: ['failure', 'ranking'],
  items: [
    { id: '1', text: 'Fatigue failure' },
    { id: '2', text: 'Buckling' },
    { id: '3', text: 'Yielding' },
  ],
  correctOrder: ['1', '2', '3'],
}

describe('RankingInput', () => {
  let onSubmit: ReturnType<typeof vi.fn>

  beforeEach(() => {
    onSubmit = vi.fn()
  })

  it('renders all ranking items', () => {
    render(<RankingInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    expect(screen.getByText('Fatigue failure')).toBeInTheDocument()
    expect(screen.getByText('Buckling')).toBeInTheDocument()
    expect(screen.getByText('Yielding')).toBeInTheDocument()
  })

  it('renders the instruction text', () => {
    render(<RankingInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    expect(screen.getByText(/Drag or use arrows to rank/)).toBeInTheDocument()
  })

  it('renders the Lock In Ranking button', () => {
    render(<RankingInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    expect(screen.getByText('Lock In Ranking')).toBeInTheDocument()
  })

  it('renders ArrowUp and ArrowDown icons for each item', () => {
    render(<RankingInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const upIcons = screen.getAllByTestId('icon-ArrowUp')
    const downIcons = screen.getAllByTestId('icon-ArrowDown')
    expect(upIcons).toHaveLength(3)
    expect(downIcons).toHaveLength(3)
  })

  it('first item up button is disabled', () => {
    render(<RankingInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    // The up buttons are rendered per item. The first item's up button should be disabled.
    const upButtons = screen.getAllByTestId('icon-ArrowUp').map(icon => icon.closest('button')!)
    expect(upButtons[0]).toBeDisabled()
  })

  it('last item down button is disabled', () => {
    render(<RankingInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    const downButtons = screen.getAllByTestId('icon-ArrowDown').map(icon => icon.closest('button')!)
    expect(downButtons[downButtons.length - 1]).toBeDisabled()
  })

  it('clicking down arrow moves an item down', () => {
    render(<RankingInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    // With the reversed mock, initial order is: Yielding(3), Buckling(2), Fatigue(1)
    // Click the first item's down arrow to swap Yielding and Buckling
    const downButtons = screen.getAllByTestId('icon-ArrowDown').map(icon => icon.closest('button')!)
    fireEvent.click(downButtons[0]!)

    // After move, re-query the items in DOM order
    const items = screen.getAllByText(/failure|Buckling|Yielding/i)
    // Buckling should now be first
    expect(items[0].textContent).toBe('Buckling')
  })

  it('clicking up arrow moves an item up', () => {
    render(<RankingInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    // With reversed mock: Yielding(3), Buckling(2), Fatigue(1)
    // Click the second item's up arrow to swap Buckling to top
    const upButtons = screen.getAllByTestId('icon-ArrowUp').map(icon => icon.closest('button')!)
    fireEvent.click(upButtons[1]!)

    const items = screen.getAllByText(/failure|Buckling|Yielding/i)
    expect(items[0].textContent).toBe('Buckling')
  })

  it('calls onSubmit(false) when order is incorrect', () => {
    render(<RankingInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    // Reversed order is wrong: [3, 2, 1] instead of [1, 2, 3]
    fireEvent.click(screen.getByText('Lock In Ranking'))
    expect(onSubmit).toHaveBeenCalledWith(false)
  })

  it('calls onSubmit(true) when order is correct after reordering', () => {
    render(<RankingInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    // Reversed: [Yielding(3), Buckling(2), Fatigue(1)]
    // Need to get to: [Fatigue(1), Buckling(2), Yielding(3)]

    // Move Fatigue (index 2) up twice to get to index 0
    const getUpButtons = () => screen.getAllByTestId('icon-ArrowUp').map(icon => icon.closest('button')!)
    fireEvent.click(getUpButtons()[2]!) // Fatigue moves from index 2 to 1
    fireEvent.click(getUpButtons()[1]!) // Fatigue moves from index 1 to 0
    // Now order is: [Fatigue(1), Yielding(3), Buckling(2)]

    // Swap Yielding(3) at index 1 with Buckling(2) at index 2
    const getDownButtons = () => screen.getAllByTestId('icon-ArrowDown').map(icon => icon.closest('button')!)
    fireEvent.click(getDownButtons()[1]!) // Yielding moves from index 1 to 2
    // Now order is: [Fatigue(1), Buckling(2), Yielding(3)] => correct!

    fireEvent.click(screen.getByText('Lock In Ranking'))
    expect(onSubmit).toHaveBeenCalledWith(true)
  })

  it('hides arrows and Lock In Ranking button after submission', () => {
    render(<RankingInput question={baseQuestion} disabled={false} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('Lock In Ranking'))
    expect(screen.queryByText('Lock In Ranking')).not.toBeInTheDocument()
    expect(screen.queryAllByTestId('icon-ArrowUp')).toHaveLength(0)
    expect(screen.queryAllByTestId('icon-ArrowDown')).toHaveLength(0)
  })
})
