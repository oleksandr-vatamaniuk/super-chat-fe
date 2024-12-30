import { HStack, Stack, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'
import { Button } from '@components/chakra/button.tsx'
import { Avatar } from '@components/chakra/avatar.tsx'
import { Status } from '@components/chakra/status.tsx'
import { UserDetailModal } from '@features/chat/components'

const ChatHeader = () => {
	return (
		<HStack
			bg='white'
			p={3}
			w='full'
			justifyContent='space-between'
		>
			<HStack>
				<Button
					px={3}
					color='brand.grey.250'
					variant='ghost'
					asChild
				>
					<NavLink to='/chat'>
						<FaArrowLeft />
					</NavLink>
				</Button>
				<HStack>
					<Avatar
						colorPalette='blue'
						size='xl'
						name='Nora M. Buchanan'
						src={''}
					/>
					<Stack gap={0}>
						<Text
							textStyle='lg'
							fontWeight='medium'
							color='brand.heading'
							mb={0.5}
						>
							Nora M. Buchanan
						</Text>
						<Status
							textStyle='xs'
							color='brand.text'
						>
							Online
						</Status>
					</Stack>
				</HStack>
			</HStack>
			<UserDetailModal />
		</HStack>
	)
}

export default ChatHeader
