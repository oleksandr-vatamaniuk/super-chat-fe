import { Center, Heading, Text, Stack } from '@chakra-ui/react'

const VerifyEmail = () => {
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
				<Heading size='3xl'>Email Verifying</Heading>
				<Text
					textStyle={{ base: 'sm', md: 'md' }}
					mb={6}
				>
					Loading...
				</Text>
			</Stack>
		</Center>
	)
}

export default VerifyEmail
