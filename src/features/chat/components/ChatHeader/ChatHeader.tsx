import { useState, useEffect, FC } from 'react'
import { useSelector } from 'react-redux'
import { HStack, Stack, Text, Skeleton } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'
import { Button } from '@components/chakra/button.tsx'
import { Avatar } from '@components/chakra/avatar.tsx'
import { Status } from '@components/chakra/status.tsx'
import { UserDetailModal } from '@features/chat/components'
import { SkeletonCircle } from '@components/chakra/skeleton.tsx'
import { selectIsUserOnline } from '@features/chat/chatSlice.ts'
import { extractTime } from '@utils/exactTime.ts'

const useOnlineStatus = (participant: any) => {
	const isUserOnline = useSelector((state) => selectIsUserOnline(state, participant._id))
	// const [userId, setUserId] = useState<string>(participant._id);
	const [status, setStatus] = useState({
		isOnline: false,
		lastSeen: participant?.updatedAt || null,
	})

	useEffect(() => {
		setStatus({
			isOnline: isUserOnline,
			lastSeen: participant?.updatedAt,
		})
	}, [isUserOnline, participant])

	return status
}

type ChatHeaderProps = {
	disabled?: boolean
	participant: any
}

const HeaderData: FC<{ participant: any }> = ({ participant }) => {
	const { isOnline, lastSeen } = useOnlineStatus(participant)

	return (
		<HStack>
			<Avatar
				colorPalette='blue'
				size='xl'
				name={participant?.name}
				src={participant?.avatar}
			/>
			<Stack gap={1}>
				<Text
					textStyle='lg'
					fontWeight='medium'
					color='brand.heading'
				>
					{participant?.name}
				</Text>
				{isOnline ? (
					<Status
						textStyle='xs'
						color='brand.text'
					>
						Online
					</Status>
				) : (
					<Text
						color='brand.grey.300'
						textStyle='xs'
					>
						last seen {extractTime(lastSeen)}
					</Text>
				)}
			</Stack>
		</HStack>
	)
}

const ChatHeader: FC<ChatHeaderProps> = ({ disabled, participant }) => {
	const renderLoading = () => (
		<HStack>
			<SkeletonCircle size='12' />
			<Stack>
				<Skeleton
					height='26px'
					w='100px'
				/>
				<Skeleton
					height='16px'
					w='40px'
				/>
			</Stack>
		</HStack>
	)

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
					disabled={disabled}
				>
					<NavLink to='/chat'>
						<FaArrowLeft />
					</NavLink>
				</Button>
				{disabled ? renderLoading() : <HeaderData participant={participant} />}
			</HStack>
			<UserDetailModal disabled={disabled} />
		</HStack>
	)
}

export default ChatHeader
