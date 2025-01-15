import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Stack } from '@chakra-ui/react'
import { ChatHeader, MessageList, MessageInput } from '@features/chat/components'
import useGetChatParticipant from '@features/chat/hooks/useGetChatParticipant.ts'
import { useGetMessagesQuery, useMarkAsReadMessagesMutation } from '@store/chat/chatApi.ts'
import { setCurrentParticipant } from '@store/chat/chatSlice.ts'
import WebSocket from '@store/websocket.ts'

const ChatWindow = () => {
	const { chatId } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const {
		data: participant,
		isError: isErrorParticipant,
		isSuccess: isSuccessParticipant,
		isLoading: isLoadingParticipant,
	} = useGetChatParticipant(chatId!)

	const { data: messages = [], isLoading: isMessagesLoading } = useGetMessagesQuery(chatId, {
		skip: !isSuccessParticipant,
	})

	const [markAsReadMessages] = useMarkAsReadMessagesMutation()

	const isLoading = isMessagesLoading || isLoadingParticipant

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
		const socket = WebSocket.getInstance()
		if (socket) {
			socket.on('deleteChat', ({ participant }) => {
				if (participant._id === chatId) {
					navigate('/chat')
				}
			})
		}
	}, [])

	useEffect(() => {
		if (chatId && messages) {
			const unreadByUser = messages.filter((message: any) => message.receiverId !== chatId && !message.readByReceiver)

			if (unreadByUser.length !== 0) {
				markAsReadMessages({ chatId })
			}
		}
	}, [messages, chatId])

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
				disabled={isLoading}
				participant={participant}
			/>
			<MessageList
				messages={messages}
				participant={participant}
				loading={isLoading}
			/>
			<MessageInput disabled={isLoading} />
		</Stack>
	)
}

export default ChatWindow
