import { Text } from '@chakra-ui/react'

const MessagesEmptyState = () => {
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

export default MessagesEmptyState
