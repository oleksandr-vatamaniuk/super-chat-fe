import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/store.ts'

interface AuthState {
	accessToken: string | null
}

const initialState: AuthState = {
	accessToken: localStorage.getItem('accessToken') || null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<AuthState>) => {
			const { accessToken } = action.payload
			state.accessToken = accessToken
			localStorage.setItem('accessToken', accessToken!)
		},
		logOut: () => {
			localStorage.removeItem('accessToken')
			return initialState
		},
	},
})

export const { setCredentials, logOut } = authSlice.actions

export const selectAccessToken = (state: RootState) => state.auth.accessToken

export default authSlice.reducer
