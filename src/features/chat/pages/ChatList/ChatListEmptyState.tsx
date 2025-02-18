import { Box, Stack, Text } from '@chakra-ui/react'
import { BiConversation } from 'react-icons/bi'
import { useParams } from 'react-router-dom'

const ChatListEmptyState = () => {
	const { chatId } = useParams()

	return (
		<Stack
			h={chatId ? 'full' : 'auto'}
			bg={chatId ? 'white' : 'none'}
			borderRightWidth={chatId ? '1px' : 0}
			borderRightColor='brand.divider'
			p={8}
			alignItems='center'
			gap={4}
			data-testid='chatListEmptyState'
		>
			<Box color='fg.muted'>
				<BiConversation size={32} />
			</Box>
			<Text
				color='brand.text'
				fontWeight='semibold'
			>
				No Chats Yet
			</Text>
			<Text
				textStyle='sm'
				textAlign={'center'}
				color='fg.muted'
			>
				Click the button above to create your first chat!
			</Text>
		</Stack>
	)
}

export default ChatListEmptyState
