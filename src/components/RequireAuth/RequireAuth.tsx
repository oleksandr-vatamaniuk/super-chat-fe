import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectAccessToken } from '@store/auth/authSlice'
import { useGetCurrentUserQuery } from '@store/user/userApi'
import { selectUser } from '@store/user/userSlice'
import { Loading } from '@components'
import { useGetChatsQuery } from '@store/chat/chatApi.ts'

const RequireAuth = () => {
	const token = useSelector(selectAccessToken)
	const user = useSelector(selectUser)

	const { isLoading, isError } = useGetCurrentUserQuery(null, {
		skip: !token,
		refetchOnMountOrArgChange: true,
	})

	const { isLoading: isLoadingChats, data: chatData } = useGetChatsQuery(undefined, {
		skip: !token,
		refetchOnMountOrArgChange: true,
	})

	if (!token || isError) return <Navigate to='/login' />

	if (isLoading || (isLoadingChats && !user && !chatData)) return <Loading />

	return <Outlet />
}

export default RequireAuth
