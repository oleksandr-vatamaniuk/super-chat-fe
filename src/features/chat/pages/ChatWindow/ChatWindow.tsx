import { Box, Stack } from '@chakra-ui/react'
import { ChatHeader, Message, MessageInput } from '@features/chat/components'

const ChatWindow = () => {
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
			<ChatHeader />
			<Box
				flexGrow={1}
				flexShrink={1}
				flexBasis={0}
				overflowY='scroll'
			>
				<Box
					px={{ base: 4, md: 8 }}
					py={2}
				>
					<Message
						variant='sender'
						text='Hello Nora, thank you for calling Provide Support. How may I help you?'
					/>
					<Message
						variant='receiver'
						text="Please hold for one moment, I'll check with my manager."
					/>
					<Message
						variant='sender'
						text="I'm sorry, I don't have the answer to that question. May I put you on hold for a few minutes while I check with my manager?"
					/>
					<Message
						variant='receiver'
						text="Please hold for one moment, I'll check with my manager."
					/>
					<Message
						variant='receiver'
						text="Please hold for one moment, I'll check with my manager."
					/>
					<Message
						variant='sender'
						text='Hello Wolrd'
					/>
					<Message
						variant='receiver'
						text='Hello Wolrd 200'
					/>
				</Box>
			</Box>
			<MessageInput />
		</Stack>
	)
}

export default ChatWindow
