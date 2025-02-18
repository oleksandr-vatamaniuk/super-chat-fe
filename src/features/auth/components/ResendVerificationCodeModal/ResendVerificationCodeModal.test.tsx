import { screen, fireEvent, waitFor } from '@testing-library/react'
import ResendVerificationCodeModal from './ResendVerificationCodeModal'
import { useResendVerificationEmailMutation } from '@features/auth/authApi'
import { toaster } from '@components/chakra/toaster'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

// Mock the necessary hooks and components
vi.mock('@features/auth/authApi', () => ({
	useResendVerificationEmailMutation: vi.fn(),
}))

vi.mock('@components/chakra/toaster', () => ({
	toaster: {
		create: vi.fn(),
	},
}))

describe('ResendVerificationCodeModal', () => {
	const mockResendVerificationEmail = vi.fn()
	const mockOnClose = vi.fn()

	beforeEach(() => {
		vi.mocked(useResendVerificationEmailMutation as any).mockReturnValue([
			mockResendVerificationEmail,
			{ isLoading: false, isSuccess: false, isError: false },
		])
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('renders the modal when initialOpen is true', () => {
		renderWithChakra(
			<ResendVerificationCodeModal
				initialOpen={true}
				onClose={mockOnClose}
				email='test@example.com'
			/>,
		)

		expect(screen.getByText('Uh-oh, your email address has not been confirmed yet!')).toBeInTheDocument()
		expect(screen.getByText('Resend Confirmation Email')).toBeInTheDocument()
	})

	it('does not render the modal when initialOpen is false', () => {
		renderWithChakra(
			<ResendVerificationCodeModal
				initialOpen={false}
				onClose={mockOnClose}
				email='test@example.com'
			/>,
		)

		expect(screen.queryByText('Uh-oh, your email address has not been confirmed yet!')).not.toBeInTheDocument()
		expect(screen.queryByText('Resend Confirmation Email')).not.toBeInTheDocument()
	})

	it('calls resendVerificationEmail when the button is clicked', async () => {
		renderWithChakra(
			<ResendVerificationCodeModal
				initialOpen={true}
				onClose={mockOnClose}
				email='test@example.com'
			/>,
		)

		const resendButton = screen.getByText('Resend Confirmation Email')
		fireEvent.click(resendButton)

		await waitFor(() => {
			expect(mockResendVerificationEmail).toHaveBeenCalledWith('test@example.com')
		})
	})

	it('closes the modal and shows a success toast when resend is successful', async () => {
		vi.mocked(useResendVerificationEmailMutation as any).mockReturnValue([
			mockResendVerificationEmail,
			{ isLoading: false, isSuccess: true, isError: false },
		])

		renderWithChakra(
			<ResendVerificationCodeModal
				initialOpen={true}
				onClose={mockOnClose}
				email='test@example.com'
			/>,
		)

		const resendButton = screen.getByText('Resend Confirmation Email')
		fireEvent.click(resendButton)

		await waitFor(() => {
			expect(mockOnClose).toHaveBeenCalled()
			expect(toaster.create).toHaveBeenCalledWith({
				title: 'Email verification send',
				type: 'success',
			})
		})
	})

	it('closes the modal when resend fails', async () => {
		vi.mocked(useResendVerificationEmailMutation as any).mockReturnValue([
			mockResendVerificationEmail,
			{ isLoading: false, isSuccess: false, isError: true },
		])

		renderWithChakra(
			<ResendVerificationCodeModal
				initialOpen={true}
				onClose={mockOnClose}
				email='test@example.com'
			/>,
		)

		const resendButton = screen.getByText('Resend Confirmation Email')
		fireEvent.click(resendButton)

		await waitFor(() => {
			expect(mockOnClose).toHaveBeenCalled()
		})
	})
})
