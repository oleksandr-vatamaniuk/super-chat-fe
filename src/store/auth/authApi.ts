import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from '@store/customFetchBase.ts'
import { setCredentials } from '@store/auth/authSlice.ts'

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: customFetchBase,
	endpoints: (builder) => ({
		login: builder.mutation({
			query(data) {
				return {
					url: '/auth/login',
					method: 'POST',
					credentials: 'include',
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
	}),
})

export const { useLoginMutation } = authApi
