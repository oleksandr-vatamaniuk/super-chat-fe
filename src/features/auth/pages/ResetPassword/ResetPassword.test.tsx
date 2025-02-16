import { screen, fireEvent, waitFor } from '@testing-library/react'
import ResetPassword from './ResetPassword'
import { MemoryRouter, useSearchParams } from 'react-router-dom'
import { vi } from 'vitest'
import { useResetPasswordMutation } from '@features/auth/authApi.ts'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

// Mock the useResetPasswordMutation hook
vi.mock('@features/auth/authApi.ts', () => ({
	useResetPasswordMutation: vi.fn(),
}))

// Mock the useSearchParams hook
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom')
	return {
		...actual,
		useSearchParams: vi.fn(),
	}
})

describe('ResetPassword', () => {
	const mockResetPassword = vi.fn()

	beforeEach(() => {
		vi.mocked(useResetPasswordMutation as any).mockReturnValue([
			mockResetPassword,
			{ isLoading: false, isSuccess: false },
		])
	})

	const renderComponent = (searchParams = '') => {
		return renderWithChakra(
			<MemoryRouter initialEntries={[`/reset-password?${searchParams}`]}>
				<ResetPassword />
			</MemoryRouter>,
		)
	}

	it('redirects to /login if token or email is missing', () => {
		// Mock useSearchParams to return no token or email
		vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams(), vi.fn()])

		renderComponent()

		expect(screen.queryByText('Change Your Password')).not.toBeInTheDocument()
		expect(screen.queryByText('Password Changed')).not.toBeInTheDocument()
	})

	it('renders correctly when token and email are present', () => {
		// Mock useSearchParams to return token and email
		vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams('token=abc123&email=test@example.com'), vi.fn()])

		renderComponent('token=abc123&email=test@example.com')

		expect(screen.getByText('Change Your Password')).toBeInTheDocument()
		expect(screen.getByText('Enter and confirm your new password to reset.')).toBeInTheDocument()
		expect(screen.getByTestId('password')).toBeInTheDocument()
		expect(screen.getByTestId('confirmPassword')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
	})

	it('shows validation errors for invalid inputs', async () => {
		// Mock useSearchParams to return token and email
		vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams('token=abc123&email=test@example.com'), vi.fn()])

		renderComponent('token=abc123&email=test@example.com')

		const submitButton = screen.getByRole('button', { name: 'Reset' })

		fireEvent.click(submitButton)

		await waitFor(() => {
			expect(screen.getByText('Password is required')).toBeInTheDocument()
			expect(screen.getByText('Confirm password is required')).toBeInTheDocument()
		})
	})

	it('submits the form with valid inputs', async () => {
		// Mock useSearchParams to return token and email
		vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams('token=abc123&email=test@example.com'), vi.fn()])

		renderComponent('token=abc123&email=test@example.com')

		const passwordInput = screen.getByTestId('password')
		const confirmPasswordInput = screen.getByTestId('confirmPassword')
		const submitButton = screen.getByRole('button', { name: 'Reset' })

		fireEvent.change(passwordInput, { target: { value: 'newpassword123' } })
		fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword123' } })
		fireEvent.click(submitButton)

		await waitFor(() => {
			expect(mockResetPassword).toHaveBeenCalledWith({
				email: 'test@example.com',
				token: 'abc123',
				password: 'newpassword123',
				confirmPassword: 'newpassword123',
			})
		})
	})

	it('displays success message after successful password reset', async () => {
		// Mock useSearchParams to return token and email
		vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams('token=abc123&email=test@example.com'), vi.fn()])

		// Mock the mutation to return success
		vi.mocked(useResetPasswordMutation as any).mockReturnValue([
			mockResetPassword,
			{ isLoading: false, isSuccess: true },
		])

		renderComponent('token=abc123&email=test@example.com')

		await waitFor(() => {
			expect(screen.getByText('Password Changed')).toBeInTheDocument()
			expect(screen.getByText('Your password reset was successful. Welcome back!')).toBeInTheDocument()
			expect(screen.getByText('Back to Login')).toBeInTheDocument()
		})
	})
})
