import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'
import MessagesOfflineState from '../MessagesOfflineState.tsx'

describe('MessagesOfflineState component', () => {
	it('renders the empty state message', () => {
		renderWithChakra(<MessagesOfflineState />)

		expect(screen.getByText(/You're currently offline./i)).toBeInTheDocument()
		expect(screen.getByText(/Don't worry, your messages will send once you're back online!/i)).toBeInTheDocument()
	})
})
