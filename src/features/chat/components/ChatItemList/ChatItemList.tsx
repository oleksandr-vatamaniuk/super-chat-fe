'use client'

import {
	GridItem,
	SimpleGrid,
	Text,
	HStack,
	Stack,
	Flex,
	Float,
	Circle,
	Box,
	useSlotRecipe,
	RecipeVariantProps,
} from '@chakra-ui/react'
import { FC } from 'react'
import { NavLink as ReactRouterLink } from 'react-router-dom'
import { chatItemRecipe } from '@theme/slotRecipes'
import { Avatar } from '@components/chakra/avatar.tsx'
import { getRelativeTime } from '@utils/getRelativeTime.ts'
import { IUser } from '@types'

type ChatItemVariantProps = RecipeVariantProps<typeof chatItemRecipe>

type ChatItemProps = ChatItemVariantProps & {
	isOnline: boolean
	unreadMessagesCount: number
	messageTime: string
	messageText: string
	participant: IUser
}

const ChatItemList: FC<ChatItemProps> = ({
	isOnline,
	messageText,
	size,
	unreadMessagesCount,
	messageTime,
	participant: { name, avatar, _id: participantId },
}) => {
	const recipe = useSlotRecipe({ key: 'chatItem' })
	const styles = recipe({ size })

	return (
		<Box
			asChild
			w='full'
			display='inline-block'
		>
			<ReactRouterLink to={`/chat/${participantId}`}>
				{({ isActive }) => (
					<SimpleGrid
						templateColumns='repeat(18, 1fr)'
						css={styles.root}
						bg={isActive ? 'brand.blue.200' : 'white'}
						_hover={{ bg: 'brand.blue.200' }}
					>
						<GridItem colSpan={{ base: 12, md: 13, lg: 14 }}>
							<HStack
								px={4}
								gap={3}
							>
								<Avatar
									colorPalette='blue'
									size='md'
									name={name}
									src={avatar}
								>
									{isOnline && (
										<Float
											placement='top-end'
											offsetX='1'
											offsetY='1'
										>
											<Circle
												bg='brand.status'
												size='8px'
												outline='2px solid'
												outlineColor='bg'
											/>
										</Float>
									)}
								</Avatar>
								<Stack
									gap={0}
									w='full'
								>
									<Text
										textStyle='sm'
										fontWeight='medium'
										color='brand.heading'
										mb={0.5}
									>
										{name}
									</Text>
									<Flex>
										<Text
											fontWeight='normal'
											fontSize='sm'
											color='brand.text'
											h='20px'
											overflow='hidden'
											lineBreak='anywhere'
										>
											{messageText}
										</Text>
										{size === 'full' && unreadMessagesCount !== 0 && (
											<Circle
												ml={1}
												fontSize='xs'
												size='5'
												bg='brand.status'
												color='white'
											>
												{unreadMessagesCount}
											</Circle>
										)}
									</Flex>
								</Stack>
							</HStack>
						</GridItem>
						<GridItem colSpan={{ base: 6, md: 5, lg: 4 }}>
							<Flex css={styles.detail}>
								<Text
									color='brand.grey.450'
									textStyle={size === 'small' ? 'xs' : 'sm'}
								>
									{getRelativeTime(messageTime)}
								</Text>
								{size === 'small' && unreadMessagesCount !== 0 && (
									<Circle
										fontSize='xs'
										size='5'
										bg='brand.status'
										color='white'
									>
										{unreadMessagesCount}
									</Circle>
								)}
								<Text css={styles.fakeLink}>Message</Text>
							</Flex>
						</GridItem>
					</SimpleGrid>
				)}
			</ReactRouterLink>
		</Box>
	)
}

export default ChatItemList
