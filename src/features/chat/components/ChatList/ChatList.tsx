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
import { useState } from 'react'
import { BiConversation } from 'react-icons/bi'
import { ChatItem, NewChatModal } from '@features/chat/components'

const ChatList = () => {
	const { chatId } = useParams()
	const [chats, _] = useState(['1', '2'])

	return (
		<Box
			w='full'
			maxWidth={chatId ? { md: '300px', xl: '380px' } : '100%'}
			px={chatId ? 0 : { base: 4, md: 8 }}
		>
			{!chatId && (
				<Box pt={7}>
					<HStack
						alignItems='center'
						justifyContent='space-between'
						mb={4}
					>
						<Heading>Chats</Heading>
						<NewChatModal />
					</HStack>
					{chats.length !== 0 && (
						<SimpleGrid
							templateColumns='repeat(18, 1fr)'
							gap={0}
						>
							<GridItem colSpan={{ base: 9, md: 13, lg: 14 }}>
								<Button
									color='brand.text/50'
									variant='ghost'
									px={{ base: 0, md: 4 }}
								>
									Name <IoIosArrowDown />
								</Button>
							</GridItem>
							<GridItem colSpan={{ base: 9, md: 5, lg: 4 }}>
								<Flex justifyContent={{ base: 'end', md: 'start' }}>
									<Button
										color='brand.text/50'
										variant='ghost'
										px={{ base: 0, md: 4 }}
									>
										Last Message <IoIosArrowUp />
									</Button>
								</Flex>
							</GridItem>
						</SimpleGrid>
					)}
				</Box>
			)}
			{chats.length !== 1 && (
				<VStack
					w='full'
					gap={chatId ? 0 : 2.5}
					bg={chatId ? 'white' : 'none'}
					h='full'
					borderRightWidth={chatId ? '1px' : 0}
					borderRightColor='brand.divider'
				>
					<ChatItem
						size={chatId ? 'small' : 'full'}
						name='Severo Mesia'
						chatId={'123'}
						text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
					/>
					<ChatItem
						size={chatId ? 'small' : 'full'}
						name='Narayana Dorina'
						chatId={'456'}
						text='These sequences often show a strong correlation between consecutive or nearby tokens. '
					/>
					<ChatItem
						size={chatId ? 'small' : 'full'}
						name='Lebogang Flavien'
						chatId={'789'}
						text='where x_i represents the ith token in the sequence'
					/>
					<ChatItem
						size={chatId ? 'small' : 'full'}
						name='Juli Líviaa'
						chatId={'112323'}
						text='Funny  😊'
					/>
				</VStack>
			)}

			{chats.length === 0 && (
				<Stack
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
						color='fg.muted'
					>
						Click the button above to create your first chat!
					</Text>
				</Stack>
			)}

			{chats.length === 1 && (
				<Stack gap={2.5}>
					<Skeleton
						height='75px'
						w='full'
					/>
					<Skeleton
						height='75px'
						w='full'
					/>
					<Skeleton
						height='75px'
						w='full'
					/>
					<Skeleton
						height='75px'
						w='full'
					/>
				</Stack>
			)}
		</Box>
	)
}

export default ChatList
