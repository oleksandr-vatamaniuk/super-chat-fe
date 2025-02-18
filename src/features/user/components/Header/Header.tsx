import { Box, Center, Flex, Image, useBreakpointValue, Text, Container } from '@chakra-ui/react'
import { MobileNavigation, UserProfile } from '@features/user/components'
import useIsOffline from '@hooks/useIsOffline.ts'
import { useWebsocketConnectQuery } from '@features/chat/chatApi.ts'
import { SearchModal } from '@features/chat/components'

const Header = () => {
	const isOffline = useIsOffline()

	useWebsocketConnectQuery(undefined, { skip: isOffline })

	const logoSrc = useBreakpointValue({
		base: '/images/logo-min.svg', // For small screens (default)
		md: '/images/logo-black.png', // For medium screens and above
	})

	return (
		<>
			{isOffline && (
				<Box
					bg='brand.grey.250'
					color='white'
					p={2}
				>
					<Center>
						<Text>You are offline 😕</Text>
					</Center>
				</Box>
			)}
			<Box
				role='heading'
				as='header'
				w='full'
				bg='white'
				position='sticky'
				top={0}
				zIndex='sticky'
				borderBottomColor='brand.grey.150'
				borderBottomWidth='1px'
			>
				<Container
					p={0}
					fluid
					maxW='breakpoint-3xl'
					asChild
				>
					<Flex>
						<Center
							hideFrom='lg'
							borderRightColor='brand.grey.150'
							borderRightWidth='1px'
							px={3}
						>
							<MobileNavigation />
						</Center>
						<Box
							w={{ lg: 'full' }}
							maxW={{ lg: '230px' }}
							borderRightColor='brand.grey.150'
							borderRightWidth='1px'
						>
							<Center px={{ base: 6, md: 0, lg: 4 }}>
								<Image
									src={logoSrc}
									alt='Logo'
									width='100%'
									height='74px'
									maxW={178}
								/>
							</Center>
						</Box>
						<Box flex='1'>
							<Flex
								h='full'
								alignItems='center'
								justifyContent='space-between'
								gap={{ base: 4, md: 8 }}
								px={{ base: 4, md: 8 }}
							>
								<SearchModal />
								<UserProfile />
							</Flex>
						</Box>
					</Flex>
				</Container>
			</Box>
		</>
	)
}

export default Header
