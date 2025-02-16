import { screen } from '@testing-library/react'
import MainLayout from './MainLayout'
import { vi } from 'vitest'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

vi.mock('react-router-dom', () => ({
	Outlet: () => <div data-testid='outlet' />,
}))

vi.mock('@features/user/components', () => ({
	Header: () => <div data-testid='header' />,
	Navigation: () => <div data-testid='navigation' />,
}))

describe('MainLayout Component', () => {
	it('renders the header, navigation, and outlet', () => {
		renderWithChakra(<MainLayout />)

		expect(screen.getByTestId('header')).toBeInTheDocument()
		expect(screen.getByTestId('navigation')).toBeInTheDocument()
		expect(screen.getByTestId('outlet')).toBeInTheDocument()
	})
})
