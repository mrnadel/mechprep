import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useHydration } from '@/hooks/useHydration'

describe('useHydration', () => {
  it('returns true after mount (effect runs)', () => {
    const { result } = renderHook(() => useHydration())
    // After renderHook, useEffect has already fired, so hydrated = true
    expect(result.current).toBe(true)
  })
})
