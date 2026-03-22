import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSubscriptionStore } from '@/hooks/useSubscription'

// Mock next-auth/react
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => ({ status: 'authenticated', data: { user: { id: '1' } } })),
}))

describe('useSubscriptionStore', () => {
  beforeEach(() => {
    // Reset the store to defaults before each test
    const { result } = renderHook(() => useSubscriptionStore())
    act(() => {
      result.current.reset()
    })
  })

  it('starts with free tier and active status', () => {
    const { result } = renderHook(() => useSubscriptionStore())
    expect(result.current.tier).toBe('free')
    expect(result.current.status).toBe('active')
    expect(result.current.hasFetched).toBe(false)
    expect(result.current.isLoading).toBe(false)
  })

  it('reset() restores default state', () => {
    const { result } = renderHook(() => useSubscriptionStore())
    act(() => {
      result.current.setDebugTierOverride('pro')
    })
    expect(result.current.debugTierOverride).toBe('pro')

    act(() => {
      result.current.reset()
    })
    expect(result.current.debugTierOverride).toBeNull()
    expect(result.current.tier).toBe('free')
  })

  it('setDebugTierOverride sets the override', () => {
    const { result } = renderHook(() => useSubscriptionStore())
    act(() => {
      result.current.setDebugTierOverride('pro')
    })
    expect(result.current.debugTierOverride).toBe('pro')
  })

  it('setDebugTierOverride(null) clears the override', () => {
    const { result } = renderHook(() => useSubscriptionStore())
    act(() => {
      result.current.setDebugTierOverride('pro')
    })
    act(() => {
      result.current.setDebugTierOverride(null)
    })
    expect(result.current.debugTierOverride).toBeNull()
  })

  it('fetch() updates store on successful response', async () => {
    const mockSubscription = {
      tier: 'pro',
      status: 'active',
      billingInterval: 'month',
      currentPeriodEnd: '2026-04-22',
      trialEnd: null,
      cancelAtPeriodEnd: false,
    }

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ subscription: mockSubscription }),
    }) as any

    const { result } = renderHook(() => useSubscriptionStore())

    await act(async () => {
      await result.current.fetch()
    })

    expect(result.current.tier).toBe('pro')
    expect(result.current.status).toBe('active')
    expect(result.current.billingInterval).toBe('month')
    expect(result.current.hasFetched).toBe(true)
    expect(result.current.isLoading).toBe(false)
  })

  it('fetch() stays on free tier when request fails', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error')) as any

    const { result } = renderHook(() => useSubscriptionStore())

    await act(async () => {
      await result.current.fetch()
    })

    expect(result.current.tier).toBe('free')
    expect(result.current.isLoading).toBe(false)
  })

  it('fetch() stays on free tier when response is not ok', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
    }) as any

    const { result } = renderHook(() => useSubscriptionStore())

    await act(async () => {
      await result.current.fetch()
    })

    expect(result.current.tier).toBe('free')
    expect(result.current.isLoading).toBe(false)
  })
})
