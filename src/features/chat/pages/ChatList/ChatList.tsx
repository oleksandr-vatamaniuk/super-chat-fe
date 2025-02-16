import { Box, Button, Flex, GridItem, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useParams } from 'react-router-dom'
import { ChatItemList, NewChatModal } from '@features/chat/components'
import { useGetChatsQuery } from '@features/chat/chatApi.ts'
import { useSelector } from 'react-redux'
import { selectOnlineUsers } from '@features/chat/chatSlice.ts'
import useIsOffline from '@hooks/useIsOffline.ts'
import useSortedChats from '@features/chat/hooks/useSortedChats.ts'
import ChatListEmptyState from './ChatListEmptyState.tsx'
import ChatListLoadingState from './ChatListLoadingState.tsx'
import { FC } from 'react'

const ChatListHeader: FC<{ isLoading: boolean }> = ({ isLoading }) => {
	const isOffline = useIsOffline()

	return (
		<Box pt={7}>
			<HStack
				alignItems='center'
				justifyContent='space-between'
				mb={4}
			>
				<Heading>Chats</Heading>
				<NewChatModal disabled={isLoading || isOffline} />
			</HStack>
		</Box>
	)
}

const ChatItems: FC<{ chats: any[]; chatId: string | undefined; onlineUsers: any[] }> = ({
	chats,
	chatId,
	onlineUsers,
}) => {
	const { sortedChats, setOrdering, ordering } = useSortedChats(chats, {
		key: 'date',
		order: 'desc',
	})

	return (
		<>
			{!chatId && (
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
			<VStack
				w='full'
				gap={chatId ? 0 : 2.5}
				bg={chatId ? 'white' : 'none'}
				h='full'
				borderRightWidth={chatId ? '1px' : 0}
				borderRightColor='brand.divider'
				data-testid='chatStack'
			>
				{sortedChats.map(({ _id, unreadMessagesCount, lastMessage, participant }: any) => {
					const isParticipantOnline = onlineUsers.includes(participant._id)
					return (
						<ChatItemList
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
		</>
	)
}

const ChatList = () => {
	const { chatId } = useParams()
	const { data: chats = [], isLoading } = useGetChatsQuery(undefined)
	const onlineUsers = useSelector(selectOnlineUsers)

	return (
		<Box
			data-testid='chatListBox'
			w='full'
			maxWidth={chatId ? { md: '300px', xl: '380px' } : '100%'}
			px={chatId ? 0 : { base: 4, md: 8 }}
		>
			{!chatId && <ChatListHeader isLoading={isLoading} />}
			{isLoading && <ChatListLoadingState />}
			{!isLoading && chats.length > 0 && (
				<ChatItems
					chatId={chatId}
					chats={chats}
					onlineUsers={onlineUsers}
				/>
			)}
			{!isLoading && chats.length === 0 && <ChatListEmptyState />}
		</Box>
	)
}

export default ChatList
