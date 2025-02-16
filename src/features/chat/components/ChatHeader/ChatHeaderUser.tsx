import { FC } from 'react'
import { HStack, Stack, Text } from '@chakra-ui/react'
import { Avatar } from '@components/chakra/avatar.tsx'
import { Status } from '@components/chakra/status.tsx'
import { extractTime } from '@utils/exactTime.ts'
import { useGetOnlineStatus } from '@features/chat/hooks'
import { IUser } from '@types'

const ChatHeaderUser: FC<{ participant: IUser }> = ({ participant }) => {
	const { isOnline, lastSeen } = useGetOnlineStatus(participant)

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
						last seen {extractTime(lastSeen!)}
					</Text>
				)}
			</Stack>
		</HStack>
	)
}

export default ChatHeaderUser
