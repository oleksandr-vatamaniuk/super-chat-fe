import { Link, Center, Heading, Text, Stack } from '@chakra-ui/react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Link as ReactRouterLink } from 'react-router'
import { TextField } from '@components/index.ts'
import { Button } from '@components/chakra/button.tsx'

interface ForgotPasswordFormValues {
	email: string
}

const ForgotPassword = () => {
	const submitHandler = async ({ email }: ForgotPasswordFormValues) => {
		console.log(email)
	}

	const forgotPasswordFormik = {
		initialValues: {
			email: '',
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().email().required('Email is required'),
		}),
		onSubmit: submitHandler,
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
				<Heading size='3xl'>Password recovery</Heading>
				<Text
					textStyle={{ base: 'sm', md: 'md' }}
					mb={6}
				>
					Enter the email you're using for your account.
				</Text>
				<Formik {...forgotPasswordFormik}>
					{({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<TextField
								label='Email Adress'
								name='email'
								type='email'
								placeholder='Enter your email adress'
							/>
							<Button
								mt={2}
								w='full'
								size='lg'
								type='submit'
							>
								Sign In
							</Button>
						</form>
					)}
				</Formik>
				<Center mt={4.5}>
					<Link asChild>
						<ReactRouterLink to='/login'>Back to Login</ReactRouterLink>
					</Link>
				</Center>
			</Stack>
		</Center>
	)
}

export default ForgotPassword
