export function getRelativeTime(time: string): string {
	const messageTime = new Date(time)
	const now = new Date()
	const diffInSeconds = Math.floor((now.getTime() - messageTime.getTime()) / 1000)
	const diffInMinutes = Math.floor(diffInSeconds / 60)
	const diffInHours = Math.floor(diffInMinutes / 60)

	if (diffInSeconds < 40) return 'Just now'
	if (diffInMinutes < 60) return `${diffInMinutes}m`
	if (diffInHours < 24) return `${diffInHours}h`

	const formattedDate = messageTime.toLocaleDateString('en-GB', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
	})

	return formattedDate
}
