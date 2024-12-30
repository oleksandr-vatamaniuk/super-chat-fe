import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const initialState = {
	user: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
			localStorage.setItem('userId', action.payload.id)
		},
	},
})

export default userSlice.reducer

export const { setUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user
