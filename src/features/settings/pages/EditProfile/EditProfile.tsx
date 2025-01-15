import { Box, Heading } from '@chakra-ui/react'
import { FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@components/chakra/button.tsx'
import { TextField } from '@components'
import { useUpdateUserMutation } from '@store/user/userApi.ts'
import { useEffect } from 'react'
import { toaster } from '@components/chakra/toaster.tsx'

interface EditUserProfileValues {
	name: string
	age?: string
}

const EditProfile = () => {
	const [updateUser, { isLoading, isError, isSuccess, error }] = useUpdateUserMutation()

	const submitHandler = ({ name, age }: EditUserProfileValues) => {
		updateUser({ name, age })
	}

	useEffect(() => {
		if (isSuccess) {
			toaster.create({
				title: 'You have successfully updated your profile',
				type: 'success',
			})
			editUserProfileFormik.resetForm()
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

	const editUserProfileFormik = useFormik({
		initialValues: {
			name: '',
			age: '',
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().required('Name is required field').min(4, 'Name should be at least 4 characters long'),
			age: Yup.number()
				.positive('Age should be a positive number')
				.integer('Age should be an integer')
				.min(13, 'Age must be at least 13')
				.max(99, 'Age must be less than or equal to 99'),
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
				<FormikProvider value={editUserProfileFormik}>
					<form onSubmit={editUserProfileFormik.handleSubmit}>
						<TextField
							size='lg'
							label='Name'
							name='name'
							type='text'
							placeholder='Enter your name'
						/>
						<TextField
							size='lg'
							label='Age'
							name='age'
							type='number'
							placeholder='Enter your Age'
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

export default EditProfile
