import { Center, Heading, Text, Stack, Link } from '@chakra-ui/react'
import { FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import { Link as ReactRouterLink } from 'react-router'
import { PasswordField } from '@components'
import { useResetPasswordMutation } from '@features/auth/authApi.ts'
import { Navigate, useSearchParams } from 'react-router-dom'
import { Button } from '@components/chakra/button.tsx'

export type PasswordRecoveryFormInput = {
	password: string
	confirmPassword: string
}

const ResetPassword = () => {
	const [queryParams] = useSearchParams()
	const [forgotPassword, { isLoading, isSuccess }] = useResetPasswordMutation()

	const token = queryParams.get('token')
	const email = queryParams.get('email')

	if (!token || !email) {
		return (
			<Navigate
				to='/login'
				replace
			/>
		)
	}

	const submitHandler = ({ password, confirmPassword }: PasswordRecoveryFormInput) => {
		forgotPassword({
			email,
			token,
			password,
			confirmPassword,
		})
	}

	const resetPasswordFormik = useFormik({
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
				.oneOf([Yup.ref('password')], 'Passwords must match'),
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
						<FormikProvider value={resetPasswordFormik}>
							<form onSubmit={resetPasswordFormik.handleSubmit}>
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
									loading={isLoading}
								>
									Reset
								</Button>
							</form>
						</FormikProvider>
					</>
				)}
			</Stack>
		</Center>
	)
}

export default ResetPassword
