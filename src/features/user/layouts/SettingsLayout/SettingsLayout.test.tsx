import renderWithChakra from '@testUtils/renderWithChakra.tsx'
import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import SettingsLayout from './SettingsLayout'
import { useSelector } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

vi.mock('react-redux', () => ({
	useSelector: vi.fn(),
}))

describe('SettingsLayout Component', () => {
	it('renders the heading and navigation links', () => {
		;(useSelector as any).mockReturnValue({ authProvider: 'MAIL' })
		renderWithChakra(
			<MemoryRouter>
				<SettingsLayout />
			</MemoryRouter>,
		)

		expect(screen.getByText(/Manage your Account/i)).toBeInTheDocument()
		expect(screen.getByText(/Edit Information/i)).toBeInTheDocument()
		expect(screen.getByText(/User Avatar/i)).toBeInTheDocument()
		expect(screen.getByText(/Change Password/i)).toBeInTheDocument()
	})

	it('does not render Change Password tab when authProvider is not MAIL', () => {
		;(useSelector as any).mockReturnValue({ authProvider: 'GOOGLE' })
		renderWithChakra(
			<MemoryRouter>
				<SettingsLayout />
			</MemoryRouter>,
		)

		expect(screen.getByText(/Edit Information/i)).toBeInTheDocument()
		expect(screen.getByText(/User Avatar/i)).toBeInTheDocument()
		expect(screen.queryByText(/Change Password/i)).not.toBeInTheDocument()
	})
})
