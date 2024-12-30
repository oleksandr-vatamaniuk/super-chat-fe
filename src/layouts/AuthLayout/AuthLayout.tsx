import { Container, Grid, GridItem } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
	return (
		<Container
			p={0}
			fluid
			maxW='breakpoint-3xl'
		>
			<Grid
				templateColumns={{ base: '1fr', md: '5fr 7fr' }}
				gap={0}
				height='100vh'
			>
				<GridItem
					display={{ base: 'none', md: 'block' }}
					bgImage="url('./images/login.jpeg')"
					bgSize='cover'
					bgColor='white'
					width='100%'
					bgRepeat='no-repeat'
				/>
				<GridItem>
					<Outlet />
				</GridItem>
			</Grid>
		</Container>
	)
}

export default AuthLayout
