import { Center, Heading, Text, Stack, Box, Image } from '@chakra-ui/react'

const ThankYou = () => {
	const { email, name } = { email: 'hello@gmail.com', name: 'John Doe' }

	return (
		<Center
			h='100%'
			p={10}
		>
			<Stack
				w='full'
				maxW='465px'
				gap={0}
			>
				<Box>
					<Image
						src='/images/waving-hand.png'
						alt='Waving hand emoji'
						width={47}
						height={47}
						mb={5}
					/>
				</Box>
				<Heading
					size='3xl'
					mb={3}
				>
					Hi, {name}
				</Heading>
				<Text textStyle={{ base: 'sm', md: 'md' }}>
					Please check your email <strong>{email}</strong> and click on the confirmation link to complete your sign up.
					Check your spam folder as well if you cant find it in your inbox.
				</Text>
			</Stack>
		</Center>
	)
}

export default ThankYou
