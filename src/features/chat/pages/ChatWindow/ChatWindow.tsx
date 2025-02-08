import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Stack } from '@chakra-ui/react'
import { ChatHeader, MessageList, MessageInput } from '@features/chat/components'
import useGetChatParticipant from '@features/chat/hooks/useGetChatParticipant.ts'
import { chatApiSlice, useGetMessagesQuery, useMarkAsReadMessagesMutation } from '@features/chat/chatApi.ts'
import { setCurrentParticipant } from '@features/chat/chatSlice.ts'
import WebSocket from '@store/websocket.ts'
import useIsOffline from '@hooks/useIsOffline.ts'

const ChatWindow = () => {
	const { chatId } = useParams()
	const navigate = useNavigate()
	const isOffline = useIsOffline()
	const dispatch = useDispatch()

	const {
		data: participant,
		isError: isErrorParticipant,
		isSuccess: isSuccessParticipant,
		isLoading: isLoadingParticipant,
	} = useGetChatParticipant(chatId!)

	const {
		currentData: messages = [],
		isFetching: isMessagesLoading,
		isError,
	} = useGetMessagesQuery(chatId!, {
		skip: !isSuccessParticipant,
	})

	const [markAsReadMessages] = useMarkAsReadMessagesMutation()

	const isLoading = isLoadingParticipant || isMessagesLoading

	useEffect(() => {
		if (isError && isOffline) {
			// @ts-ignore
			dispatch(chatApiSlice.util.upsertQueryData('getMessages', chatId, []))
		}
	}, [isError, isOffline])

	useEffect(() => {
		if (isErrorParticipant) {
			navigate('/chat')
		}
	}, [isErrorParticipant])

	useEffect(() => {
		if (isSuccessParticipant) {
			dispatch(setCurrentParticipant(participant))
		}
		return () => {
			dispatch(setCurrentParticipant({}))
		}
	}, [isSuccessParticipant, participant, dispatch])

	useEffect(() => {
		if (!isOffline) {
			const socket = WebSocket.getInstance()
			if (socket) {
				socket.on('deleteChat', ({ participant }) => {
					if (participant._id === chatId) {
						navigate('/chat')
					}
				})
			}
		}
	}, [isOffline])

	useEffect(() => {
		if (!isOffline && chatId && messages) {
			const unreadByUser = messages.filter((message: any) => message.receiverId !== chatId && !message.readByReceiver)

			if (unreadByUser.length !== 0) {
				console.log('markAsReadMessages')
				markAsReadMessages({ chatId })
			}
		}
	}, [messages, chatId, isOffline])

	return (
		<Stack
			w='full'
			flex={1}
			justifyContent='end'
			minHeight='calc(100vh - 75px)'
			height='full'
			bg='brand.grey.100'
			gap={0}
		>
			<ChatHeader
				disabled={isLoading || isErrorParticipant}
				participant={participant}
			/>
			<MessageList
				messages={messages}
				participant={participant}
				loading={isLoading}
			/>
			<MessageInput disabled={isLoading || isErrorParticipant} />
		</Stack>
	)
}

export default ChatWindow
