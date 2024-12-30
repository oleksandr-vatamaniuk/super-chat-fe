import { Center, Heading, Text, Stack, Link, Button } from '@chakra-ui/react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { useState } from 'react'
import { Link as ReactRouterLink } from 'react-router'
import { PasswordField } from '@components'

interface PasswordRecoveryFormValues {
	password: string
	confirmPassword: string
}

const ResetPassword = () => {
	const [isSuccess] = useState(false)
	const submitHandler = async ({ password }: PasswordRecoveryFormValues) => {
		console.log(password)
	}

	const resetPasswordFormik = {
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object().shape({
			password: Yup.string()
				.required('Password is required')
				.min(8, 'Password is too short - should be 8 chars minimum'),
			confirmPassword: Yup.string()
				.required('Confirm password is required')
				.oneOf([Yup.ref('newPassword')], 'Passwords must match'),
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
				{isSuccess ? (
					<>
						<Heading
							size='3xl'
							mb={2}
						>
							Password Changed
						</Heading>
						<Text
							textStyle={{ base: 'sm', md: 'md' }}
							mb={6}
						>
							Your password reset was successful. Welcome back!
						</Text>
						<Link asChild>
							<ReactRouterLink to='/login'>Back to Login</ReactRouterLink>
						</Link>
					</>
				) : (
					<>
						<Heading
							size='3xl'
							mb={2}
						>
							Change Your Password
						</Heading>
						<Text
							textStyle={{ base: 'sm', md: 'md' }}
							mb={6}
						>
							Enter and confirm your new password to reset.
						</Text>
						<Formik {...resetPasswordFormik}>
							{({ handleSubmit }) => (
								<form onSubmit={handleSubmit}>
									<PasswordField
										label='Password'
										name='password'
										placeholder='Enter your password'
									/>
									<PasswordField
										label='Confim Password'
										name='confirmPassword'
										placeholder='Enter your new password again'
									/>
									<Button
										mt={2}
										w='full'
										size='lg'
										type='submit'
									>
										Reset
									</Button>
								</form>
							)}
						</Formik>
					</>
				)}
			</Stack>
		</Center>
	)
}

export default ResetPassword
