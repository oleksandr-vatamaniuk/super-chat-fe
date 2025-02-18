import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import ChatListEmptyState from '../ChatListEmptyState'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'
import { useParams } from 'react-router-dom'

// Mock useParams
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom')
	return {
		...actual,
		useParams: vi.fn(),
	}
})

describe('ChatListEmptyState', () => {
	afterEach(() => {
		vi.clearAllMocks()
	})

	it('renders correctly without chatId', () => {
		vi.mocked(useParams).mockReturnValue({ chatId: undefined })

		renderWithChakra(<ChatListEmptyState />)

		const stack = screen.getByTestId('chatListEmptyState')
		// Check if the text content is correct
		expect(screen.getByText('No Chats Yet')).toBeInTheDocument()
		expect(screen.getByText('Click the button above to create your first chat!')).toBeInTheDocument()

		// Check if the styles are applied correctly
		expect(stack).toHaveStyle({ height: 'auto', backgroundColor: 'none' })
	})

	it('renders correctly with chatId', () => {
		vi.mocked(useParams).mockReturnValue({ chatId: '123' })

		renderWithChakra(<ChatListEmptyState />)

		// Check if the main container is rendered
		const stack = screen.getByTestId('chatListEmptyState')
		expect(stack).toBeInTheDocument()

		// Check if the text content is correct
		expect(screen.getByText('No Chats Yet')).toBeInTheDocument()
		expect(screen.getByText('Click the button above to create your first chat!')).toBeInTheDocument()

		// Check if the styles are applied correctly
		expect(stack).toHaveStyle({
			borderRightWidth: '1px',
		})
	})
})
