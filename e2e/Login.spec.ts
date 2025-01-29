import { test, expect } from '@playwright/test'

test.describe('Login Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:3000/login') // Replace with your app's URL
	})

	test('Login page - Sign in with valid credentials', async ({ page }) => {
		// Check the heading text
		const heading = await page.locator('h2')
		await expect(heading).toHaveText('Welcome back')

		// Check the paragraph text
		const paragraph = await page.locator('p')
		await expect(paragraph).toHaveText('Sign in to manage your account.')

		// Fill in the email input
		const emailInput = page.locator('#email')
		await emailInput.fill('dickdick@gmail.com')

		// Fill in the password input
		const passwordInput = page.locator('#password')
		await passwordInput.fill('hello123123')

		// Click the submit button
		const submitButton = page.locator('button[type="submit"]')
		await submitButton.click()

		// Wait for navigation or a success indication (customize as per your app's behavior)
		// Example: Check if the URL changes or a success message appears
		await page.waitForURL(/chat/)
		await expect(page).toHaveURL(/chat/) // Update with the expected URL after login

		// Check the h2 heading on the redirected page
		const chatHeading = await page.locator('h2')
		await expect(chatHeading).toHaveText('Chats')
	})

	test('Login page - Check links functionality', async ({ page }) => {
		// Check the 'Forgot Password' link
		const forgotPasswordLink = page.locator('a:has-text("Forgot your password?")')
		await expect(forgotPasswordLink).toBeVisible()
		await forgotPasswordLink.click()
		await expect(page).toHaveURL(/forgot-password/)

		// Navigate back to login
		await page.goto('/login') // Replace with your app's URL

		// Check the 'Sign Up' link
		const signUpLink = page.locator('a:has-text("Sign Up")')
		await expect(signUpLink).toBeVisible()
		await signUpLink.click()
		await expect(page).toHaveURL(/signup/)
	})
})
