import { screen } from '@testing-library/react'
import ChatList from '../ChatList'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { vi } from 'vitest'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'
import { useGetChatsQuery } from '@features/chat/chatApi.ts'

// Mock useParams
vi.mock('react-router-dom', () => ({
	useParams: vi.fn(),
}))

// Mock useSelector
vi.mock('react-redux', () => ({
	useSelector: vi.fn(),
}))

// Mock useGetChatsQuery
vi.mock('@features/chat/chatApi', () => ({
	useGetChatsQuery: vi.fn(),
}))

// Mock Chat-prefixed components
vi.mock('./ChatListHeader', () => ({
	ChatListHeader: () => <div data-testid='chatListHeader'>ChatListHeader</div>,
}))

vi.mock('./ChatListLoadingState', () => ({
	ChatListLoadingState: () => <div data-testid='chatListLoadingState'>ChatListLoadingState</div>,
}))

vi.mock('./ChatItems', () => ({
	ChatItems: () => <div data-testid='chatItems'>ChatItems</div>,
}))

vi.mock('./ChatListEmptyState', () => ({
	ChatListEmptyState: () => <div data-testid='chatListEmptyState'>ChatListEmptyState</div>,
}))

describe('ChatList Component', () => {
	beforeEach(() => {
		// Reset all mocks before each test
		vi.clearAllMocks()

		vi.mocked(useSelector).mockReturnValue(['312'])
		vi.mocked(useParams).mockReturnValue({ chatId: undefined })

		// Mock useGetChatsQuery to return data and loading state
		vi.mocked(useGetChatsQuery as any).mockReturnValue({
			chats: [],
			isLoading: false,
		})
	})

	// it('renders the ChatList component without a chatId', () => {
	// 	renderWithChakra(<ChatList />)
	//
	// 	// Check if the main container is rendered
	// 	expect(screen.getByTestId('chatListBox')).toBeInTheDocument()
	//
	// 	// Check if ChatListHeader is rendered (since chatId is undefined)
	// 	expect(screen.getByTestId('chatListHeader')).toBeInTheDocument()
	//
	// 	// Check if ChatItems is not rendered (since chats are empty)
	// 	expect(screen.queryByTestId('chatItems')).not.toBeInTheDocument()
	//
	// 	// Check if ChatListEmptyState is rendered (since chats are empty)
	// 	expect(screen.getByTestId('chatListEmptyState')).toBeInTheDocument()
	// })

	it('renders the ChatList component with a chatId', () => {
		// Mock useParams to return a chatId
		vi.mocked(useParams).mockReturnValue({ chatId: '123' })

		renderWithChakra(<ChatList />)

		// Check if ChatListHeader is not rendered (since chatId is defined)
		expect(screen.queryByTestId('chatListHeader')).not.toBeInTheDocument()

		// Check if ChatItems is not rendered (since chats are empty)
		expect(screen.queryByTestId('chatItems')).not.toBeInTheDocument()

		// Check if ChatListEmptyState is rendered (since chats are empty)
		expect(screen.getByTestId('chatListEmptyState')).toBeInTheDocument()
	})

	// it('renders the loading state when isLoading is true', () => {
	// 	// Mock useGetChatsQuery to return isLoading as true
	// 	vi.mocked(useGetChatsQuery as any).mockReturnValue({
	// 		chats: [],
	// 		isLoading: true,
	// 	})
	//
	// 	renderWithChakra(<ChatList />)
	//
	// 	// Check if ChatListLoadingState is rendered
	// 	expect(screen.getByTestId('chatListLoadingState')).toBeInTheDocument()
	//
	// 	// Check if ChatListHeader is rendered (since chatId is undefined)
	// 	expect(screen.getByTestId('chatListHeader')).toBeInTheDocument()
	//
	// 	// Check if ChatItems and ChatListEmptyState are not rendered
	// 	expect(screen.queryByTestId('chatItems')).not.toBeInTheDocument()
	// 	expect(screen.queryByTestId('chatListEmptyState')).not.toBeInTheDocument()
	// })

	// it('renders the ChatItems component when chats are available', () => {
	// 	vi.mocked(useGetChatsQuery as any).mockReturnValue({
	// 		chats: [{ id: '1', name: 'Chat 1' }],
	// 		isLoading: false,
	// 	})
	//
	//
	// 	renderWithChakra(<ChatList />)
	//
	// 	// Check if ChatItems is rendered
	// 	expect(screen.getByTestId('chatItems')).toBeInTheDocument()
	//
	// 	// Check if ChatListEmptyState is not rendered
	// 	expect(screen.queryByTestId('chatListEmptyState')).not.toBeInTheDocument()
	// })

	// it('renders the ChatListEmptyState when chats are empty', () => {
	// 	// Mock useGetChatsQuery to return an empty array
	//
	// 	vi.mocked(useGetChatsQuery as any).mockReturnValue({
	// 		chats: [],
	// 		isLoading: false,
	// 	})
	//
	//
	// 	renderWithChakra(<ChatList />)
	//
	// 	// Check if ChatListEmptyState is rendered
	// 	expect(screen.getByTestId('chatListEmptyState')).toBeInTheDocument()
	//
	// 	// Check if ChatItems is not rendered
	// 	expect(screen.queryByTestId('chatItems')).not.toBeInTheDocument()
	// })
})
