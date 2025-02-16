import { Box, Stack, Text } from '@chakra-ui/react'
import { GoInbox } from 'react-icons/go'
import { FC } from 'react'

const NewChatModalEmptyState: FC<{ searchQuery: string }> = ({ searchQuery }) => (
	<Stack
		p={8}
		alignItems='center'
		gap={4}
	>
		<Box color='fg.muted'>
			<GoInbox size={32} />
		</Box>
		<Text color='fg.muted'>
			No results found for{' '}
			<Box
				fontWeight='semibold'
				as='span'
			>
				{searchQuery}
			</Box>
		</Text>
	</Stack>
)

export default NewChatModalEmptyState
