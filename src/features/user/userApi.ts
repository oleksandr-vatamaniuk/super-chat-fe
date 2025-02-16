import apiSlice from '@store/apiSlice.ts'
import { setUser } from '@features/user/userSlice.ts'
import { IUser } from '@types'

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCurrentUser: builder.query<IUser, void>({
			query() {
				return {
					url: '/user',
					credentials: 'include',
				}
			},
			providesTags: ['User'],
			transformResponse: (result: { user: IUser }) => result.user,
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					dispatch(setUser(data))
				} catch (error) {
					console.log(error)
				}
			},
		}),
		getUserById: builder.query<IUser, string>({
			query(id) {
				return {
					url: `/user/${id}`,
					credentials: 'include',
				}
			},
		}),
		updateUser: builder.mutation<IUser, { name: string; age: string }>({
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
		updateAvatar: builder.mutation<IUser, FormData>({
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
		updateUserPassword: builder.mutation<IUser, { oldPassword: string; newPassword: string }>({
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
		findUsersByName: builder.mutation<IUser[], string>({
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
