import {
	Box,
	Button,
	Flex,
	GridItem,
	Heading,
	HStack,
	SimpleGrid,
	Skeleton,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useParams } from 'react-router-dom'
import { BiConversation } from 'react-icons/bi'
import { ChatItem, NewChatModal } from '@features/chat/components'
import { useGetChatsQuery } from '@store/chat/chatApi.ts'
import { useSelector } from 'react-redux'
import { selectOnlineUsers } from '@store/chat/chatSlice.ts'
import useIsOffline from '@hooks/useIsOffline.ts'
import useSortedChats from '@features/chat/hooks/useSortedChats.ts'

const ChatList = () => {
	const { chatId } = useParams()
	const isOffline = useIsOffline()

	const { data: chats = [], isLoading } = useGetChatsQuery(undefined)

	const onlineUsers = useSelector(selectOnlineUsers)

	const { sortedChats, setOrdering, ordering } = useSortedChats(chats, {
		key: 'date',
		order: 'desc',
	})

	const renderHeader = () => (
		<Box pt={7}>
			<HStack
				alignItems='center'
				justifyContent='space-between'
				mb={4}
			>
				<Heading>Chats</Heading>
				<NewChatModal disabled={isLoading || isOffline} />
			</HStack>
			{!isLoading && chats.length > 0 && (
				<SimpleGrid
					templateColumns='repeat(18, 1fr)'
					gap={0}
				>
					<GridItem colSpan={{ base: 9, md: 13, lg: 14 }}>
						<Button
							color='brand.text/50'
							variant='ghost'
							px={{ base: 0, md: 4 }}
							onClick={() => setOrdering('name')}
						>
							Name {ordering.key === 'name' && (ordering.order === 'desc' ? <IoIosArrowDown /> : <IoIosArrowUp />)}
						</Button>
					</GridItem>
					<GridItem colSpan={{ base: 9, md: 5, lg: 4 }}>
						<Flex justifyContent={{ base: 'end', md: 'start' }}>
							<Button
								color='brand.text/50'
								variant='ghost'
								px={{ base: 0, md: 4 }}
								onClick={() => setOrdering('date')}
							>
								Last Message{' '}
								{ordering.key === 'date' && (ordering.order === 'desc' ? <IoIosArrowDown /> : <IoIosArrowUp />)}
							</Button>
						</Flex>
					</GridItem>
				</SimpleGrid>
			)}
		</Box>
	)

	const renderChatItems = () => (
		<VStack
			w='full'
			gap={chatId ? 0 : 2.5}
			bg={chatId ? 'white' : 'none'}
			h='full'
			borderRightWidth={chatId ? '1px' : 0}
			borderRightColor='brand.divider'
		>
			{sortedChats.map(({ _id, unreadMessagesCount, lastMessage, participant }: any) => {
				const isParticipantOnline = onlineUsers.includes(participant._id)
				return (
					<ChatItem
						isOnline={isParticipantOnline}
						key={_id}
						size={chatId ? 'small' : 'full'}
						participant={participant}
						messageText={lastMessage.message}
						messageTime={lastMessage.createdAt}
						unreadMessagesCount={unreadMessagesCount}
					/>
				)
			})}
		</VStack>
	)

	const renderNoChats = () => (
		<Stack
			h={chatId ? 'full' : 'auto'}
			bg={chatId ? 'white' : 'none'}
			borderRightWidth={chatId ? '1px' : 0}
			borderRightColor='brand.divider'
			p={8}
			alignItems='center'
			gap={4}
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

	const renderLoadingSkeletons = () => (
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

	return (
		<Box
			w='full'
			maxWidth={chatId ? { md: '300px', xl: '380px' } : '100%'}
			px={chatId ? 0 : { base: 4, md: 8 }}
		>
			{!chatId && renderHeader()}
			{isLoading && renderLoadingSkeletons()}
			{!isLoading && chats.length > 0 && renderChatItems()}
			{!isLoading && chats.length === 0 && renderNoChats()}
		</Box>
	)
}

export default ChatList
