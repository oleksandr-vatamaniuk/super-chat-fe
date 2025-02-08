export function extractTime(dateString: string) {
	if (!dateString || isNaN(Date.parse(dateString))) {
		return 'Error date'
	}

	const now = new Date()
	const inputDate = new Date(dateString)

	// Use UTC for midnight calculation
	const nowMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
	const inputMidnight = Date.UTC(inputDate.getUTCFullYear(), inputDate.getUTCMonth(), inputDate.getUTCDate())

	const timeDiff = nowMidnight - inputMidnight
	const oneDayMs = 86400000 // 1 day in milliseconds

	if (timeDiff === 0) {
		return `Today at ${inputDate.getUTCHours()}:${inputDate.getUTCMinutes().toString().padStart(2, '0')}`
	} else if (timeDiff === oneDayMs) {
		return `Yesterday at ${inputDate.getUTCHours()}:${inputDate.getUTCMinutes().toString().padStart(2, '0')}`
	} else {
		return `${inputDate.getUTCDate()}/${inputDate.getUTCMonth() + 1}/${inputDate.getUTCFullYear()}`
	}
}
