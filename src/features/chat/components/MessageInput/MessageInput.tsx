import { Box, Float, Input } from '@chakra-ui/react'
import { IoIosSend } from 'react-icons/io'
import { useState } from 'react'
import { Button } from '@components/chakra/button.tsx'
import { EmojiPopover } from '@features/chat/components'

const MessageInput = () => {
	const [message, setMessage] = useState('')

	const emojiHandler = (emoji: string) => {
		console.log(emoji)
		setMessage((prevMessage) => prevMessage + emoji)
	}

	return (
		<Box
			p={6}
			bg='white'
			w='full'
			position='relative'
		>
			<Float
				zIndex={1}
				offsetX='12'
				placement='middle-end'
			>
				<Button
					variant='ghost'
					color='brand.grey.250'
					size='md'
					px={3}
					_hover={{
						color: 'brand.grey.500',
					}}
				>
					<IoIosSend />
				</Button>
			</Float>
			<Float
				zIndex={12}
				offsetX='12'
				placement='middle-start'
			>
				<EmojiPopover onEmoji={emojiHandler} />
			</Float>
			<Input
				px={12}
				placeholder='Type Message'
				value={message}
				onChange={(event) => setMessage(event.target.value)}
			/>
		</Box>
	)
}

export default MessageInput
