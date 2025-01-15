import { Center, Heading, Text, Stack, Box, Image } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import useGetQueryParams from '@hooks/useGetQueryParams.ts'

const ThankYou = () => {
	const queryParams = useGetQueryParams()

	const name = queryParams.get('name')
	const email = queryParams.get('email')

	if (!name || !email) {
		return (
			<Navigate
				to='/login'
				replace
			/>
		)
	}

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
					Check your spam folder as well if you can’t find it in your inbox.
				</Text>
			</Stack>
		</Center>
	)
}

export default ThankYou
