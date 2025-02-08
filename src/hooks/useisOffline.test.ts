import { renderHook, act } from '@testing-library/react'
import useIsOffline from './useIsOffline'

describe('useIsOffline', () => {
	beforeEach(() => {
		// Mock navigator.onLine
		Object.defineProperty(navigator, 'onLine', {
			configurable: true,
			writable: true,
			value: true,
		})
	})

	it('should be offline when navigator.onLine is false', () => {
		Object.defineProperty(navigator, 'onLine', { value: false })
		const { result } = renderHook(() => useIsOffline())
		expect(result.current).toBe(true)
	})

	it('should be online when navigator.onLine is true', () => {
		Object.defineProperty(navigator, 'onLine', { value: true })
		const { result } = renderHook(() => useIsOffline())
		expect(result.current).toBe(false)
	})

	it('should update to offline when the offline event is triggered', () => {
		const { result } = renderHook(() => useIsOffline())

		act(() => {
			window.dispatchEvent(new Event('offline'))
		})

		expect(result.current).toBe(true)
	})

	it('should update to online when the online event is triggered', () => {
		const { result } = renderHook(() => useIsOffline())

		act(() => {
			window.dispatchEvent(new Event('online'))
		})

		expect(result.current).toBe(false)
	})
})
