import { Box, Container, Flex, Stack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { Header, Navigation } from '@layouts/MainLayout/components'

const MainLayout = () => {
	return (
		<>
			<Header />
			<Container
				p={0}
				fluid
				maxW='breakpoint-3xl'
				asChild
			>
				<Flex
					minH='calc(100vh - 75px)'
					h='full'
					flex='1'
					as='main'
					overflowY='scroll'
					bg='brand.grey.100'
				>
					<Stack
						borderRightColor='brand.grey.150'
						borderRightWidth='1px'
						bg='white'
						as='aside'
						w={{ base: '0', md: '230px' }}
						maxW='230px'
						hideBelow='lg'
						overflowY='scroll'
					>
						<Navigation />
					</Stack>
					<Box
						flex='1'
						overflowY='auto'
					>
						<Outlet />
					</Box>
				</Flex>
			</Container>
		</>
	)
}
export default MainLayout
