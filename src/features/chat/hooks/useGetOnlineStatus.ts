import { useSelector } from 'react-redux'
import { selectIsUserOnline } from '@features/chat/chatSlice.ts'
import { useEffect, useState } from 'react'
import { IUser } from '@types'

const useGetOnlineStatus = (participant: IUser) => {
	const isUserOnline = useSelector((state) => selectIsUserOnline(state, participant._id))
	const [status, setStatus] = useState({
		isOnline: isUserOnline,
		lastSeen: participant?.updatedAt || null,
	})

	useEffect(() => {
		setStatus((prevStatus) => {
			return {
				isOnline: isUserOnline,
				lastSeen: !isUserOnline && prevStatus.isOnline ? new Date().toISOString() : prevStatus.lastSeen,
			}
		})
	}, [isUserOnline])

	return status
}

export default useGetOnlineStatus
