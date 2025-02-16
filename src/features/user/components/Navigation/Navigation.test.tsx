import { screen, fireEvent } from '@testing-library/react'
import Navigation from './Navigation'
import { vi } from 'vitest'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

const mockNavigate = vi.fn()
const mockLogOut = vi.fn()

vi.mock('react-router-dom', () => ({
	useNavigate: () => mockNavigate,
	NavLink: ({ to, children }: { to: string; children: (props: { isActive: boolean }) => JSX.Element }) => (
		<div
			data-testid={`nav-${to}`}
			onClick={() => mockNavigate(to)}
		>
			{children({ isActive: false })}
		</div>
	),
}))

vi.mock('@features/auth/authApi.ts', () => ({
	useLogOutMutation: () => [mockLogOut, { isLoading: false, isSuccess: false }],
}))

describe('Navigation Component', () => {
	it('renders chat link and logout button', () => {
		renderWithChakra(<Navigation />)

		expect(screen.getByText('Chat')).toBeInTheDocument()
		expect(screen.getByTestId('logoutBtn')).toBeInTheDocument()
	})

	it('navigates to /chat when chat link is clicked', () => {
		renderWithChakra(<Navigation />)
		fireEvent.click(screen.getByTestId('nav-/chat'))
		expect(mockNavigate).toHaveBeenCalledWith('/chat')
	})

	it('calls logout mutation on logout button click', () => {
		renderWithChakra(<Navigation />)
		fireEvent.click(screen.getByTestId('logoutBtn'))
		expect(mockLogOut).toHaveBeenCalled()
	})
})
