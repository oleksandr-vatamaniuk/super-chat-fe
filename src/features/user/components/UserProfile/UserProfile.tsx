import { Box, Flex, Text, chakra, Link, Float, Circle } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { Avatar } from '@components/chakra/avatar.tsx'
import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from '@components/chakra/popover.tsx'
import { Button } from '@components/chakra/button.tsx'
import { useSelector } from 'react-redux'
import { selectUser } from '@features/user/userSlice.ts'
import { selectIsUserOnline } from '@features/chat/chatSlice.ts'

const UserProfile = () => {
	const user = useSelector(selectUser) || { _id: null, name: '', avatar: '' }
	const isUserOnline = useSelector((state) => selectIsUserOnline(state, user?._id!))

	return (
		<Flex
			alignItems='center'
			wrap='wrap'
			gap={{ base: 1, md: 2, lg: 4 }}
			data-testid='userProfile'
		>
			<Box>
				<Avatar
					colorPalette='blue'
					size='xl'
					name={user.name || ''}
					src={user.avatar || ''}
				>
					{isUserOnline && (
						<Float
							placement='top-end'
							offsetX='1'
							offsetY='1'
						>
							<Circle
								bg='brand.status'
								size='8px'
								outline='2px solid'
								outlineColor='bg'
							/>
						</Float>
					)}
				</Avatar>
			</Box>
			<Box
				flex={1}
				hideBelow='md'
				asChild
			>
				<Text
					as='span'
					color='brand.heading'
					fontSize='sm'
					fontWeight='semibold'
					data-testid='userName'
				>
					{user.name}
				</Text>
			</Box>
			<Box>
				<PopoverRoot
					size='xs'
					autoFocus={false}
					positioning={{ placement: 'bottom-end', offset: { mainAxis: 9 } }}
				>
					<PopoverTrigger asChild>
						<Button
							size='xs'
							variant='ghost'
						>
							<chakra.svg
								width='10px'
								height='6px'
								stroke='brand.grey.350'
								fill='none'
							>
								<path
									d='M1 1L5 5L9 1'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</chakra.svg>
						</Button>
					</PopoverTrigger>
					<PopoverContent
						rounded='xs'
						maxWidth='160px'
					>
						<PopoverBody>
							<Link
								h='full'
								asChild
								variant='plain'
								w='full'
							>
								<NavLink to='/settings/edit-profile'>Edit Profile</NavLink>
							</Link>
						</PopoverBody>
					</PopoverContent>
				</PopoverRoot>
			</Box>
		</Flex>
	)
}

export default UserProfile
