import { screen } from '@testing-library/react'
import ModalEmptyState from '../ModalEmptyState'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

describe('ModalEmptyState', () => {
	it('renders correctly with a search query', () => {
		const searchQuery = 'example'
		renderWithChakra(<ModalEmptyState searchQuery={searchQuery} />)

		expect(screen.getByText(`No results found for`)).toBeInTheDocument()

		expect(screen.getByText(searchQuery)).toBeInTheDocument()
	})
})
