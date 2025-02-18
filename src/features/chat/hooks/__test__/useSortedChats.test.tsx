import { renderHook, act } from '@testing-library/react'
import useSortedChats from '../useSortedChats'
import { describe, it, expect } from 'vitest'
import { ChatItem } from '@types'

const mockChats = [
	{
		_id: '1',
		unreadMessagesCount: 0,
		participant: { name: 'Alice' },
		lastMessage: { createdAt: '2024-02-17T10:00:00Z' },
	},
	{
		_id: '2',
		unreadMessagesCount: 0,
		participant: { name: 'Charlie' },
		lastMessage: { createdAt: '2024-02-17T12:00:00Z' },
	},
	{
		_id: '3',
		unreadMessagesCount: 0,
		participant: { name: 'Bob' },
		lastMessage: { createdAt: '2024-02-17T11:00:00Z' },
	},
] as ChatItem[]

describe('useSortedChats hook', () => {
	it('sorts chats by name in ascending order by default', () => {
		const { result } = renderHook(() => useSortedChats(mockChats))
		expect(result.current.sortedChats.map((chat) => chat.participant.name)).toEqual(['Alice', 'Bob', 'Charlie'])
	})

	it('sorts chats by name in descending order when toggled', () => {
		const { result } = renderHook(() => useSortedChats(mockChats))
		act(() => {
			result.current.setOrdering('name')
		})
		expect(result.current.sortedChats.map((chat) => chat.participant.name)).toEqual(['Charlie', 'Bob', 'Alice'])
	})

	it('sorts chats by date in ascending order when set', () => {
		const { result } = renderHook(() => useSortedChats(mockChats, { key: 'date', order: 'asc' }))
		expect(result.current.sortedChats.map((chat) => chat.lastMessage.createdAt)).toEqual([
			'2024-02-17T10:00:00Z',
			'2024-02-17T11:00:00Z',
			'2024-02-17T12:00:00Z',
		])
	})

	it('sorts chats by date in descending order when toggled', () => {
		const { result } = renderHook(() => useSortedChats(mockChats, { key: 'date', order: 'asc' }))
		act(() => {
			result.current.setOrdering('date')
		})
		expect(result.current.sortedChats.map((chat) => chat.lastMessage.createdAt)).toEqual([
			'2024-02-17T12:00:00Z',
			'2024-02-17T11:00:00Z',
			'2024-02-17T10:00:00Z',
		])
	})
})
