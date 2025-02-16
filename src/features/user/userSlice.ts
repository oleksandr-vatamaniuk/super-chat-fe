import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/store.ts'
import { IUser } from '@types'

type UserState = {
	user: IUser | null
}

const initialState: UserState = {
	user: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser | null>) => {
			state.user = action.payload
		},
	},
})

export default userSlice.reducer

export const { setUser } = userSlice.actions

export const selectUser = (state: RootState): IUser | null => state.user.user!
