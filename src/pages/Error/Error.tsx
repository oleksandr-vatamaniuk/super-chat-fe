import { Box, Center, Heading, Image, Text } from '@chakra-ui/react'

const Error = () => {
	return (
		<Center
			h='100%'
			p={10}
		>
			<Box>
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
					mb={2}
				>
					404
				</Heading>
				<Text textStyle='md'>Oops! Something went wrong.</Text>
			</Box>
		</Center>
	)
}

export default Error
