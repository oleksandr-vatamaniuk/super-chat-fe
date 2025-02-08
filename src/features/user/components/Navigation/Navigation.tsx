import { Box, Float, HStack, Text } from '@chakra-ui/react'
import { NavLink as ReactRouterLink, useNavigate } from 'react-router-dom'
import { BiMessageDetail } from 'react-icons/bi'
import { MdExitToApp } from 'react-icons/md'
import { useLogOutMutation } from '@features/auth/authApi.ts'
import { useEffect } from 'react'
import { Button } from '@components/chakra/button.tsx'

const Navigation = () => {
	const navigate = useNavigate()
	const [logOut, { isLoading, isSuccess }] = useLogOutMutation()

	const onLogOutHandler = async () => {
		await logOut(null)
	}

	useEffect(() => {
		if (isSuccess) {
			navigate('/login')
		}
	}, [isLoading])

	return (
		<>
			<Box
				pt={6}
				pl={6}
			>
				<Text
					fontSize='sm'
					fontWeight='semibold'
					color='brand.grey.300/50'
				>
					Main Menu
				</Text>
			</Box>
			<Box
				p={6}
				pl={0}
			>
				<ReactRouterLink to={'/chat'}>
					{({ isActive }) => (
						<Box
							h='full'
							w='full'
							pl={6}
							position='relative'
						>
							<Float
								height='full'
								placement='middle-start'
							>
								<Box
									height='full'
									w={isActive ? '2px' : 0}
									bg='brand.blue.100'
								/>
							</Float>
							<HStack color={isActive ? 'brand.blue.100' : 'fg.muted'}>
								<BiMessageDetail />
								<Text
									fontWeight={500}
									fontSize='sm'
								>
									Chat
								</Text>
							</HStack>
						</Box>
					)}
				</ReactRouterLink>
			</Box>
			<Box
				ml={6}
				mr={6}
				borderTopWidth='1px'
				borderTopColor='brand.grey.150'
			/>
			<Box p={6}>
				<Button
					loading={isLoading}
					onClick={onLogOutHandler}
					variant='subtle'
					w='full'
				>
					<MdExitToApp />
					Logout
				</Button>
			</Box>
		</>
	)
}

export default Navigation
