import { screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import ChangeAvatar from './ChangeAvatar'
import { useUpdateAvatarMutation } from '@features/user/userApi.ts'
import { toaster } from '@components/chakra/toaster.tsx'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

vi.mock('@features/user/userApi.ts', () => ({
	useUpdateAvatarMutation: vi.fn(),
}))

vi.mock('@components/chakra/toaster.tsx', () => ({
	toaster: { create: vi.fn() },
}))

describe('ChangeAvatar Component', () => {
	let mockUpdateAvatar: any

	beforeEach(() => {
		mockUpdateAvatar = vi.fn()
		vi.mocked(useUpdateAvatarMutation as any).mockReturnValue([
			mockUpdateAvatar,
			{ isLoading: false, isSuccess: false },
		])
	})

	it('renders the file upload and submit button', () => {
		renderWithChakra(<ChangeAvatar />)
		expect(screen.getByText(/Change your photo/i)).toBeInTheDocument()
		expect(screen.getByText(/Drag and drop file below/i)).toBeInTheDocument()
		expect(screen.getByText(/Drag and drop or click here to upload/i)).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
	})

	it('submits the selected file and shows success toast', async () => {
		;(useUpdateAvatarMutation as any).mockReturnValue([mockUpdateAvatar, { isLoading: false, isSuccess: true }])
		renderWithChakra(<ChangeAvatar />)

		const file = new File(['image content'], 'avatar.png', { type: 'image/png' })
		const input = screen.getByTestId('dropzone')

		fireEvent.change(input, { target: { files: [file] } })
		fireEvent.click(screen.getByRole('button', { name: /save/i }))

		await waitFor(() => expect(mockUpdateAvatar).toHaveBeenCalled())
		await waitFor(() =>
			expect(toaster.create).toHaveBeenCalledWith({ title: 'Image updated successfully!', type: 'success' }),
		)
	})
})
