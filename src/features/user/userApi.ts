import apiSlice from '@store/apiSlice.ts'
import { setUser } from '@features/user/userSlice.ts'

export const userApiSlice = apiSlice.injectEndpoints({
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
		getUserById: builder.query({
			query(id) {
				console.log('get user by id')
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
			query(name) {
				return {
					method: 'POST',
					url: '/user/find-users',
					credentials: 'include',
					body: {
						name,
					},
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
	useGetUserByIdQuery,
} = userApiSlice
