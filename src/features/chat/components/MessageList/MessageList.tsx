import { Box, Flex, Text } from '@chakra-ui/react'
import { Message, MessageSkeleton } from '@features/chat/components'
import { useSelector } from 'react-redux'
import { selectUser } from '@store/user/userSlice.ts'
import { FC, useEffect, useRef } from 'react'
import useIsOffline from '@hooks/useIsOffline.ts'
import { useSearchParams } from 'react-router-dom'

type MessageListProps = {
	messages: any[]
	participant: any
	loading: boolean
}

const MessageList: FC<MessageListProps> = ({ messages = [], participant, loading }) => {
	const { _id: userId, avatar: userAvatar } = useSelector(selectUser)
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

	const renderMessages = () => {
		return messages.map(({ _id, message, createdAt, senderId }: any, index: number) => {
			const isFirstMessage = index === 0
			const isLastMessage = index === messages.length - 1

			const showName = isFirstMessage || messages[index - 1]?.senderId !== senderId

			const showAvatar = isLastMessage || messages[index + 1]?.senderId !== senderId

			return (
				<Message
					key={_id}
					id={_id}
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

	const renderNoMessages = () => {
		return (
			<Text
				textStyle='sm'
				textAlign={'center'}
				color='brand.grey.300'
				pb={3}
			>
				No messages yet. <br />
				Send a message and break the silence!
			</Text>
		)
	}

	const renderOffline = () => {
		return (
			<Text
				textStyle='sm'
				textAlign={'center'}
				color='brand.grey.300'
				pb={3}
			>
				You're currently offline. <br />
				Don't worry, your messages will send once you're back online!
			</Text>
		)
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
				{loading && <MessageSkeleton />}
				{!loading && messages.length !== 0 && renderMessages()}
				{!loading && isOffline && renderOffline()}
				{!loading && messages.length === 0 && !isOffline && renderNoMessages()}
			</Flex>
		</Box>
	)
}

export default MessageList
