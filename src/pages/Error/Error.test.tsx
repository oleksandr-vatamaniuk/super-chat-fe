import { screen } from '@testing-library/react'
import Error from './Error'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

describe('Error component', () => {
	test('renders the Error component', () => {
		renderWithChakra(<Error />)

		// Check for the image element
		const image = screen.getByAltText('Waving hand emoji')
		expect(image).toBeInTheDocument()
		expect(image).toHaveAttribute('src', '/images/waving-hand.png')

		// Check for the 404 heading
		const heading = screen.getByRole('heading', { level: 2 })
		expect(heading).toBeInTheDocument()
		expect(heading).toHaveTextContent('404')

		// Check for the text message
		const message = screen.getByText(/Oops! Something went wrong./i)
		expect(message).toBeInTheDocument()
	})
})
