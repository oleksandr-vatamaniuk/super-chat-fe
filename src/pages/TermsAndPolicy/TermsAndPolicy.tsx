import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'
import { IoChevronBack } from 'react-icons/io5'

const TermsAndPolicy = () => {
	return (
		<>
			<Box
				as='header'
				zIndex='sticky'
				position='sticky'
				top={0}
				bg='brand.headingBlack'
				pt={1}
				pb={{ base: 4, lg: 8 }}
			>
				<Container
					fluid
					maxW='breakpoint-3xl'
					display='flex'
					justifyContent='space-between'
					alignItems='center'
				>
					<Stack>
						<Box>
							<img
								src='/images/logo.png'
								alt='Logo'
							/>
						</Box>
						<Box
							display='flex'
							alignItems='center'
							gap={3}
						>
							<Button
								bg='none'
								variant='ghost'
								color='white'
							>
								<IoChevronBack />
							</Button>
							<Heading
								as='h1'
								fontSize={{ base: 'xl', md: '3xl' }}
								mb={0}
								color='white'
							>
								Product legal information
							</Heading>
						</Box>
					</Stack>
				</Container>
			</Box>

			<Box
				as='main'
				py={10}
			>
				<Container
					fluid
					maxW='breakpoint-3xl'
				>
					<Heading
						as='h2'
						fontSize='2xl'
						pb={5}
					>
						Privacy Policy
					</Heading>
					<Box as='article'>
						<Heading
							as='h3'
							size='lg'
							pb={3}
						>
							1. The standard Lorem Ipsum passage, used since the 1500s
						</Heading>
						<Text pb={4}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
							fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							mollit anim id est laborum.
						</Text>
						<Text pb={4}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
							fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							mollit anim id est laborum.
						</Text>
						<Text pb={4}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
							fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							mollit anim id est laborum.
						</Text>

						<Heading
							as='h3'
							size='lg'
							pb={3}
						>
							2. The standard Lorem Ipsum passage
						</Heading>
						<Text pb={4}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
							fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							mollit anim id est laborum.
						</Text>
						<Text pb={4}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
							fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							mollit anim id est laborum.
						</Text>
						<Text pb={4}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
							fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							mollit anim id est laborum.
						</Text>
					</Box>
					<Button
						variant='outline'
						size='md'
						px={9}
						color='fg.muted'
						mt={6}
					>
						Back
					</Button>
				</Container>
			</Box>
		</>
	)
}

export default TermsAndPolicy
