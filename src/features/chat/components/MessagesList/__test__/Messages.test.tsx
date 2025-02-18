import { screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Messages from '../Messages'
import { useSelector } from 'react-redux'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'
import { IUser } from '@types'

vi.mock('react-redux', () => ({
	...vi.importActual('react-redux'),
	useSelector: vi.fn(),
}))

const mockUser = {
	_id: 'user1',
	avatar: 'https://example.com/user-avatar.jpg',
} as IUser

const mockParticipant = {
	_id: 'user2',
	name: 'John Doe',
	avatar: 'https://example.com/participant-avatar.jpg',
} as IUser

const mockMessages = [
	{ _id: '1', message: 'Hello', createdAt: '2024-02-17T10:00:00Z', senderId: 'user1', receiverId: 'user2' },
	{ _id: '2', message: 'Hi there!', createdAt: '2024-02-17T10:01:00Z', senderId: 'user2', receiverId: 'user1' },
]

describe('Messages component', () => {
	beforeEach(() => {
		;(useSelector as any).mockReturnValue(mockUser)
	})

	it('renders messages correctly', () => {
		renderWithChakra(
			<Messages
				messages={mockMessages}
				participant={mockParticipant}
			/>,
		)

		expect(screen.getByText('Hello')).toBeInTheDocument()
		expect(screen.getByText('Hi there!')).toBeInTheDocument()
	})

	it('displays correct names and avatars', () => {
		renderWithChakra(
			<Messages
				messages={mockMessages}
				participant={mockParticipant}
			/>,
		)

		expect(screen.getByText('You')).toBeInTheDocument()
		expect(screen.getByText('John Doe')).toBeInTheDocument()
	})
})
