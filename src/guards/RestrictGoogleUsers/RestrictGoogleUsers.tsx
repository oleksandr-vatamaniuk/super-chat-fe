import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '@features/user/userSlice.ts'

const RestrictGoogleUsers = () => {
	const user = useSelector(selectUser)

	if (!user || user.authProvider !== 'MAIL') {
		return (
			<Navigate
				to='/settings/edit-profile'
				replace
			/>
		)
	}

	return <Outlet />
}

export default RestrictGoogleUsers
