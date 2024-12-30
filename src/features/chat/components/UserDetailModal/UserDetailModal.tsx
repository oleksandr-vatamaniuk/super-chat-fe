import { BsThreeDotsVertical } from 'react-icons/bs'
import { Stack, Text, Box, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { DialogBody, DialogCloseTrigger, DialogContent, DialogRoot, DialogTrigger } from '@components/chakra/dialog.tsx'
import { Avatar } from '@components/chakra/avatar.tsx'
import { Status } from '@components/chakra/status.tsx'

const UserDetailModal = () => {
	const [isOnline] = useState(false)

	return (
		<DialogRoot
			placement={{ base: 'center', md: 'top' }}
			scrollBehavior='inside'
		>
			<DialogTrigger asChild>
				<Button
					px={3}
					color='brand.grey.250'
					variant='ghost'
				>
					<BsThreeDotsVertical />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogCloseTrigger />
				<DialogBody p={4}>
					<Stack
						alignItems='center'
						gap={0}
					>
						<Avatar
							colorPalette='blue'
							name='Nora M. Buchanan'
							size='full'
							src={''}
							mb={2}
						/>
						<Text
							textStyle='xl'
							fontWeight='medium'
							color='brand.heading'
						>
							Nora M. Buchanan
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
						<Text
							pt={4}
							textStyle='md'
							color='fg.muted'
						>
							johnDoe@gmail.com
						</Text>
					</Stack>
					<Box py={4}>
						<Button
							colorPalette='red'
							variant='subtle'
							w='full'
						>
							Delete Chat
						</Button>
					</Box>
				</DialogBody>
			</DialogContent>
		</DialogRoot>
	)
}

export default UserDetailModal
