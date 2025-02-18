import { fireEvent, screen, waitFor } from '@testing-library/react'
import Login from './Login'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { useGoogleLogin } from '@react-oauth/google'
import { useLoginMutation } from '@features/auth/authApi.ts'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@features/auth/authSlice.ts'

// Mock the useLoginMutation hook
vi.mock('@features/auth/authApi', () => ({
	useLoginMutation: vi.fn(() => [
		vi.fn(),
		{
			isLoading: false,
			isSuccess: false,
			isError: false,
			error: null,
		},
	]),
}))

// Mock the useGoogleLogin hook
vi.mock('@react-oauth/google', () => ({
	useGoogleLogin: vi.fn(() => vi.fn()),
}))

// Mock the toaster
vi.mock('@components/chakra/toaster.tsx', () => ({
	toaster: {
		create: vi.fn(),
	},
}))

vi.mock('react-redux', () => ({
	useDispatch: vi.fn(),
}))

vi.mock('@features/auth/authSlice', () => ({
	setCredentials: vi.fn(),
}))

vi.mock('@features/auth/components', () => ({
	ResendVerificationCodeModal: vi.fn(() => <div data-testid='ResendVerificationCodeModal' />),
}))

describe('Login Component', () => {
	const renderLoginComponent = () => {
		return renderWithChakra(
			<MemoryRouter>
				<Login />
			</MemoryRouter>,
		)
	}

	const mockLogin = vi.fn()
	const mockDispatch = vi.fn()
	const mockSetCredentials = vi.fn()

	beforeEach(() => {
		// Reset all mocks before each test
		vi.clearAllMocks()

		// Mock useDispatch to return mockDispatch
		vi.mocked(useDispatch).mockReturnValue(mockDispatch)

		// Mock setCredentials to return mockSetCredentials
		vi.mocked(setCredentials).mockReturnValue(mockSetCredentials as any)
	})

	it('renders the login form', () => {
		renderLoginComponent()

		expect(screen.getByText('Welcome back')).toBeInTheDocument()
		expect(screen.getByLabelText('Email')).toBeInTheDocument()
		expect(screen.getByLabelText('Password')).toBeInTheDocument()
		expect(screen.getByText('Sign In')).toBeInTheDocument()
		expect(screen.getByText('Forgot your password?')).toBeInTheDocument()
		expect(screen.getByText('Or do it via other accounts')).toBeInTheDocument()
		expect(screen.getByText(/Sign Up/i)).toBeInTheDocument()
	})

	it('submits the form with valid data', async () => {
		vi.mocked(useLoginMutation as any).mockReturnValue([
			mockLogin,
			{ isLoading: false, isSuccess: false, isError: false, error: null },
		])

		renderLoginComponent()

		const emailInput = screen.getByLabelText('Email')
		const passwordInput = screen.getByLabelText('Password')
		const submitButton = screen.getByText('Sign In')

		fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
		fireEvent.change(passwordInput, { target: { value: 'password123' } })
		fireEvent.click(submitButton)

		await waitFor(() => {
			expect(mockLogin).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' })
		})
	})

	it('triggers Google login when Google button is clicked', async () => {
		const mockGoogleLogin = vi.fn()
		vi.mocked(useGoogleLogin).mockReturnValue(mockGoogleLogin)

		renderLoginComponent()

		const googleButton = screen.getByRole('button', { name: /google/i })
		await fireEvent.click(googleButton)

		expect(mockGoogleLogin).toHaveBeenCalled()
	})
})
