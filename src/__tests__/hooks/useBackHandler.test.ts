import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useBackHandler } from '@/hooks/useBackHandler'

describe('useBackHandler', () => {
  let pushStateSpy: ReturnType<typeof vi.spyOn>
  let addEventSpy: ReturnType<typeof vi.spyOn>
  let removeEventSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    pushStateSpy = vi.spyOn(window.history, 'pushState').mockImplementation(() => {})
    addEventSpy = vi.spyOn(window, 'addEventListener')
    removeEventSpy = vi.spyOn(window, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('pushes a history entry when active is true', () => {
    const onBack = vi.fn()
    renderHook(() => useBackHandler(true, onBack))

    expect(pushStateSpy).toHaveBeenCalledWith({ overlay: true }, '')
  })

  it('does not push history when active is false', () => {
    const onBack = vi.fn()
    renderHook(() => useBackHandler(false, onBack))

    expect(pushStateSpy).not.toHaveBeenCalled()
  })

  it('adds a popstate listener when active is true', () => {
    const onBack = vi.fn()
    renderHook(() => useBackHandler(true, onBack))

    expect(addEventSpy).toHaveBeenCalledWith('popstate', expect.any(Function))
  })

  it('does not add a popstate listener when active is false', () => {
    const onBack = vi.fn()
    renderHook(() => useBackHandler(false, onBack))

    const popstateCalls = addEventSpy.mock.calls.filter(
      ([event]) => event === 'popstate'
    )
    expect(popstateCalls).toHaveLength(0)
  })

  it('calls onBack when popstate fires', () => {
    const onBack = vi.fn()
    renderHook(() => useBackHandler(true, onBack))

    // Simulate the browser back button
    window.dispatchEvent(new PopStateEvent('popstate'))

    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('removes the popstate listener on cleanup', () => {
    const onBack = vi.fn()
    const { unmount } = renderHook(() => useBackHandler(true, onBack))

    unmount()

    const removeCalls = removeEventSpy.mock.calls.filter(
      ([event]) => event === 'popstate'
    )
    expect(removeCalls).toHaveLength(1)
  })

  it('does not push history twice on re-render with same active=true', () => {
    const onBack = vi.fn()
    const { rerender } = renderHook(
      ({ active }) => useBackHandler(active, onBack),
      { initialProps: { active: true } },
    )

    // Re-render with same active value — should not push again
    rerender({ active: true })

    // pushState should have been called only once (the initial mount)
    expect(pushStateSpy).toHaveBeenCalledTimes(1)
  })

  it('cleans up and re-activates when active toggles off then on', () => {
    const onBack = vi.fn()
    const { rerender } = renderHook(
      ({ active }) => useBackHandler(active, onBack),
      { initialProps: { active: true } },
    )

    // Turn off
    rerender({ active: false })
    // Turn on again
    rerender({ active: true })

    // Should have pushed state twice total (once for each activation)
    expect(pushStateSpy).toHaveBeenCalledTimes(2)
  })
})
