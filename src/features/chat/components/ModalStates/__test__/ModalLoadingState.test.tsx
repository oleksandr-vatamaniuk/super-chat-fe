import { screen } from '@testing-library/react'
import ModalLoadingState from '../ModalLoadingState'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

describe('ModalLoadingState', () => {
	it('renders correctly', () => {
		renderWithChakra(<ModalLoadingState />)

		// Check if the main container is rendered
		const container = screen.getByTestId('modalLoadingState')
		expect(container).toBeInTheDocument()

		// Check if the correct number of skeleton items are rendered
		const skeletonCircles = screen.getAllByRole('progressbar') // SkeletonCircle uses a progressbar role
		expect(skeletonCircles).toHaveLength(3)
	})
})
