import { Box, VStack, Heading, Text, Image, HStack, Link, Center, AbsoluteCenter } from '@chakra-ui/react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@components/chakra/button.tsx'
import { CheckBoxField, PasswordField, TextField } from '@components'

interface SignUpFormValues {
	name: string
	age?: string
	email: string
	password: string
	confirmPassword: string
	terms: boolean
}

const SignUp = () => {
	const [isLoading, setLoading] = useState(false)

	console.log(isLoading)

	const submitHandler = async ({ email, password }: SignUpFormValues) => {
		// loginUser({ email, password })
		setLoading(true)

		console.log(email, password)
	}

	const signUpFormik = {
		initialValues: {
			name: '',
			age: '',
			email: '',
			password: '',
			confirmPassword: '',
			terms: false,
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().required('Name is required field').min(4, 'Name should be at least 4 characters long'),
			age: Yup.number().positive('Age should be a positive number').integer('Age should be an integer').min(16).max(99),
			email: Yup.string().email().required('Email is required'),
			password: Yup.string()
				.required('Password is required')
				.min(8, 'Password is too short - should be 8 chars minimum'),
			confirmPassword: Yup.string()
				.required('Confirm password is required')
				.oneOf([Yup.ref('password')], 'Passwords must match'),
			terms: Yup.bool().oneOf([true], 'You must accept the terms and conditions'),
		}),
		onSubmit: submitHandler,
	}

	// TODO number input
	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='space-between'
			minH='100vh'
			w='full'
			p={10}
			pb={8}
		>
			<VStack
				w='full'
				maxW='465px'
				minW='320px'
				align='stretch'
				mt={{ base: 0, lg: 12 }}
				gap={0}
			>
				<Heading size='3xl'>Get started today</Heading>
				<Text
					textStyle='md'
					mb={8}
				>
					Enter your details to create super account.
				</Text>
				<Formik {...signUpFormik}>
					{({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<HStack
								gap='8'
								width='full'
								alignItems='flex-start'
							>
								<TextField
									label='Name'
									name='name'
									type='text'
									placeholder='Enter your name'
									required
								/>
								<TextField
									label='Age'
									name='age'
									type='number'
									placeholder='Enter your Age'
								/>
							</HStack>
							<TextField
								label='Email'
								name='email'
								type='email'
								placeholder='Enter your email adress'
								required
							/>
							<PasswordField
								label='Password'
								name='password'
								placeholder='Enter your password'
								required
							/>
							<PasswordField
								label='Confim Password'
								name='confirmPassword'
								placeholder='Enter your new password again'
								required
							/>
							<CheckBoxField
								type='checkbox'
								name='terms'
							>
								I agree to Product&nbsp;
								<Link asChild>
									<NavLink to='/privacyPolicy'>Terms and Policy.</NavLink>
								</Link>
							</CheckBoxField>
							<Button
								loading={isLoading}
								w='full'
								size='lg'
								type='submit'
							>
								Get started now
							</Button>
						</form>
					)}
				</Formik>
				<Box
					textAlign='center'
					position='relative'
					mt={7}
					mb={7}
				>
					<AbsoluteCenter
						w='full'
						axis='both'
					>
						<Center
							pe='4.5'
							ps='4.5'
							zIndex='1'
							bg='white'
							fontSize='xs'
							color='brand.text'
						>
							Or sign up with
						</Center>
					</AbsoluteCenter>
					<Box
						bg='brand.grey.150'
						height={'1px'}
						w='full'
					></Box>
				</Box>
				<HStack
					justify='center'
					gap={5}
				>
					<Button
						size='lg'
						variant='surface'
					>
						<Image
							src='/images/google.png'
							alt='Google'
						/>
					</Button>
					<Button
						size='lg'
						variant='surface'
					>
						<Image
							src='/images/facebook.png'
							alt='Facebook'
						/>
					</Button>
				</HStack>
			</VStack>
			<Box
				textAlign='center'
				color='brand.grey.400'
				textStyle='sm'
			>
				Already have an account?&nbsp;
				<Link asChild>
					<NavLink to='/login'>Login</NavLink>
				</Link>
			</Box>
		</Box>
	)
}

export default SignUp
