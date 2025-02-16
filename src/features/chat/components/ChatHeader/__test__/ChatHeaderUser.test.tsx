import { screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ChatHeaderUser from '../ChatHeaderUser'
import { IUser } from '@types'
import { useGetOnlineStatus } from '@features/chat/hooks'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

// Mock the useGetOnlineStatus hook
vi.mock('@features/chat/hooks', () => ({
	useGetOnlineStatus: vi.fn(),
}))

// Mock the extractTime utility
vi.mock('@utils/exactTime.ts', () => ({
	extractTime: vi.fn(() => '10:30 AM'),
}))

describe('ChatHeaderUser', () => {
	const mockParticipant: IUser = {
		_id: '123',
		avatar: '',
		email: 'test@test.com',
		name: 'John Doe',
		updatedAt: '2023-10-01T12:00:00Z',
	}

	beforeEach(() => {
		// Reset the mock implementation before each test
		vi.mocked(useGetOnlineStatus).mockReset()
	})

	it('renders the participant name correctly', () => {
		// Mock the hook to return offline status
		vi.mocked(useGetOnlineStatus).mockReturnValue({
			isOnline: false,
			lastSeen: 'Just now',
		})

		renderWithChakra(<ChatHeaderUser participant={mockParticipant} />)

		// Check if the participant's name is rendered
		expect(screen.getByText('John Doe')).toBeInTheDocument()
	})

	it('displays "Online" status when the user is online', () => {
		// Mock the hook to return online status
		vi.mocked(useGetOnlineStatus).mockReturnValue({
			isOnline: true,
			lastSeen: null,
		})

		renderWithChakra(<ChatHeaderUser participant={mockParticipant} />)

		// Check if "Online" status is displayed
		expect(screen.getByText('Online')).toBeInTheDocument()
	})

	it('displays "last seen" with the correct time when the user is offline', () => {
		// Mock the hook to return offline status
		vi.mocked(useGetOnlineStatus).mockReturnValue({
			isOnline: false,
			lastSeen: 'Just Now',
		})

		renderWithChakra(<ChatHeaderUser participant={mockParticipant} />)

		// Check if "last seen" text is displayed with the correct time
		expect(screen.getByText(/last seen 10:30 AM/i)).toBeInTheDocument()
	})
})
