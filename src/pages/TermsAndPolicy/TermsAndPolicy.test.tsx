import { screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { vi } from 'vitest'
import TermsAndPolicy from './TermsAndPolicy'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
	return {
		...actual,
		useNavigate: vi.fn(),
	}
})

describe('TermsAndPolicy Component', () => {
	it('renders correctly with headings and content', () => {
		renderWithChakra(
			<MemoryRouter>
				<TermsAndPolicy />
			</MemoryRouter>,
		)

		// Check for the main heading
		expect(screen.getByRole('heading', { name: /product legal information/i })).toBeInTheDocument()

		// Check for subheadings
		expect(screen.getByRole('heading', { name: /privacy policy/i })).toBeInTheDocument()
		expect(screen.getByRole('heading', { name: /1. the standard lorem ipsum passage/i })).toBeInTheDocument()
		expect(screen.getByRole('heading', { name: /2. the standard lorem ipsum passage/i })).toBeInTheDocument()

		// Check for the Back button
		expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
	})

	it('navigates back when back button is clicked', () => {
		const mockNavigate = vi.fn()
		vi.mocked(useNavigate).mockReturnValue(mockNavigate)

		renderWithChakra(
			<MemoryRouter>
				<TermsAndPolicy />
			</MemoryRouter>,
		)

		// Click the back button
		const backButton = screen.getByRole('button', { name: /back/i })
		fireEvent.click(backButton)

		// Expect navigation to be triggered with -1
		expect(mockNavigate).toHaveBeenCalledWith(-1)
	})
})
