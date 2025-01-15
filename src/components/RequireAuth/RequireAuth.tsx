import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectAccessToken } from '@store/auth/authSlice'
import { useGetCurrentUserQuery } from '@store/user/userApi'
import { selectUser } from '@store/user/userSlice'
import { Loading } from '@components'
import { useWebsocketConnectQuery } from '@store/chat/chatApi.ts'

const RequireAuth = () => {
	const token = useSelector(selectAccessToken)
	const user = useSelector(selectUser)

	const { isLoading, isError } = useGetCurrentUserQuery(null, {
		skip: !token,
		refetchOnMountOrArgChange: true,
	})

	useWebsocketConnectQuery(undefined, {
		skip: !token && !user,
	})

	// Redirect to login if no token or if there's an error
	if (!token || isError) return <Navigate to='/login' />

	// Show loading message while fetching user data
	if (isLoading && !user) return <Loading />

	// Render outlet if user is authenticated
	return <Outlet />
}

export default RequireAuth
