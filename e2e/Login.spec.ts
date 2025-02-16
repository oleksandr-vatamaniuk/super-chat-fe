import { test, expect } from '@playwright/test'
import TestUser, { testUser1 } from './helpers/TestUser'

test.describe('Login Page', () => {
	const testUser = new TestUser(testUser1)

	test.beforeEach(async ({ page }) => {
		await page.goto('/login') // Replace with your app's URL
	})

	test('Login page - Check links functionality', async ({ page }) => {
		// Check the heading text
		const heading = await page.locator('h2')
		await expect(heading).toHaveText('Welcome back')

		const paragraph = await page.locator('p')
		await expect(paragraph).toHaveText('Sign in to manage your account.')

		const forgotPasswordLink = page.locator('a:has-text("Forgot your password?")')
		await expect(forgotPasswordLink).toBeVisible()
		await forgotPasswordLink.click()
		await expect(page).toHaveURL(/forgot-password/)

		await page.goto('/login')

		// Check the 'Sign Up' link
		const signUpLink = page.locator('a:has-text("Sign Up")')
		await expect(signUpLink).toBeVisible()
		await signUpLink.click()
		await expect(page).toHaveURL(/signup/)
	})

	test('Login page - Sign in with valid credentials and Logout', async ({ page, context }) => {
		await testUser.login(page)

		const chatHeading = await page.locator('h2')
		await expect(chatHeading).toHaveText('Chats')

		await testUser.logout(page, context)
	})

	test('Login page - Invalid email shows correct error message', async ({ page }) => {
		const email = 'test@test.com'
		const password = 'password'

		const emailInput = page.locator('[name="email"]')
		await emailInput.fill(email)

		const passwordInput = page.locator('[name="password"]')
		await passwordInput.fill(password)

		const submitButton = page.locator('button[type="submit"]')
		await submitButton.click()

		const toastMessage = page.locator('.chakra-toast__root')
		await expect(toastMessage).toHaveText(`Could not find user with email ${email}`)
	})

	test('Login page - Invalid password shows correct error message', async ({ page }) => {
		const email = testUser1.email
		const password = 'password'

		const emailInput = page.locator('[name="email"]')
		await emailInput.fill(email)

		const passwordInput = page.locator('[name="password"]')
		await passwordInput.fill(password)

		const submitButton = page.locator('button[type="submit"]')
		await submitButton.click()

		const toastMessage = page.locator('.chakra-toast__root') // Adjust selector based on your app's toast structure
		await expect(toastMessage).toHaveText('Invalid Password')
	})
})
