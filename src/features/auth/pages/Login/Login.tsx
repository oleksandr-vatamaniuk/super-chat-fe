import { Box, VStack, Heading, Text, Image, HStack, Center, Link, AbsoluteCenter } from '@chakra-ui/react'
import { FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import { Link as ReactRouterLink } from 'react-router'
import { Button } from '@components/chakra/button.tsx'
import { PasswordField, TextField } from '@components'
import { useLoginMutation } from '@store/auth/authApi.ts'
import { useEffect, useState } from 'react'
import { toaster } from '@components/chakra/toaster.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ResendVerificationCodeModal } from '@features/auth/components'
import { useGoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@store/auth/authSlice.ts'

interface SignInFormValues {
	email: string
	password: string
}

const Login = () => {
	const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation()
	const navigate = useNavigate()
	const [openResendEmailModal, setOpenResendEmailModal] = useState(false)
	const [queryParams, setQueryParams] = useSearchParams()
	const dispatch = useDispatch()

	useEffect(() => {
		const token = queryParams.get('token')

		if (token) {
			queryParams.delete('token')
			setQueryParams('')
			dispatch(setCredentials({ accessToken: token }))
			toaster.create({
				title: 'You successfully logged in',
				type: 'success',
			})
			navigate('/chat')
		}
	}, [])

	useEffect(() => {
		if (isSuccess) {
			signInFormik.resetForm()
			toaster.create({
				title: 'You successfully logged in',
				type: 'success',
			})
			navigate('/chat')
		}
		if (isError) {
			console.log(error)
			if ((error as any).status === 400 && (error as any).data.message === 'Please verify your email') {
				setOpenResendEmailModal(true)
			}
		}
	}, [isLoading])

	const googleLogin = useGoogleLogin({
		flow: 'auth-code',
		ux_mode: 'redirect',
		redirect_uri: import.meta.env.PROD
			? 'https://super-chat-react.onrender.com/login'
			: 'http://localhost:8000/api/v1/auth/google',
	})

	// @ts-ignore
	const submitHandler = async ({ email, password }: SignInFormValues) => {
		login({ email, password })
	}

	const signInFormik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().email('Invalid email address').required('Email is required'),
			password: Yup.string()
				.required('Password is required')
				.min(8, 'Password is too short - should be 8 chars minimum'),
		}),
		onSubmit: submitHandler,
	})

	return (
		<>
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
					mt={{ base: 0, lg: 28 }}
					gap={0}
				>
					<Box>
						<Image
							src='/images/waving-hand.png'
							alt='Waving hand emoji'
							width={47}
							height={47}
							mb={5}
						/>
					</Box>
					<Heading size='3xl'>Welcome back</Heading>
					<Text
						textStyle='md'
						mb={6}
					>
						Sign in to manage your account.
					</Text>
					<FormikProvider value={signInFormik}>
						<form onSubmit={signInFormik.handleSubmit}>
							<TextField
								label='Email'
								name='email'
								type='email'
								placeholder='Enter your email adress'
							/>
							<PasswordField
								label='Password'
								name='password'
								placeholder='Enter your password'
							/>
							<Link
								asChild
								mb={3}
							>
								<ReactRouterLink to='/forgot-password'>Forgot your password?</ReactRouterLink>
							</Link>
							<Button
								loading={isLoading}
								w='full'
								size='lg'
								type='submit'
							>
								Sign In
							</Button>
						</form>
					</FormikProvider>
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
								Or do it via other accounts
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
							onClick={() => googleLogin()}
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
					Don&apos;t have an account?&nbsp;
					<Link asChild>
						<ReactRouterLink to='/signup'>Sign Up</ReactRouterLink>
					</Link>
				</Box>
			</Box>
			<ResendVerificationCodeModal
				email={signInFormik.values.email}
				onClose={() => setOpenResendEmailModal(false)}
				initialOpen={openResendEmailModal}
			/>
		</>
	)
}

export default Login
