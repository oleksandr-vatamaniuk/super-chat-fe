import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import RestrictGoogleUsers from './RestrictGoogleUsers'
import { vi } from 'vitest'

vi.mock('react-redux', () => ({
	useSelector: vi.fn(),
}))

describe('RestrictGoogleUsers', () => {
	it('redirects to /settings/edit-profile if user is not present', () => {
		vi.mocked(useSelector).mockReturnValue(null)

		render(
			<MemoryRouter initialEntries={['/protected']}>
				<RestrictGoogleUsers />
			</MemoryRouter>,
		)

		expect(screen.queryByText('Protected Page')).not.toBeInTheDocument()
	})

	it('redirects to /settings/edit-profile if user is a Google user', () => {
		vi.mocked(useSelector).mockReturnValue({ authProvider: 'GOOGLE' })

		render(
			<MemoryRouter initialEntries={['/protected']}>
				<RestrictGoogleUsers />
			</MemoryRouter>,
		)

		expect(screen.queryByText('Protected Page')).not.toBeInTheDocument()
	})

	it('renders the child routes if user is a MAIL user', () => {
		vi.mocked(useSelector).mockReturnValue({ authProvider: 'MAIL' })

		render(
			<MemoryRouter initialEntries={['/protected']}>
				<Routes>
					<Route element={<RestrictGoogleUsers />}>
						<Route
							path='/protected'
							element={<div>Protected Page</div>}
						/>
					</Route>
				</Routes>
			</MemoryRouter>,
		)

		expect(screen.getByText('Protected Page')).toBeInTheDocument()
	})
})
