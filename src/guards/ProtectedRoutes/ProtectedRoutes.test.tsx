import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetChatsQuery } from '@features/chat/chatApi'
import { useGetCurrentUserQuery } from '@features/user/userApi'
import ProtectedRoutes from './ProtectedRoutes'
import { vi } from 'vitest'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

vi.mock('react-redux', () => ({
	useSelector: vi.fn(),
}))
vi.mock('@features/chat/chatApi', () => ({
	useGetChatsQuery: vi.fn(),
}))
vi.mock('@features/user/userApi', () => ({
	useGetCurrentUserQuery: vi.fn(),
}))

describe('ProtectedRoutes', () => {
	it('redirects to /login if no token is present', () => {
		vi.mocked(useSelector).mockReturnValue(null)
		vi.mocked(useGetCurrentUserQuery as any).mockReturnValue({ isLoading: false, isError: false })
		vi.mocked(useGetChatsQuery as any).mockReturnValue({ isLoading: false, isError: false })

		render(
			<MemoryRouter initialEntries={['/protected']}>
				<ProtectedRoutes />
			</MemoryRouter>,
		)

		expect(screen.queryByText('Protected Page')).not.toBeInTheDocument()
	})

	it('redirects to /login if user fetch fails', () => {
		vi.mocked(useSelector).mockReturnValue('mocked-token')
		vi.mocked(useGetCurrentUserQuery as any).mockReturnValue({ isLoading: false, isError: true })
		vi.mocked(useGetChatsQuery as any).mockReturnValue({ isLoading: false, isError: false })

		render(
			<MemoryRouter initialEntries={['/protected']}>
				<ProtectedRoutes />
			</MemoryRouter>,
		)

		expect(screen.queryByText('Protected Page')).not.toBeInTheDocument()
	})

	it('shows loading if user or chat data is loading', () => {
		vi.mocked(useSelector).mockReturnValue('mocked-token')
		vi.mocked(useGetCurrentUserQuery as any).mockReturnValue({ isLoading: true, isError: false })
		vi.mocked(useGetChatsQuery as any).mockReturnValue({ isLoading: true, data: null })

		renderWithChakra(
			<MemoryRouter initialEntries={['/protected']}>
				<ProtectedRoutes />
			</MemoryRouter>,
		)

		expect(screen.getByTestId('loading-box')).toBeInTheDocument()
	})

	it('renders the child routes when authenticated and data is loaded', () => {
		vi.mocked(useSelector).mockReturnValue('mocked-token')
		vi.mocked(useGetCurrentUserQuery as any).mockReturnValue({ isLoading: false, isError: false })
		vi.mocked(useGetChatsQuery as any).mockReturnValue({ isLoading: false, data: [{ id: 1, name: 'Chat 1' }] })

		render(
			<MemoryRouter initialEntries={['/protected']}>
				<Routes>
					<Route element={<ProtectedRoutes />}>
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
