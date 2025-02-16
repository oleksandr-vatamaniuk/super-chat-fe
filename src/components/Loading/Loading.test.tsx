import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Loading from './Loading'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

describe('Loading Component', () => {
	it('renders correctly with the logo image and styles', () => {
		renderWithChakra(<Loading />)

		// Check if the outer Box exists with the correct background color and full width
		const outerBox = screen.getByRole('region')
		expect(outerBox).toHaveStyle({
			background: 'var(--chakra-colors-white)',
			width: 'var(--chakra-sizes-full)',
		})

		// Check if the inner Box has the data-state attribute and animation
		const animatedBox = screen.getByTestId('loading-box')
		expect(animatedBox).toHaveAttribute('data-state', 'open')

		// Check if the Image has the correct src, alt, and width attributes
		const logoImage = screen.getByAltText('Logo')
		expect(logoImage).toHaveAttribute('src', '/images/logo-min.svg')
		expect(logoImage).toHaveStyle({ width: '100px' })
	})
})
