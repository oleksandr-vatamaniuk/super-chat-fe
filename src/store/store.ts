import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '@store/auth/authApi.ts'
import { userApi } from '@store/user/userApi.ts'
import authReducer from '@store/auth/authSlice.ts'
import userReducer from '@store/user/userSlice.ts'

const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		auth: authReducer,
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authApi.middleware, userApi.middleware]),
})

export type RootState = ReturnType<typeof store.getState>

export default store
