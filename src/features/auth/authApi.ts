import { logOut, setCredentials } from '@features/auth/authSlice.ts'
import { resetChatState } from '@features/chat/chatSlice.ts'
import apiSlice from '@store/apiSlice.ts'
import { setUser } from '@features/user/userSlice.ts'
import { SignInFormInput } from '@features/auth/pages/Login/Login.tsx'
import { GenericResponse } from '@types'
import { PasswordRecoveryFormInput } from '@features/auth/pages/ResetPassword/ResetPassword.tsx'

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<{ accessToken: string }, SignInFormInput>({
			query(data) {
				return {
					url: '/auth/login',
					method: 'POST',
					body: data,
				}
			},
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					dispatch(setCredentials(data))
				} catch (error) {
					console.error(error)
				}
			},
		}),
		loginWithGoogle: builder.mutation<{ accessToken: string }, string>({
			query(token) {
				return {
					url: '/auth/google',
					method: 'POST',
					body: {
						token,
					},
				}
			},
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					dispatch(setCredentials(data))
				} catch (error) {
					console.error(error)
				}
			},
		}),
		logOut: builder.mutation<void, void>({
			query() {
				return {
					method: 'POST',
					url: '/auth/logout',
					credentials: 'include',
				}
			},
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled
					dispatch(logOut())
					dispatch(setUser(null))
					dispatch(resetChatState())
					dispatch(apiSlice.util.resetApiState())
				} catch (error) {
					console.error(error)
				}
			},
		}),
		registerUser: builder.mutation<GenericResponse, { email: string; password: string; age?: string; name: string }>({
			query(data) {
				return {
					url: '/auth/register',
					method: 'POST',
					body: data,
				}
			},
		}),
		verifyUser: builder.mutation<GenericResponse, { email: string; verificationToken: string }>({
			query(data) {
				return {
					url: '/auth/verify_email',
					method: 'POST',
					body: data,
				}
			},
		}),
		forgotPassword: builder.mutation<GenericResponse, { email: string }>({
			query(data) {
				return {
					url: '/auth/forgot_password',
					method: 'POST',
					body: data,
				}
			},
		}),
		resetPassword: builder.mutation<GenericResponse, PasswordRecoveryFormInput & { email: string; token: string }>({
			query(data) {
				return {
					url: '/auth/reset_password',
					method: 'POST',
					body: data,
				}
			},
		}),
		resendVerificationEmail: builder.mutation<GenericResponse, string>({
			query(email) {
				return {
					url: '/auth/resend_verify_email',
					method: 'POST',
					body: {
						email,
					},
				}
			},
		}),
	}),
})

export const {
	useLoginMutation,
	useLogOutMutation,
	useRegisterUserMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useVerifyUserMutation,
	useResendVerificationEmailMutation,
} = authApiSlice
