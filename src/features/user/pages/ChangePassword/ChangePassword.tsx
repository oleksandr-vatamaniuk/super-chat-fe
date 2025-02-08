import * as Yup from 'yup'
import { Box, Heading } from '@chakra-ui/react'
import { FormikProvider, useFormik } from 'formik'
import { PasswordField } from '@components'
import { Button } from '@components/chakra/button.tsx'
import { useEffect } from 'react'
import { toaster } from '@components/chakra/toaster.tsx'
import { useUpdateUserPasswordMutation } from '@features/user/userApi.ts'

interface ChangePasswordValues {
	oldPassword: string
	newPassword: string
	confirmNewPassword: string
}

const ChangePassword = () => {
	const [updateUserPassword, { isLoading, isError, isSuccess, error }] = useUpdateUserPasswordMutation()

	const submitHandler = ({ oldPassword, newPassword }: ChangePasswordValues) => {
		updateUserPassword({ oldPassword, newPassword })
	}

	useEffect(() => {
		if (isSuccess) {
			toaster.create({
				title: 'Password updated successfully!',
				type: 'success',
			})
			changePasswordFormik.resetForm()
		}
		if (isError) {
			if ((error as any).data.message) {
				toaster.create({
					description: (error as any).data.message,
					type: 'error',
				})
			}
		}
	}, [isLoading])

	const changePasswordFormik = useFormik<ChangePasswordValues>({
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
	})

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
				<FormikProvider value={changePasswordFormik}>
					<form onSubmit={changePasswordFormik.handleSubmit}>
						<PasswordField
							label='Old Password'
							name='oldPassword'
							placeholder='Enter your old password'
						/>
						<PasswordField
							label='New Password'
							name='newPassword'
							placeholder='Enter your new password'
						/>
						<PasswordField
							label='Confim New Password'
							name='confirmNewPassword'
							placeholder='Enter your new password again'
						/>
						<Button
							px='9'
							type='submit'
							loading={isLoading}
						>
							Save
						</Button>
					</form>
				</FormikProvider>
			</Box>
		</>
	)
}

export default ChangePassword
