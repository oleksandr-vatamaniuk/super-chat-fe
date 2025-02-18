import { screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ChatItemList from './ChatItemList'
import { BrowserRouter } from 'react-router-dom'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'
import { IUser } from '@types'

vi.mock('@utils/getRelativeTime', () => ({
	getRelativeTime: vi.fn(() => '2 hours ago'),
}))

const mockParticipant = {
	_id: 'user2',
	name: 'John Doe',
	avatar: 'https://example.com/participant-avatar.jpg',
} as IUser

describe('ChatItemList component', () => {
	it('renders participant name and message', () => {
		renderWithChakra(
			<BrowserRouter>
				<ChatItemList
					isOnline={true}
					unreadMessagesCount={2}
					messageTime={'2024-02-17T10:00:00Z'}
					messageText={'Hello, how are you?'}
					participant={mockParticipant}
					size='full'
				/>
			</BrowserRouter>,
		)

		expect(screen.getByText('John Doe')).toBeInTheDocument()
		expect(screen.getByText('Hello, how are you?')).toBeInTheDocument()
		expect(screen.getByText('2')).toBeInTheDocument()
		expect(screen.getByText('2 hours ago')).toBeInTheDocument()
	})

	it('hides unread count if zero', () => {
		renderWithChakra(
			<BrowserRouter>
				<ChatItemList
					isOnline={false}
					unreadMessagesCount={0}
					messageTime={'2024-02-17T10:00:00Z'}
					messageText={'No new messages'}
					participant={mockParticipant}
					size='small'
				/>
			</BrowserRouter>,
		)

		expect(screen.queryByText('0')).not.toBeInTheDocument()
		expect(screen.getByText('No new messages')).toBeInTheDocument()
	})
})
