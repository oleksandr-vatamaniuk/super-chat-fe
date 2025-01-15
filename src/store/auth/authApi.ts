import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from '@store/customFetchBase.ts'
import { logOut, setCredentials } from '@store/auth/authSlice.ts'
import { chatApi } from '@store/chat/chatApi.ts'
import { userApi } from '@store/user/userApi.ts'
import { setUser } from '@store/user/userSlice.ts'
import { resetChatState } from '@store/chat/chatSlice.ts'

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: customFetchBase,
	endpoints: (builder) => ({
		login: builder.mutation({
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
		logOut: builder.mutation({
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
					dispatch(chatApi.util.resetApiState())
					dispatch(userApi.util.resetApiState())
				} catch (error) {
					console.error(error)
				}
			},
		}),
		registerUser: builder.mutation({
			query(data) {
				return {
					url: '/auth/register',
					method: 'POST',
					body: data,
				}
			},
		}),
		verifyUser: builder.mutation({
			query(data) {
				return {
					url: '/auth/verify_email',
					method: 'POST',
					body: data,
				}
			},
		}),
		forgotPassword: builder.mutation({
			query(data) {
				return {
					url: '/auth/forgot_password',
					method: 'POST',
					body: data,
				}
			},
		}),
		resetPassword: builder.mutation({
			query(data) {
				return {
					url: '/auth/reset_password',
					method: 'POST',
					body: data,
				}
			},
		}),
		resendVerificationEmail: builder.mutation({
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
} = authApi
