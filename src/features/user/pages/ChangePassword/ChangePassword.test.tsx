import { screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import ChangePassword from './ChangePassword'
import { useUpdateUserPasswordMutation } from '@features/user/userApi.ts'
import { toaster } from '@components/chakra/toaster.tsx'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

vi.mock('@features/user/userApi.ts', () => ({
	useUpdateUserPasswordMutation: vi.fn(),
}))

vi.mock('@components/chakra/toaster.tsx', () => ({
	toaster: { create: vi.fn() },
}))

describe('ChangePassword Component', () => {
	let mockUpdateUserPassword: any

	beforeEach(() => {
		mockUpdateUserPassword = vi.fn()
		vi.mocked(useUpdateUserPasswordMutation as any).mockReturnValue([
			mockUpdateUserPassword,
			{ isLoading: false, isError: false, isSuccess: false, error: null },
		])
	})

	it('renders form fields and submit button', () => {
		renderWithChakra(<ChangePassword />)
		expect(screen.getByTestId('oldPassword')).toBeInTheDocument()
		expect(screen.getByTestId('newPassword')).toBeInTheDocument()
		expect(screen.getByTestId('confirmNewPassword')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
	})

	it('validates form and shows errors on invalid input', async () => {
		renderWithChakra(<ChangePassword />)
		fireEvent.click(screen.getByRole('button', { name: /save/i }))

		fireEvent.change(screen.getByTestId('newPassword'), { target: { value: 'short' } })
		fireEvent.change(screen.getByTestId('confirmNewPassword'), { target: { value: 'mismatch' } })

		fireEvent.click(screen.getByRole('button', { name: /save/i }))

		expect(await screen.findByText(/password is too short/i)).toBeInTheDocument()
		expect(await screen.findByText(/passwords must match/i)).toBeInTheDocument()
	})

	it('submits form successfully and shows success toast', async () => {
		;(useUpdateUserPasswordMutation as any).mockReturnValue([
			mockUpdateUserPassword,
			{ isLoading: false, isSuccess: true },
		])
		renderWithChakra(<ChangePassword />)

		fireEvent.change(screen.getByTestId('oldPassword'), { target: { value: 'OldPassword123' } })
		fireEvent.change(screen.getByTestId('newPassword'), { target: { value: 'NewPassword123' } })
		fireEvent.change(screen.getByTestId('confirmNewPassword'), { target: { value: 'NewPassword123' } })
		fireEvent.click(screen.getByRole('button', { name: /save/i }))

		await waitFor(() =>
			expect(mockUpdateUserPassword).toHaveBeenCalledWith({
				oldPassword: 'OldPassword123',
				newPassword: 'NewPassword123',
			}),
		)
		await waitFor(() =>
			expect(toaster.create).toHaveBeenCalledWith({ title: 'Password updated successfully!', type: 'success' }),
		)
	})
})
