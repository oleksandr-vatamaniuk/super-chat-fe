import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'
import { Chat } from '@features/chat/pages'

vi.mock('@features/chat/components', () => ({
	ChatList: vi.fn(() => <div data-testid='chat-list' />),
}))

describe('Chat component', () => {
	it('renders ChatList and Outlet', () => {
		renderWithChakra(
			<MemoryRouter initialEntries={['/chat']}>
				<Routes>
					<Route
						path='chat'
						element={<Chat />}
					>
						<Route
							index
							element={<div data-testid='outlet-content' />}
						/>
					</Route>
				</Routes>
			</MemoryRouter>,
		)

		expect(screen.getByTestId('chat-list')).toBeInTheDocument()
		expect(screen.getByTestId('outlet-content')).toBeInTheDocument()
	})
})
