import { describe, it, expect } from 'vitest'
import MessagesEmptyState from '../MessagesEmptyState'
import { screen } from '@testing-library/react'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

describe('MessagesEmptyState component', () => {
	it('renders the empty state message', () => {
		renderWithChakra(<MessagesEmptyState />)

		expect(screen.getByText(/No messages yet./i)).toBeInTheDocument()
		expect(screen.getByText(/Send a message and break the silence!/i)).toBeInTheDocument()
	})
})
