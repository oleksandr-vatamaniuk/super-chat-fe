import { Box, Flex } from '@chakra-ui/react'
import { Message, MessageSkeleton } from '@features/chat/components'
import { useSelector } from 'react-redux'
import { selectUser } from '@store/user/userSlice.ts'
import { FC, useEffect, useRef } from 'react'

type MessageListProps = {
	messages: any[]
	participant: any
	loading: boolean
}

const MessageList: FC<MessageListProps> = ({ messages = [], participant, loading }) => {
	const { _id: userId, avatar: userAvatar } = useSelector(selectUser)
	const listRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (listRef.current) {
			const lastItem = listRef.current.lastElementChild as HTMLElement | null
			lastItem?.scrollIntoView({ behavior: 'instant' })
		}
	}, [messages])

	const renderMessages = () => {
		return messages.map(({ _id, message, createdAt, senderId }: any, index: number) => {
			const isFirstMessage = index === 0
			const isLastMessage = index === messages.length - 1

			const showName = isFirstMessage || messages[index - 1]?.senderId !== senderId

			const showAvatar = isLastMessage || messages[index + 1]?.senderId !== senderId

			return (
				<Message
					key={_id}
					text={message}
					time={createdAt}
					variant={userId === senderId ? 'sender' : 'receiver'}
					name={userId === senderId ? 'You' : participant?.name}
					avatar={userId === senderId ? userAvatar : participant?.avatar}
					showName={showName}
					showAvatar={showAvatar}
				/>
			)
		})
	}

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
			>
				{loading ? <MessageSkeleton /> : renderMessages()}
			</Flex>
		</Box>
	)
}

export default MessageList
