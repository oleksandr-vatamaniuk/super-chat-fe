import { Text } from '@chakra-ui/react'

const MessagesOfflineState = () => {
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

export default MessagesOfflineState
