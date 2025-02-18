import { screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { useForgotPasswordMutation } from '@features/auth/authApi.ts'
import { ForgotPassword } from '@features/auth/pages'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

// Mock the useForgotPasswordMutation hook
vi.mock('@features/auth/authApi.ts', () => ({
	useForgotPasswordMutation: vi.fn(),
}))

// Mock the toaster
vi.mock('@components/chakra/toaster.tsx', () => ({
	toaster: {
		create: vi.fn(),
	},
}))

describe('ForgotPassword', () => {
	const mockForgotPassword = vi.fn()

	beforeEach(() => {
		vi.mocked(useForgotPasswordMutation as any).mockReturnValue([
			mockForgotPassword,
			{ isSuccess: false, isLoading: false, isError: false },
		])
	})

	const renderComponent = () => {
		return renderWithChakra(
			<MemoryRouter>
				<ForgotPassword />
			</MemoryRouter>,
		)
	}

	it('renders correctly', () => {
		renderComponent()

		expect(screen.getByText('Password recovery')).toBeInTheDocument()
		expect(screen.getByText("Enter the email you're using for your account.")).toBeInTheDocument()
		expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
		expect(screen.getByText('Back to Login')).toBeInTheDocument()
	})

	it('submits the form with valid email', async () => {
		renderComponent()

		const emailInput = screen.getByLabelText('Email Address')
		const submitButton = screen.getByRole('button', { name: 'Reset' })

		fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
		fireEvent.click(submitButton)

		await waitFor(() => {
			expect(mockForgotPassword).toHaveBeenCalledWith({ email: 'test@example.com' })
		})
	})

	it('shows error message with invalid email', async () => {
		renderComponent()

		const submitButton = screen.getByRole('button', { name: 'Reset' })

		fireEvent.click(submitButton)

		await waitFor(() => {
			expect(screen.getByText('Email is required')).toBeInTheDocument()
		})
	})

	it('displays success message after successful submission', async () => {
		;(useForgotPasswordMutation as any).mockReturnValue([mockForgotPassword, { isLoading: false, isSuccess: true }])

		renderComponent()

		await waitFor(() => {
			expect(screen.getByText('Please check you email box and follow the instructions.')).toBeInTheDocument()
		})
	})
})
