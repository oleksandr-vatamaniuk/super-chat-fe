import { screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import EditProfile from './EditProfile'
import { useUpdateUserMutation } from '@features/user/userApi.ts'
import { toaster } from '@components/chakra/toaster.tsx'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

vi.mock('@features/user/userApi.ts', () => ({
	useUpdateUserMutation: vi.fn(),
}))

vi.mock('@components/chakra/toaster.tsx', () => ({
	toaster: { create: vi.fn() },
}))

describe('EditProfile Component', () => {
	let mockUpdateUser: any
	//
	beforeEach(() => {
		mockUpdateUser = vi.fn()
		vi.mocked(useUpdateUserMutation as any).mockReturnValue([
			mockUpdateUser,
			{ isLoading: false, isError: false, isSuccess: false, error: null },
		])
	})

	it('renders form fields and submit button', () => {
		renderWithChakra(<EditProfile />)
		expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/age/i)).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
	})

	it('validates form and shows errors on invalid input', async () => {
		renderWithChakra(<EditProfile />)
		fireEvent.click(screen.getByRole('button', { name: /save/i }))

		expect(await screen.findByText(/name is required field/i)).toBeInTheDocument()

		fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'abc' } })
		fireEvent.change(screen.getByLabelText(/age/i), { target: { value: '12' } })
		fireEvent.click(screen.getByRole('button', { name: /save/i }))

		expect(await screen.findByText(/name should be at least 4 characters long/i)).toBeInTheDocument()
		expect(await screen.findByText(/age must be at least 13/i)).toBeInTheDocument()
	})

	it('submits form successfully and shows success toast', async () => {
		;(useUpdateUserMutation as any).mockReturnValue([mockUpdateUser, { isLoading: false, isSuccess: true }])
		renderWithChakra(<EditProfile />)

		fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } })
		fireEvent.change(screen.getByLabelText(/age/i), { target: { value: '25' } })
		fireEvent.click(screen.getByRole('button', { name: /save/i }))

		await waitFor(() => expect(mockUpdateUser).toHaveBeenCalledWith({ name: 'John Doe', age: '25' }))
		await waitFor(() =>
			expect(toaster.create).toHaveBeenCalledWith({
				title: 'You have successfully updated your profile',
				type: 'success',
			}),
		)
	})
})
