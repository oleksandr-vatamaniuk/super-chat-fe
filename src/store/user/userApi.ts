import { createApi } from '@reduxjs/toolkit/query/react'
import { setUser } from '@store/user/userSlice'
import customFetchBase from '@store/customFetchBase.ts'

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: customFetchBase,
	tagTypes: ['User'],
	endpoints: (builder) => ({
		getCurrentUser: builder.query({
			query() {
				return {
					url: '/user',
					credentials: 'include',
				}
			},
			providesTags: ['User'],
			transformResponse: (result: { user: any }) => result.user,
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					dispatch(setUser(data))
					console.log('set user')
				} catch (error) {
					console.log(error)
				}
			},
		}),
		findUserById: builder.query({
			query(id) {
				return {
					url: `/user/${id}`,
					credentials: 'include',
				}
			},
		}),
		updateUser: builder.mutation({
			query(body) {
				return {
					method: 'POST',
					url: '/user/update-user',
					credentials: 'include',
					body,
				}
			},
			invalidatesTags: ['User'],
		}),
		updateAvatar: builder.mutation({
			query(body) {
				return {
					method: 'PATCH',
					url: '/user/update-avatar',
					credentials: 'include',
					body,
				}
			},
			invalidatesTags: ['User'],
		}),
		updateUserPassword: builder.mutation({
			query(body) {
				return {
					method: 'PATCH',
					url: '/user/update-user-password',
					credentials: 'include',
					body,
				}
			},
			invalidatesTags: ['User'],
		}),
		findUsersByName: builder.mutation({
			query(body) {
				return {
					method: 'POST',
					url: '/user/find-users',
					credentials: 'include',
					body,
				}
			},
		}),
	}),
})

export const {
	useGetCurrentUserQuery,
	useUpdateUserMutation,
	useUpdateAvatarMutation,
	useUpdateUserPasswordMutation,
	useFindUsersByNameMutation,
	useFindUserByIdQuery,
} = userApi
