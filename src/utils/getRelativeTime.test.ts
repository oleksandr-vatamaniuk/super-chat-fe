import { describe, expect, it, vi } from 'vitest'
import { getRelativeTime } from '@utils/getRelativeTime.ts'

// Helper function to mock Date
const mockDate = (isoString: string) => {
	vi.useFakeTimers()
	vi.setSystemTime(new Date(isoString))
}

describe('getRelativeTime', () => {
	afterEach(() => {
		vi.useRealTimers()
	})

	it('returns "Just now" for times within 40 seconds', () => {
		mockDate('2024-02-07T12:00:00Z')
		const time = new Date('2024-02-07T11:59:30Z').toISOString()
		expect(getRelativeTime(time)).toBe('Just now')
	})

	it('returns minutes when time is less than an hour', () => {
		mockDate('2024-02-07T12:00:00Z')
		const time = new Date('2024-02-07T11:30:00Z').toISOString()
		expect(getRelativeTime(time)).toBe('30m')
	})

	it('returns hours when time is less than a day', () => {
		mockDate('2024-02-07T12:00:00Z')
		const time = new Date('2024-02-07T04:00:00Z').toISOString()
		expect(getRelativeTime(time)).toBe('8h')
	})

	it('returns formatted date for times older than a day', () => {
		mockDate('2024-02-07T12:00:00Z')
		const time = new Date('2024-02-05T12:00:00Z').toISOString()
		expect(getRelativeTime(time)).toBe('05/02/24')
	})
})
