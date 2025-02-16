import { screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import VerifyEmail from './VerifyEmail'
import { useVerifyUserMutation } from '@features/auth/authApi.ts'
import { toaster } from '@components/chakra/toaster.tsx'
import { expect, vi } from 'vitest'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

// Mock useVerifyUserMutation
vi.mock('@features/auth/authApi.ts', () => ({
	useVerifyUserMutation: vi.fn(),
}))

// Mock toaster
vi.mock('@components/chakra/toaster.tsx', () => ({
	toaster: {
		create: vi.fn(),
	},
}))

vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
	return {
		...actual,
		useNavigate: vi.fn(),
		useSearchParams: () => [new URLSearchParams({ token: 'test-token', email: 'test@example.com' })],
	}
})

describe('VerifyEmail Component', () => {
	let verifyUserMock: any

	beforeEach(() => {
		verifyUserMock = vi.fn()
		;(useVerifyUserMutation as any).mockReturnValue([
			verifyUserMock,
			{ isSuccess: false, isLoading: false, isError: false },
		])
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	// test('redirects to /login if no token or email', () => {
	// 	const mockNavigate = vi.fn();
	// 	vi.mocked(useNavigate).mockReturnValue(mockNavigate)
	//
	// 	vi.mock('react-router-dom', async () => {
	// 		const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
	// 		return {
	// 			...actual,
	// 			useSearchParams: () => [new URLSearchParams()], // Empty params
	// 		}
	// 	})
	//
	// 	renderWithChakra(
	// 		<MemoryRouter initialEntries={['/verify-email']}>
	// 			<VerifyEmail />
	// 		</MemoryRouter>
	// 	)
	//
	// 	expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true })
	// })

	test('calls verifyUser with correct params', async () => {
		vi.mock('react-router-dom', async () => {
			const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
			return {
				...actual,
				useNavigate: vi.fn(),
				useSearchParams: () => [new URLSearchParams({ token: 'test-token', email: 'test@example.com' })],
			}
		})

		renderWithChakra(
			<MemoryRouter>
				<VerifyEmail />
			</MemoryRouter>,
		)

		expect(verifyUserMock).toHaveBeenCalledWith({
			email: 'test@example.com',
			verificationToken: 'test-token',
		})
	})

	test('shows loading text when isLoading is true', () => {
		;(useVerifyUserMutation as any).mockReturnValue([vi.fn(), { isSuccess: false, isLoading: true, isError: false }])

		renderWithChakra(
			<MemoryRouter>
				<VerifyEmail />
			</MemoryRouter>,
		)

		expect(screen.getByText('Loading...')).toBeInTheDocument()
	})

	test('shows success message and navigates to /login when isSuccess is true', async () => {
		const mockNavigate = vi.fn()
		vi.mocked(useNavigate).mockReturnValue(mockNavigate)
		;(useVerifyUserMutation as any).mockReturnValue([vi.fn(), { isSuccess: true, isLoading: false, isError: false }])

		renderWithChakra(
			<MemoryRouter>
				<VerifyEmail />
			</MemoryRouter>,
		)

		await waitFor(() => {
			expect(toaster.create).toHaveBeenCalledWith(
				expect.objectContaining({
					type: 'success',
					title: 'Email Verified Successfully!',
				}),
			)
		})

		expect(mockNavigate).toHaveBeenCalledWith('/login')
	})

	test('shows error message and Back to Login button when isError is true', async () => {
		const mockNavigate = vi.fn()
		vi.mocked(useNavigate).mockReturnValue(mockNavigate)
		;(useVerifyUserMutation as any).mockReturnValue([vi.fn(), { isSuccess: false, isLoading: false, isError: true }])

		renderWithChakra(
			<MemoryRouter>
				<VerifyEmail />
			</MemoryRouter>,
		)

		expect(screen.getByText(/It seems your email verification has expired or failed/i)).toBeInTheDocument()

		const backToLoginButton = screen.getByRole('button', { name: /Back to Login/i })
		expect(backToLoginButton).toBeInTheDocument()

		fireEvent.click(backToLoginButton)
		expect(mockNavigate).toHaveBeenCalledWith('/login')
	})
})
