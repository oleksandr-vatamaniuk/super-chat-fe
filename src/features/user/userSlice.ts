import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@store/store.ts'

export type User = {
	_id?: string
	name: string
	avatar: string
}

type UserState = {
	user: User | null
}

const initialState: UserState = {
	user: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
		},
	},
})

export default userSlice.reducer

export const { setUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user!
