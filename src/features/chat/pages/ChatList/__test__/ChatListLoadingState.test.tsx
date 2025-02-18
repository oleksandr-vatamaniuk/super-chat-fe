import { screen } from '@testing-library/react'
import ChatListLoadingState from '../ChatListLoadingState'
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

describe('ChatListLoadingState', () => {
	afterEach(() => {
		vi.clearAllMocks()
	})

	it('renders correctly without chatId', () => {
		vi.mocked(useParams).mockReturnValue({ chatId: undefined })

		renderWithChakra(<ChatListLoadingState />)

		const stack = screen.getByTestId('chatListLoadingState')
		expect(stack).toBeInTheDocument()

		expect(stack).toHaveStyle({
			borderRightWidth: 0,
			background: 'none',
		})
	})

	it('renders correctly with chatId', () => {
		vi.mocked(useParams).mockReturnValue({ chatId: '123' })

		renderWithChakra(<ChatListLoadingState />)

		// Check if the main container is rendered
		const stack = screen.getByTestId('chatListLoadingState')
		expect(stack).toBeInTheDocument()

		// Check if the styles are applied correctly
		expect(stack).toHaveStyle({
			borderRightWidth: '1px',
		})
	})
})
