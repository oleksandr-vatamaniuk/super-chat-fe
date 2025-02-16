'use client'

import { Text, useSlotRecipe, Box, RecipeVariantProps, Stack, Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { messageRecipe } from '@theme/slotRecipes'
import { Avatar } from '@components/chakra/avatar.tsx'
import { getRelativeTime } from '@utils/getRelativeTime.ts'

type MessageVariantProps = RecipeVariantProps<typeof messageRecipe>

type MessageProps = MessageVariantProps & {
	id: string
	text: string
	time: string
	name: string
	avatar: string
	showName?: boolean
	showAvatar?: boolean
}

const Message: FC<MessageProps> = ({
	id,
	name,
	time,
	text,
	avatar = '',
	variant,
	showName = true,
	showAvatar = true,
}) => {
	const recipe = useSlotRecipe({ key: 'message' })
	const styles = recipe({ variant })

	return (
		<Box
			css={styles.root}
			id={id}
		>
			<Stack css={styles.container}>
				{showName && <Text css={styles.label}>{name}</Text>}
				<Flex css={styles.bubble}>
					<Text css={styles.bubbleText}>{text}</Text>
					<Text css={styles.time}>{getRelativeTime(time)}</Text>
				</Flex>
			</Stack>
			<Avatar
				colorPalette='blue'
				size='md'
				name={name}
				src={avatar}
				visibility={showAvatar ? 'visible' : 'hidden'}
			/>
		</Box>
	)
}

export default Message
