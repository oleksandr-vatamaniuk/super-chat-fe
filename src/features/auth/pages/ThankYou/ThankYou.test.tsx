import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ThankYou from './ThankYou'
import { describe, it, expect } from 'vitest'
import { ChakraProvider } from '@chakra-ui/react'
import config from '@theme/theme.ts'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

describe('ThankYou Component', () => {
	it('redirects to /login if name or email query parameters are missing', () => {
		renderWithChakra(
			<MemoryRouter initialEntries={['/thank-you']}>
				<Routes>
					<Route
						path='/thank-you'
						element={<ThankYou />}
					/>
					<Route
						path='/login'
						element={<div>Login Page</div>}
					/>
				</Routes>
			</MemoryRouter>,
		)

		// Verify redirection to /login
		expect(screen.getByText('Login Page')).toBeInTheDocument()
	})

	it('renders the correct content when name and email query parameters are present', () => {
		render(
			<ChakraProvider value={config}>
				<MemoryRouter initialEntries={['/thank-you?name=John&email=john@example.com']}>
					<Routes>
						<Route
							path='/thank-you'
							element={<ThankYou />}
						/>
					</Routes>
				</MemoryRouter>
			</ChakraProvider>,
		)

		// Verify the content is rendered correctly
		expect(screen.getByText('Hi, John')).toBeInTheDocument()
		expect(screen.getByText(/Please check your email/)).toBeInTheDocument()
		expect(screen.getByText(/john@example.com/)).toBeInTheDocument()
		expect(screen.getByRole('img', { name: 'Waving hand emoji' })).toBeInTheDocument()
	})
})
