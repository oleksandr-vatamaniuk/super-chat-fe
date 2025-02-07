import { useState, useMemo } from 'react'

interface Participant {
	_id: string
	name: string
	updatedAt: string
	avatar: string
}

interface LastMessage {
	_id: string
	senderId: string
	receiverId: string
	message: string
	readByReceiver: boolean
	createdAt: string
	updatedAt: string
}

interface Chat {
	_id: string
	unreadMessagesCount: number
	lastMessage?: LastMessage
	participant: Participant
}

interface SortConfig {
	key: 'name' | 'date'
	order: 'asc' | 'desc'
}

interface UseSortedChatsOptions {
	key?: 'name' | 'date'
	order?: 'asc' | 'desc'
}

const useSortedChats = (chats: Chat[], options: UseSortedChatsOptions = { key: 'name', order: 'asc' }) => {
	const [ordering, setOrdering] = useState<SortConfig>({
		key: options.key || 'name',
		order: options.order || 'asc',
	})

	const sortedChats = useMemo(() => {
		if (!Array.isArray(chats)) return []

		return [...chats].sort((a, b) => {
			let comparison = 0

			if (ordering.key === 'name') {
				const nameA = a.participant.name.toLowerCase()
				const nameB = b.participant.name.toLowerCase()
				comparison = nameA.localeCompare(nameB)
			} else if (ordering.key === 'date') {
				const dateA = new Date(a.lastMessage?.createdAt || 0)
				const dateB = new Date(b.lastMessage?.createdAt || 0)
				comparison = dateA.getTime() - dateB.getTime()
			}

			return ordering.order === 'asc' ? comparison : -comparison
		})
	}, [chats, ordering])

	const setOrderingKey = (key: 'name' | 'date') => {
		setOrdering((prev) => ({
			key,
			order: prev.key === key ? (prev.order === 'asc' ? 'desc' : 'asc') : 'asc',
		}))
	}

	return { sortedChats, setOrdering: setOrderingKey, ordering }
}

export default useSortedChats
