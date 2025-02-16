import { FC } from 'react'
import { HStack } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'
import { Button } from '@components/chakra/button.tsx'
import { UserDetailModal } from '@features/chat/components'
import ChatHeaderLoading from './ChatHeaderLoading.tsx'
import ChatHeaderUser from './ChatHeaderUser.tsx'
import { IUser } from '@types'

type ChatHeaderProps = {
	disabled?: boolean
	participant: IUser | null
}

const ChatHeader: FC<ChatHeaderProps> = ({ disabled, participant }) => {
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
				{disabled ? <ChatHeaderLoading /> : <ChatHeaderUser participant={participant!} />}
			</HStack>
			<UserDetailModal disabled={disabled} />
		</HStack>
	)
}

export default ChatHeader
