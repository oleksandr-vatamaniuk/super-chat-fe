import { Box, Center, Image } from '@chakra-ui/react'

const Loading = () => {
	return (
		<Box
			bg='white'
			w='full'
		>
			<Center h='100vh'>
				<Box
					data-state='open'
					_open={{
						animation: 'pulse 1.25s linear infinite;',
					}}
				>
					<Image
						src='/images/logo-min.svg'
						alt='Logo'
						width='100px'
					/>
				</Box>
			</Center>
		</Box>
	)
}

export default Loading
