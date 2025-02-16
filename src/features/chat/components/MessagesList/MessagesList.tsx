import { Box, Flex } from '@chakra-ui/react'
import { FC, useEffect, useRef } from 'react'
import useIsOffline from '@hooks/useIsOffline.ts'
import { useSearchParams } from 'react-router-dom'
import MessagesLoadingState from './MessagesLoadingState.tsx'
import Messages from './Messages.tsx'
import MessagesEmptyState from './MessagesEmptyState.tsx'
import MessagesOfflineState from './MessagesOfflineState.tsx'
import { IUser, MessageResponse } from '@types'

type MessageListProps = {
	messages: MessageResponse[]
	participant: IUser
	loading: boolean
}

const MessagesList: FC<MessageListProps> = ({ messages = [], participant, loading }) => {
	const listRef = useRef<HTMLDivElement | null>(null)
	const isOffline = useIsOffline()
	const [searchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		if (messages.length === 0) return

		const messageId = searchParams.get('message')

		if (!messageId || !listRef.current) return

		const timeout = setTimeout(() => {
			const element = document.getElementById(`${messageId}`)

			if (element) {
				element.style.background = 'yellow'
				element.scrollIntoView({ behavior: 'smooth', block: 'start' })

				searchParams.delete('message')
				setSearchParams(searchParams, { replace: true })

				setTimeout(() => {
					element.style.background = 'none'
				}, 1000)
			}
		}, 500)

		return () => clearTimeout(timeout)
	}, [messages, listRef, searchParams])

	useEffect(() => {
		if (listRef.current) {
			const lastItem = listRef.current.lastElementChild as HTMLElement | null
			lastItem?.scrollIntoView({ behavior: 'instant' })
		}
	}, [messages])

	return (
		<Box
			flexGrow={1}
			flexShrink={1}
			flexBasis={0}
			overflowY='scroll'
		>
			<Flex
				direction='column'
				justifyContent='end'
				px={{ base: 4, md: 8 }}
				py={2}
				minH='full'
				ref={listRef}
				data-testid='messageList'
			>
				{loading && <MessagesLoadingState />}
				{!loading && messages.length !== 0 && (
					<Messages
						messages={messages}
						participant={participant}
					/>
				)}
				{!loading && messages.length === 0 && !isOffline && <MessagesEmptyState />}
				{!loading && isOffline && <MessagesOfflineState />}
			</Flex>
		</Box>
	)
}

export default MessagesList
