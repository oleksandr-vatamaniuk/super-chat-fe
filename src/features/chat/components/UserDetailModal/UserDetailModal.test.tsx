import { screen, fireEvent, waitFor } from '@testing-library/react'
import UserDetailModal from './UserDetailModal'
import { useSelector } from 'react-redux'
import { useDeleteChatMutation } from '@features/chat/chatApi'
import { toaster } from '@components/chakra/toaster'
import { useNavigate } from 'react-router-dom'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

// Mock the necessary hooks and components
vi.mock('react-redux', () => ({
	useSelector: vi.fn(),
}))

vi.mock('@features/chat/chatApi', () => ({
	useDeleteChatMutation: vi.fn(),
}))

vi.mock('@components/chakra/toaster', () => ({
	toaster: {
		create: vi.fn(),
	},
}))

vi.mock('react-router-dom', () => ({
	useNavigate: vi.fn(),
}))

describe('UserDetailModal', () => {
	const mockParticipant = {
		_id: '123',
		name: 'John Doe',
		avatar: 'https://example.com/avatar.jpg',
	}

	const mockDeleteChat = vi.fn()
	const mockNavigate = vi.fn()

	beforeEach(() => {
		vi.mocked(useSelector).mockReturnValue(mockParticipant)
		vi.mocked(useDeleteChatMutation as any).mockReturnValue([mockDeleteChat, { isLoading: false, isSuccess: false }])
		vi.mocked(useNavigate).mockReturnValue(mockNavigate)
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('renders the DialogTrigger button', () => {
		renderWithChakra(<UserDetailModal disabled={false} />)
		const triggerButton = screen.getByTestId('deleteChatTrigger')
		expect(triggerButton).toBeInTheDocument()
		expect(triggerButton).toBeEnabled()
	})

	it('opens the dialog when the trigger button is clicked', async () => {
		renderWithChakra(<UserDetailModal disabled={false} />)
		const triggerButton = screen.getByTestId('deleteChatTrigger')
		fireEvent.click(triggerButton)

		await waitFor(() => {
			expect(screen.getByText('John Doe')).toBeInTheDocument()
			expect(screen.getByText('Last seen yesterday')).toBeInTheDocument()
			expect(screen.getByText('Delete Chat')).toBeInTheDocument()
		})
	})

	it('renders the dialog content correctly', async () => {
		renderWithChakra(<UserDetailModal disabled={false} />)
		const triggerButton = screen.getByTestId('deleteChatTrigger')
		fireEvent.click(triggerButton)

		await waitFor(() => {
			expect(screen.getByText('John Doe')).toBeInTheDocument()
			expect(screen.getByText('Last seen yesterday')).toBeInTheDocument()
			expect(screen.getByText('Delete Chat')).toBeInTheDocument()
		})
	})

	it('calls deleteChat when the delete button is clicked', async () => {
		renderWithChakra(<UserDetailModal disabled={false} />)
		const triggerButton = screen.getByTestId('deleteChatTrigger')
		fireEvent.click(triggerButton)

		await waitFor(() => {
			const deleteButton = screen.getByText('Delete Chat')
			fireEvent.click(deleteButton)
			expect(mockDeleteChat).toHaveBeenCalledWith('123')
		})
	})

	it('navigates to /chat and shows a success toast when delete is successful', async () => {
		vi.mocked(useDeleteChatMutation as any).mockReturnValue([mockDeleteChat, { isLoading: false, isSuccess: true }])

		renderWithChakra(<UserDetailModal disabled={false} />)
		const triggerButton = screen.getByTestId('deleteChatTrigger')
		fireEvent.click(triggerButton)

		await waitFor(() => {
			const deleteButton = screen.getByText('Delete Chat')
			fireEvent.click(deleteButton)
			expect(mockNavigate).toHaveBeenCalledWith('/chat')
			expect(toaster.create).toHaveBeenCalledWith({
				title: 'You successfully deleted chat with John Doe',
				type: 'success',
			})
		})
	})
})
