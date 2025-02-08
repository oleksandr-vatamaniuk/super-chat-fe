import { configureStore, isRejectedWithValue, Middleware } from '@reduxjs/toolkit'
import authReducer from '@features/auth/authSlice.ts'
import chatReducer from '@features/chat/chatSlice.ts'
import userReducer from '@features/user/userSlice.ts'
import { toaster } from '@components/chakra/toaster.tsx'
import apiSlice from '@store/apiSlice.ts'

export const rtkQueryErrorLogger: Middleware = (_) => (next) => (action) => {
	if (isRejectedWithValue(action) && navigator.onLine) {
		console.error('RTK Query Error:', action)
		const status = (action.payload as { status: number }).status
		const errorMessage = (action.payload as { data: { message: string } }).data.message || null

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
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([apiSlice.middleware, rtkQueryErrorLogger]),
})

export type RootState = ReturnType<typeof store.getState>

export default store
