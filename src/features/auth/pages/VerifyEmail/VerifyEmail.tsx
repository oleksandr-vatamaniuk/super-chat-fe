import { Center, Heading, Text, Stack, Box } from '@chakra-ui/react'
import { useVerifyUserMutation } from '@store/auth/authApi.ts'
import { useNavigate } from 'react-router-dom'
import { toaster } from '@components/chakra/toaster.tsx'
import { useEffect } from 'react'
import { Button } from '@components/chakra/button.tsx'
import useGetQueryParams from '@hooks/useGetQueryParams.ts'

const VerifyEmail = () => {
	const queryParams = useGetQueryParams()
	const navigate = useNavigate()
	const [verifyUser, { isSuccess, isLoading, isError }] = useVerifyUserMutation()

	const token = queryParams.get('token')
	const email = queryParams.get('email')

	useEffect(() => {
		if (token && email) {
			verifyUser({ email, verificationToken: token })
		} else {
			navigate('/login', { replace: true })
		}
	}, [email, token, verifyUser])

	useEffect(() => {
		if (isSuccess) {
			toaster.create({
				type: 'success',
				title: 'Email Verified Successfully!',
				description: 'Your email has been confirmed, and your account is now ready to use.',
			})
			navigate('/login')
		}
	}, [isSuccess])

	return (
		<Center
			h='100vh'
			p={10}
		>
			<Stack
				w='full'
				maxW='465px'
				gap={6}
			>
				<Heading size='3xl'>Email Verifying</Heading>
				{isLoading && <Text fontSize={{ base: 'sm', md: 'md' }}>Loading...</Text>}
				{isError && (
					<Box>
						<Text fontSize={{ base: 'sm', md: 'md' }}>
							It seems your email verification has expired or failed. Log in again to request a new verification code.
						</Text>
						<Button onClick={() => navigate('/login')}>Back to Login</Button>
					</Box>
				)}
			</Stack>
		</Center>
	)
}

export default VerifyEmail
