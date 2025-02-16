import { describe, it, expect } from 'vitest'
import AuthLayout from './AuthLayout'
import { screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

describe('AuthLayout component', () => {
	it('renders the grid structure and outlet', () => {
		renderWithChakra(
			<MemoryRouter initialEntries={['/auth']}>
				<Routes>
					<Route
						path='auth'
						element={<AuthLayout />}
					>
						<Route
							index
							element={<div data-testid='outlet-content' />}
						/>
					</Route>
				</Routes>
			</MemoryRouter>,
		)

		expect(screen.getByTestId('outlet-content')).toBeInTheDocument()
	})
})
