import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import useDebounce from '../useDebounce'

describe('useDebounce', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should return the initial value immediately', () => {
		const { result } = renderHook(() => useDebounce('initial', 500))
		expect(result.current).toBe('initial')
	})

	it('should return the debounced value after the delay', () => {
		const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
			initialProps: { value: 'initial', delay: 500 },
		})

		expect(result.current).toBe('initial')

		act(() => {
			rerender({ value: 'updated', delay: 500 })
		})

		// Fast-forward time by 500ms
		act(() => {
			vi.advanceTimersByTime(500)
		})

		expect(result.current).toBe('updated')
	})

	it('should not update the debounced value before the delay', () => {
		const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
			initialProps: { value: 'initial', delay: 500 },
		})

		expect(result.current).toBe('initial')

		act(() => {
			rerender({ value: 'updated', delay: 500 })
		})

		// Fast-forward time by 499ms (just before the delay)
		act(() => {
			vi.advanceTimersByTime(499)
		})

		expect(result.current).toBe('initial')
	})

	it('should clear the timeout on unmount', () => {
		const { result, unmount } = renderHook(({ value, delay }) => useDebounce(value, delay), {
			initialProps: { value: 'initial', delay: 500 },
		})

		expect(result.current).toBe('initial')

		act(() => {
			unmount()
		})

		// Fast-forward time by 500ms
		act(() => {
			vi.advanceTimersByTime(500)
		})

		// The value should not have changed because the component unmounted
		expect(result.current).toBe('initial')
	})
})
