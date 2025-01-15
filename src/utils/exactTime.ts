export function extractTime(dateString: string) {
	if (!dateString) {
		return 'Error date'
	}

	const now = new Date()
	const inputDate = new Date(dateString)

	const isToday = now.toDateString() === inputDate.toDateString()
	// @ts-ignore
	const isYesterday = new Date(now - 86400000).toDateString() === inputDate.toDateString() // 86400000 ms in a day

	if (isToday) {
		return `Today at ${inputDate.getHours()}:${inputDate.getMinutes().toString().padStart(2, '0')}`
	} else if (isYesterday) {
		return `Yesterday at ${inputDate.getHours()}:${inputDate.getMinutes().toString().padStart(2, '0')}`
	} else {
		return `${inputDate.getDate()}/${inputDate.getMonth() + 1}/${inputDate.getFullYear()}` // getMonth() is zero-based
	}
}
