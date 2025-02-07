import { useState, useEffect } from 'react'

export default function useIsOffline(): boolean {
	const [isAppOffline, setIsAppOffline] = useState<boolean>(!navigator.onLine)

	useEffect(() => {
		const handleOnline = () => setIsAppOffline(false)
		const handleOffline = () => setIsAppOffline(true)

		window.addEventListener('online', handleOnline)
		window.addEventListener('offline', handleOffline)

		return () => {
			window.removeEventListener('online', handleOnline)
			window.removeEventListener('offline', handleOffline)
		}
	}, [])

	return isAppOffline
}
