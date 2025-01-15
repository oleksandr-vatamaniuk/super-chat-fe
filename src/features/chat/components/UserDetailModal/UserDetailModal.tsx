import { BsThreeDotsVertical } from 'react-icons/bs'
import { Stack, Text, Box, Center } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { DialogBody, DialogCloseTrigger, DialogContent, DialogRoot, DialogTrigger } from '@components/chakra/dialog.tsx'
import { Avatar } from '@components/chakra/avatar.tsx'
import { Status } from '@components/chakra/status.tsx'
import { useSelector } from 'react-redux'
import { selectCurrentParticipant } from '@store/chat/chatSlice.ts'
import { useDeleteChatMutation } from '@store/chat/chatApi.ts'
import { toaster } from '@components/chakra/toaster.tsx'
import { useNavigate } from 'react-router-dom'
import { Button } from '@components/chakra/button.tsx'

const UserDetailModal: FC<{ disabled?: boolean }> = ({ disabled = true }) => {
	const navigate = useNavigate()
	const [isOnline] = useState(false)
	// @ts-ignore
	const participant = useSelector(selectCurrentParticipant)

	const avatar = participant?.avatar || ''
	const name = participant?.name || ''

	const [deleteChat, { isLoading, isSuccess }] = useDeleteChatMutation()

	const onDeleteChat = () => {
		deleteChat(participant?._id as string)
	}

	useEffect(() => {
		if (isSuccess) {
			toaster.create({
				title: `You successfully deleted chat with ${name}`,
				type: 'success',
			})
			navigate('/chat')
		}
	}, [isSuccess])

	return (
		<DialogRoot
			placement={{ base: 'center', md: 'top' }}
			scrollBehavior='inside'
			lazyMount={true}
			unmountOnExit={true}
		>
			<DialogTrigger asChild>
				<Button
					px={3}
					color='brand.grey.250'
					variant='ghost'
					disabled={disabled}
				>
					<BsThreeDotsVertical />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogCloseTrigger />
				<DialogBody
					p={4}
					pb={0}
				>
					<Stack
						alignItems='center'
						gap={0}
					>
						<Avatar
							colorPalette='blue'
							name={name}
							size='2xl'
							src={avatar}
							mb={2}
						/>
						<Text
							textStyle='xl'
							fontWeight='medium'
							color='brand.heading'
						>
							{name}
						</Text>
						{isOnline && (
							<Status
								textStyle='xs'
								color='brand.text'
							>
								Online
							</Status>
						)}
						<Text
							textStyle='xs'
							color='fg.muted'
						>
							Last seen yesterday
						</Text>
					</Stack>
					<Box py={4}>
						<Center>
							<Button
								onClick={onDeleteChat}
								loading={isLoading}
								colorPalette='red'
								variant='subtle'
							>
								Delete Chat
							</Button>
						</Center>
					</Box>
				</DialogBody>
			</DialogContent>
		</DialogRoot>
	)
}

export default UserDetailModal
