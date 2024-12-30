import * as Yup from 'yup'
import { Box, Heading } from '@chakra-ui/react'
import { Formik } from 'formik'
import { PasswordField } from '@components'
import { Button } from '@components/chakra/button.tsx'

interface changePasswordValues {
	oldPassword: string
	newPassword: string
	confirmNewPassword: string
}

const ChangePassword = () => {
	const submitHandler = async ({ oldPassword, newPassword, confirmNewPassword }: changePasswordValues) => {
		console.log(oldPassword, newPassword, confirmNewPassword)
	}

	const changePasswordFormik = {
		initialValues: {
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		},
		validationSchema: Yup.object().shape({
			oldPassword: Yup.string()
				.required('Password is required')
				.min(8, 'Password is too short - should be 8 chars minimum'),
			newPassword: Yup.string()
				.required('Password is required')
				.min(8, 'Password is too short - should be 8 chars minimum'),
			confirmNewPassword: Yup.string() // Corrected this line
				.required('Confirm password is required')
				.oneOf([Yup.ref('newPassword')], 'Passwords must match'),
		}),
		onSubmit: submitHandler,
	}

	return (
		<>
			<Heading
				mb={5}
				as='h3'
				size='lg'
			>
				Change your information
			</Heading>
			<Box maxW='465px'>
				<Formik {...changePasswordFormik}>
					{({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<PasswordField
								label='Old Password'
								name='oldPassword'
								placeholder='Enter your old password'
							/>
							<PasswordField
								label='New Password'
								name='password'
								placeholder='Enter your new password'
							/>
							<PasswordField
								label='Confim New Password'
								name='confirmPassword'
								placeholder='Enter your new password again'
							/>
							<Button
								px='9'
								type='submit'
							>
								Save
							</Button>
						</form>
					)}
				</Formik>
			</Box>
		</>
	)
}

export default ChangePassword
