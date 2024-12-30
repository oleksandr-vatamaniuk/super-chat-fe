'use client'

import { Text, useSlotRecipe, Box, RecipeVariantProps, Stack, Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { messageRecipe } from '@theme/slotRecipes'
import { Avatar } from '@components/chakra/avatar.tsx'

type MessageVariantProps = RecipeVariantProps<typeof messageRecipe>

type MessageProps = MessageVariantProps & {
	text: string
}

const Message: FC<MessageProps> = ({ text, variant }) => {
	const recipe = useSlotRecipe({ key: 'message' })
	const styles = recipe({ variant })

	return (
		<Box css={styles.root}>
			<Stack css={styles.container}>
				<Text css={styles.label}>You</Text>
				<Flex css={styles.bubble}>
					<Text css={styles.bubbleText}>{text}</Text>
					<Text css={styles.time}>19:56</Text>
				</Flex>
			</Stack>
			<Avatar
				colorPalette='blue'
				size='md'
				name='Oleksandr Vatamaniuk'
				src={''}
			/>
		</Box>
	)
}

export default Message
