import { Box, Button, Float, Link, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { BiMessageDetail } from 'react-icons/bi'
import { MdExitToApp } from 'react-icons/md'

const Navigation = () => {
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
				<Link
					h='full'
					w='full'
					pl={6}
					fontSize='sm'
					borderRadius={0}
					color='brand.blue.100'
					asChild
					position='relative'
				>
					<NavLink to='/chat'>
						<Float
							height='full'
							placement='middle-start'
						>
							<Box
								height='full'
								w='1px'
								bg='brand.blue.100'
							/>
						</Float>
						<BiMessageDetail />
						Chat
					</NavLink>
				</Link>
			</Box>
			<Box
				ml={6}
				mr={6}
				borderTopWidth='1px'
				borderTopColor='brand.grey.150'
			/>
			<Box p={6}>
				<Button
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
