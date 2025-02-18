import { screen } from '@testing-library/react'
import NewChatModal from './NewChatModal'
import { useFindUsersByNameMutation } from '@features/user/userApi'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

// Mock the necessary hooks and components
vi.mock('@features/user/userApi', () => ({
	useFindUsersByNameMutation: vi.fn(),
}))

describe('NewChatModal', () => {
	const mockFindUsersByName = vi.fn()
	const mockResults = [
		{
			_id: '1',
			name: 'John Doe',
			avatar: 'https://example.com/avatar.jpg',
			email: 'john.doe@example.com',
		},
		{
			_id: '2',
			name: 'Jane Smith',
			avatar: 'https://example.com/avatar2.jpg',
			email: 'jane.smith@example.com',
		},
	]

	beforeEach(() => {
		vi.mocked(useFindUsersByNameMutation as any).mockReturnValue([
			mockFindUsersByName,
			{ isLoading: false, data: mockResults },
		])
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('renders the New Chat button', () => {
		renderWithChakra(<NewChatModal disabled={false} />)
		const newChatButton = screen.getByTestId('newChatTrigger')
		expect(newChatButton).toBeInTheDocument()
		expect(newChatButton).toBeEnabled()
	})

	it('renders the New Chat button and respects the disabled prop', () => {
		renderWithChakra(<NewChatModal disabled={true} />)
		const newChatButton = screen.getByTestId('newChatTrigger')
		expect(newChatButton).toBeInTheDocument()
		expect(newChatButton).toBeDisabled()
	})
})
