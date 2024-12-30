import { Box, Heading } from '@chakra-ui/react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@components/chakra/button.tsx'
import { TextField } from '@components'

const EditProfile = () => {
	const submitHandler = async ({ email, password }: any) => {
		console.log(email, password)
	}

	const editUserInfoFormik = {
		initialValues: {
			name: '',
			age: '',
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().required('Name is required field').min(4, 'Name should be at least 4 characters long'),
			age: Yup.number().positive('Age should be a positive number').integer('Age should be an integer'),
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
				<Formik {...editUserInfoFormik}>
					{({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
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

export default EditProfile
