import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import { logOut, setCredentials } from '@store/auth/authSlice.ts'
import { RootState } from '@store/store.ts'

const baseUrl = `${import.meta.env.VITE_SERVER_ENDPOINT}/api/v1`

// Create a new mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
	baseUrl,
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.accessToken

		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}

		return headers
	},
})

const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions,
) => {
	// wait until the mutex is available without locking it
	await mutex.waitForUnlock()
	let result = await baseQuery(args, api, extraOptions)
	if (result?.error?.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire()

			try {
				const refreshResult = await baseQuery({ credentials: 'include', url: '/refresh_token' }, api, extraOptions)

				if (refreshResult.data) {
					// @ts-ignore
					api.dispatch(setCredentials({ accessToken: refreshResult.data.accessToken! }))
					// Retry the initial query
					result = await baseQuery(args, api, extraOptions)
				} else {
					api.dispatch(logOut)
					window.location.href = '/login'
				}
			} finally {
				// release must be called once the mutex should be released again.
				release()
			}
		} else {
			// wait until the mutex is available without locking it
			await mutex.waitForUnlock()
			result = await baseQuery(args, api, extraOptions)
		}
	}

	return result
}

export default customFetchBase
