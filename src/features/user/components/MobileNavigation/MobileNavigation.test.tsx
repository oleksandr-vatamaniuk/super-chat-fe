import { screen } from '@testing-library/react'
import MobileNavigation from './MobileNavigation'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

describe('MobileNavigation', () => {
	it('renders the mobile menu button', () => {
		renderWithChakra(<MobileNavigation />)
		expect(screen.getByRole('button')).toBeInTheDocument()
	})
})
