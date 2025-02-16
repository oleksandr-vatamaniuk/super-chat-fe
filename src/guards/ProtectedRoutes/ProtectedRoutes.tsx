import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectAccessToken } from '@features/auth/authSlice.ts'
import { Loading } from '@components'
import { useGetChatsQuery } from '@features/chat/chatApi.ts'
import { selectUser } from '@features/user/userSlice.ts'
import { useGetCurrentUserQuery } from '@features/user/userApi.ts'

const ProtectedRoutes = () => {
	const token = useSelector(selectAccessToken)
	const user = useSelector(selectUser)

	const { isLoading, isError } = useGetCurrentUserQuery(undefined, {
		skip: !token,
		refetchOnMountOrArgChange: true,
	})

	const { isLoading: isLoadingChats, data: chatData } = useGetChatsQuery(undefined, {
		skip: !token || isError,
		refetchOnMountOrArgChange: true,
	})

	if (!token || isError) return <Navigate to='/login' />

	if (isLoading || (isLoadingChats && !user && !chatData)) return <Loading />

	return <Outlet />
}

export default ProtectedRoutes
