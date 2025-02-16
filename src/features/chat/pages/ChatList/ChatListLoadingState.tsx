import { Flex, GridItem, SimpleGrid, Skeleton, Stack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

const ChatListLoadingState = () => {
	const { chatId } = useParams()
	return (
		<Stack
			w='full'
			gap={chatId ? 1 : 2.5}
			bg={chatId ? 'white' : 'none'}
			h='full'
			borderRightWidth={chatId ? '1px' : 0}
			borderRightColor='brand.divider'
		>
			{!chatId && (
				<SimpleGrid
					templateColumns='repeat(18, 1fr)'
					gap={0}
				>
					<GridItem colSpan={{ base: 9, md: 13, lg: 14 }}>
						<Skeleton
							height='20px'
							w='150px'
						/>
					</GridItem>
					<GridItem colSpan={{ base: 9, md: 5, lg: 4 }}>
						<Flex justifyContent={{ base: 'end', md: 'start' }}>
							<Skeleton
								height='20px'
								w='150px'
							/>
						</Flex>
					</GridItem>
				</SimpleGrid>
			)}
			{Array.from({ length: 4 }).map((_, index) => (
				<Skeleton
					key={index}
					height='75px'
					w='full'
				/>
			))}
		</Stack>
	)
}

export default ChatListLoadingState
