import { Box, Float, Input } from '@chakra-ui/react'
import { IoIosSend } from 'react-icons/io'
import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react'
import { Button } from '@components/chakra/button.tsx'
import { EmojiPopover } from '@features/chat/components'
import { useSendMessageMutation } from '@features/chat/chatApi.ts'
import { useParams } from 'react-router-dom'
import useIsOffline from '@hooks/useIsOffline.ts'
import { toaster } from '@components/chakra/toaster.tsx'

type MessageInputProps = {
	disabled: boolean
}

const MessageInput: FC<MessageInputProps> = ({ disabled = true }) => {
	const { chatId } = useParams()
	const inputRef = useRef<HTMLInputElement>(null)
	const [message, setMessage] = useState('')
	const [sendMessage, { isLoading, isSuccess, isError }] = useSendMessageMutation()
	const isOffline = useIsOffline()

	const emojiHandler = (emoji: string) => {
		setMessage((prevMessage) => prevMessage + emoji)
		setTimeout(() => {
			inputRef.current?.focus()
		}, 0)
	}

	useEffect(() => {
		if (!disabled || !isLoading) {
			inputRef.current?.focus()
		}
	}, [disabled, isLoading, chatId])

	useEffect(() => {
		if (isSuccess) {
			setMessage('')
		}
	}, [isSuccess])

	useEffect(() => {
		if (isOffline && isError) {
			toaster.create({
				type: 'success',
				title: 'Message Queued 📩',
				description: "We'll send your message automatically when you're back online.",
			})
			setMessage('')
		}
	}, [isOffline, isError])

	const submitHandler = async (event: FormEvent) => {
		event.preventDefault()

		if (!message) return

		await sendMessage({
			receiverId: chatId,
			message,
		})
	}

	const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
		setMessage(event.target.value)
	}

	return (
		<Box
			p={6}
			bg='white'
			w='full'
			position='relative'
		>
			<form onSubmit={submitHandler}>
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
						disabled={disabled || isLoading}
						loading={isLoading}
						onClick={submitHandler}
						_hover={{
							color: 'brand.grey.500',
						}}
					>
						{!isLoading && <IoIosSend />}
					</Button>
				</Float>
				<Float
					zIndex={12}
					offsetX='12'
					placement='middle-start'
				>
					<EmojiPopover
						disabled={disabled || isLoading}
						onEmoji={emojiHandler}
					/>
				</Float>
				<Input
					disabled={disabled || isLoading}
					ref={inputRef}
					px={12}
					placeholder='Type Message'
					value={message}
					onChange={handleMessageChange}
				/>
			</form>
		</Box>
	)
}

export default MessageInput
