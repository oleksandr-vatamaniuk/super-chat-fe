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

type ChatItemVariantProps = RecipeVariantProps<typeof chatItemRecipe>

type ChatItemProps = ChatItemVariantProps & {
	name: string
	chatId: string
	text: string
}

const ChatItem: FC<ChatItemProps> = ({ name, chatId, text, size }) => {
	const recipe = useSlotRecipe({ key: 'chatItem' })
	const styles = recipe({ size })

	return (
		<Box
			asChild
			w='full'
			display='inline-block'
		>
			<ReactRouterLink to={`/chat/${chatId}`}>
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
									src={''}
								>
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
											{text}
										</Text>
										{size === 'full' && chatId !== '789' && (
											<Circle
												ml={1}
												fontSize='xs'
												size='5'
												bg='brand.status'
												color='white'
											>
												3
											</Circle>
										)}
										{/*{size === 'full' && chatId !== '789' && <Box css={styles.messageCount}>3</Box>}*/}
									</Flex>
								</Stack>
							</HStack>
						</GridItem>
						<GridItem colSpan={{ base: 6, md: 5, lg: 4 }}>
							<Flex css={styles.detail}>
								<Box
									as='span'
									fontWeight='normal'
									fontSize='sm'
									color='brand.grey.450'
								>
									21/04/2021
								</Box>
								{size === 'small' && chatId !== '789' && (
									<Circle
										fontSize='xs'
										size='5'
										bg='brand.status'
										color='white'
									>
										3
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

export default ChatItem
