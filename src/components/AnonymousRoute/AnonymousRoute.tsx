import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAccessToken } from '@store/auth/authSlice.ts'

export const AnonymousRoutes = () => {
	const token = useSelector(selectAccessToken)

	return token ? (
		<Navigate
			to='/chat'
			replace
		/>
	) : (
		<Outlet />
	)
}

export default AnonymousRoutes
