import { describe, expect, test, vi } from 'vitest'
import { extractTime } from '@utils/exactTime.ts'

// Helper function to set mock date
const mockDate = (isoString: string) => {
	vi.useFakeTimers()
	vi.setSystemTime(new Date(isoString))
}

describe('extractTime', () => {
	test('should return error for empty input', () => {
		expect(extractTime('')).toBe('Error date')
	})

	test("should return Today with time for today's date", () => {
		mockDate('2024-02-06T12:30:00Z')
		expect(extractTime('2024-02-06T08:15:00Z')).toBe('Today at 8:15')
	})

	test("should return Yesterday with time for yesterday's date", () => {
		mockDate('2024-02-06T12:30:00Z')
		expect(extractTime('2024-02-05T20:45:00Z')).toBe('Yesterday at 20:45')
	})

	test('should return formatted date for older dates', () => {
		mockDate('2024-02-06T12:30:00Z')
		expect(extractTime('2024-02-01T14:00:00Z')).toBe('1/2/2024')
	})

	test('should handle invalid dates gracefully', () => {
		expect(extractTime('invalid-date')).toBe('Error date')
	})
})
