import { Link, Center, Heading, Text, Stack } from '@chakra-ui/react'
import { FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import { Link as ReactRouterLink } from 'react-router'
import { TextField } from '@components/index.ts'
import { Button } from '@components/chakra/button.tsx'
import { useForgotPasswordMutation } from '@features/auth/authApi.ts'
import { useEffect } from 'react'
import { toaster } from '@components/chakra/toaster.tsx'

interface ForgotPasswordFormValues {
	email: string
}

const ForgotPassword = () => {
	const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation()

	const submitHandler = async ({ email }: ForgotPasswordFormValues) => {
		forgotPassword({ email })
	}

	useEffect(() => {
		if (isSuccess) {
			toaster.create({
				type: 'success',
				title: 'Email was send!',
				description: 'Please check you email box and follow the instructions.',
			})
			forgotPasswordFormik.resetForm()
		}
	}, [isLoading])

	const forgotPasswordFormik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().email().required('Email is required'),
		}),
		onSubmit: submitHandler,
	})

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
				{!isSuccess && (
					<>
						<Text
							textStyle={{ base: 'sm', md: 'md' }}
							mb={6}
						>
							Enter the email you're using for your account.
						</Text>
						<FormikProvider value={forgotPasswordFormik}>
							<form onSubmit={forgotPasswordFormik.handleSubmit}>
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
									loading={isLoading}
								>
									Reset
								</Button>
							</form>
						</FormikProvider>
					</>
				)}
				{isSuccess && (
					<Text
						textStyle={{ base: 'sm', md: 'md' }}
						mb={6}
					>
						Please check you email box and follow the instructions.
					</Text>
				)}
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
