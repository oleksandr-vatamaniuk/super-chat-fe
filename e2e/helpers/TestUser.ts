import { BrowserContext, expect, Page } from '@playwright/test'

export const testUser1 = {
	email: 'ximeji4369@minduls.com',
	password: 'hello123123',
	name: 'TestUser1',
	testMessage: 'Hello, from TestUser1',
}

export const testUser2 = {
	email: 'dickdick@gmail.com',
	password: 'hello123123',
	name: 'Emcee',
	testMessage: 'Hello, from TestUser2',
}

type TestUserParams = {
	email: string
	password: string
	name?: string
	testMessage?: string
}

class TestUser {
	email: string
	password: string
	name: string
	testMessage: string

	constructor({ email, password, name = 'Unknown', testMessage = 'Hello World' }: TestUserParams) {
		this.email = email
		this.password = password
		this.name = name
		this.testMessage = testMessage
	}

	async login(page: Page) {
		await page.goto('/login')

		const emailInput = page.locator('[name="email"]')
		await emailInput.fill(this.email)

		const passwordInput = page.locator('[name="password"]')
		await passwordInput.fill(this.password)

		const submitButton = page.locator('button[type="submit"]')
		await submitButton.click()

		await page.waitForURL(/chat/)
		await expect(page).toHaveURL(/chat/)
	}

	async logout(page: Page, context: BrowserContext) {
		const logoutButton = page.getByTestId('logoutBtn')
		await logoutButton.click()

		await page.waitForURL(/login/)
		await expect(page).toHaveURL(/login/)

		const cookies = await context.cookies()
		const refreshToken = cookies.find((cookie) => cookie.name === 'refreshToken')
		expect(refreshToken).toBeUndefined() // refreshToken should be removed
	}
}

export default TestUser
