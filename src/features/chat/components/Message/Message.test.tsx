import { screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'
import Message from './Message.tsx'

const mockProps = {
	id: '1',
	name: 'John Doe',
	time: new Date().toISOString(),
	text: 'Hello, world!',
	avatar: 'https://example.com/avatar.jpg',
	showName: true,
	showAvatar: true,
}

describe('Message component', () => {
	it('renders correctly with all props', async () => {
		renderWithChakra(
			<Message
				variant='sender'
				{...mockProps}
			/>,
		)

		expect(screen.getByText(mockProps.name)).toBeInTheDocument()
		expect(screen.getByText(mockProps.text)).toBeInTheDocument()
		await waitFor(() => expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument())
	})

	it('hides name when showName is false', () => {
		renderWithChakra(
			<Message
				variant='sender'
				{...mockProps}
				showName={false}
			/>,
		)
		expect(screen.queryByText(mockProps.name)).not.toBeInTheDocument()
	})

	it('hides avatar when showAvatar is false', async () => {
		renderWithChakra(
			<Message
				variant='receiver'
				{...mockProps}
				showAvatar={false}
			/>,
		)
		await waitFor(() => expect(screen.getByRole('img', { hidden: true })).toHaveStyle('visibility: hidden'))
	})

	it('renders relative time correctly', () => {
		renderWithChakra(
			<Message
				variant='sender'
				{...mockProps}
			/>,
		)
		expect(screen.getByText(/Just now$/)).toBeInTheDocument()
	})
})
