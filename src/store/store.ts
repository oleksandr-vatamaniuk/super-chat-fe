import { configureStore, isRejectedWithValue, Middleware } from '@reduxjs/toolkit'
import { authApi } from '@store/auth/authApi.ts'
import { userApi } from '@store/user/userApi.ts'
import authReducer from '@store/auth/authSlice.ts'
import userReducer from '@store/user/userSlice.ts'
import chatReducer from '@store/chat/chatSlice.ts'
import { chatApi } from '@store/chat/chatApi.ts'
import { toaster } from '@components/chakra/toaster.tsx'

export const rtkQueryErrorLogger: Middleware = (_) => (next) => (action) => {
	if (isRejectedWithValue(action) && navigator.onLine) {
		console.error('RTK Query Error:', action)
		const status = (action.payload as { status: number }).status
		const errorMessage = (action.payload as { data: { message: string } }).data.message

		if (status !== 401 && errorMessage) {
			toaster.create({
				description: errorMessage,
				type: 'error',
			})
		}
	}

	return next(action)
}

const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		chat: chatReducer,
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[chatApi.reducerPath]: chatApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([authApi.middleware, userApi.middleware, chatApi.middleware, rtkQueryErrorLogger]),
})

export type RootState = ReturnType<typeof store.getState>

export default store
