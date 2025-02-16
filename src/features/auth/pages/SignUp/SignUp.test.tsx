import { screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { useRegisterUserMutation } from '@features/auth/authApi.ts'
import { toaster } from '@components/chakra/toaster.tsx'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'
import { SignUp } from '@features/auth/pages'

vi.mock('@features/auth/authApi.ts', () => ({
	useRegisterUserMutation: vi.fn(),
}))

vi.mock('@components/chakra/toaster.tsx', () => ({
	toaster: { create: vi.fn() },
}))

describe('SignUp Component', () => {
	let registerUserMock: any

	beforeEach(() => {
		registerUserMock = vi.fn()
		;(useRegisterUserMutation as any).mockReturnValue([registerUserMock, { isLoading: false, isSuccess: false }])
	})

	const renderComponent = () => {
		return renderWithChakra(
			<MemoryRouter>
				<SignUp />
			</MemoryRouter>,
		)
	}

	it('renders sign-up form correctly', () => {
		renderComponent()

		expect(screen.getByText(/Get started today/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/Name/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
		expect(screen.getByTestId('password')).toBeInTheDocument()
		expect(screen.getByTestId('confirmPassword')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /Get started now/i })).toBeInTheDocument()
	})

	it('validates form fields before submission', async () => {
		renderComponent()
		fireEvent.click(screen.getByRole('button', { name: /Get started now/i }))

		await waitFor(() => {
			expect(screen.getByText(/Name is required field/i)).toBeInTheDocument()
			expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
			expect(screen.getByText('Password is required')).toBeInTheDocument()
			expect(screen.getByText('Confirm password is required')).toBeInTheDocument()
			expect(screen.getByText(/Confirm password is required/i)).toBeInTheDocument()
		})
	})

	it('submits form with valid data', async () => {
		renderComponent()

		fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } })
		fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } })
		fireEvent.change(screen.getByTestId('password'), { target: { value: 'Password123' } })
		fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: 'Password123' } })
		fireEvent.click(screen.getByLabelText(/I agree to Product Terms and Policy/i))
		fireEvent.click(screen.getByRole('button', { name: /Get started now/i }))

		await waitFor(() => {
			expect(registerUserMock).toHaveBeenCalledWith({
				name: 'John Doe',
				email: 'john@example.com',
				password: 'Password123',
				age: '',
			})
		})
	})

	it('shows success toaster on successful sign-up', async () => {
		;(useRegisterUserMutation as any).mockReturnValue([registerUserMock, { isLoading: false, isSuccess: true }])
		renderComponent()

		await waitFor(() => {
			expect(toaster.create).toHaveBeenCalledWith({
				title: 'Welcome Aboard!',
				description: 'You’ve successfully signed up. Please check you email box.',
				type: 'success',
			})
		})
	})
})
