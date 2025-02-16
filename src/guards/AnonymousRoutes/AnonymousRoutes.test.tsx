import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AnonymousRoutes from './AnonymousRoutes'
import { vi } from 'vitest'

vi.mock('react-redux', () => ({
	useSelector: vi.fn(),
}))

describe('AnonymousRoutes', () => {
	it('redirects to /chat if the user has a token', () => {
		vi.mocked(useSelector).mockReturnValue('mocked-token')

		render(
			<MemoryRouter initialEntries={['/login']}>
				<AnonymousRoutes />
			</MemoryRouter>,
		)

		expect(screen.queryByText('Login Page')).not.toBeInTheDocument()
	})

	it('renders the child routes when no token is present', () => {
		vi.mocked(useSelector).mockReturnValue(null)

		render(
			<MemoryRouter initialEntries={['/login']}>
				<Routes>
					<Route element={<AnonymousRoutes />}>
						<Route
							path='/login'
							element={<div>Login Page</div>}
						/>
					</Route>
				</Routes>
			</MemoryRouter>,
		)

		expect(screen.getByText('Login Page')).toBeInTheDocument()
	})
})
