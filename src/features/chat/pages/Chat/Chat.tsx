import { Box, HStack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { ChatList } from '@features/chat/components'

const Chat = () => {
	return (
		<>
			<HStack
				align='top'
				gap={0}
			>
				<ChatList />
				<Box flex={1}>
					<Outlet />
				</Box>
			</HStack>
		</>
	)
}

export default Chat
