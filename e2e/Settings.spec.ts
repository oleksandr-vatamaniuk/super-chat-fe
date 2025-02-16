import { expect, test } from '@playwright/test'
import TestUser, { testUser1 } from './helpers/TestUser'

test.describe('Settings Page', () => {
	const testUser = new TestUser(testUser1)

	test.beforeEach(async ({ page }) => {
		await page.goto('/login')
		await testUser.login(page)
	})

	test.afterEach(async ({ page, context }) => {
		await testUser.logout(page, context)
	})

	test('Update User Name', async ({ page }) => {
		const updateName = 'Oliver'

		const currentUserName = await page.getByTestId('userName')
		await expect(currentUserName).toHaveText(testUser.name)

		const userProfile = await page.getByTestId('userProfile')

		const userProfileButton = await userProfile.getByRole('button')
		await userProfileButton.click()

		const editProfileLink = await page.locator('a[href="/settings/edit-profile"]')
		await editProfileLink.click()

		await page.waitForURL(/settings\/edit-profile/)
		await expect(page).toHaveURL(/settings\/edit-profile/)

		const nameInput = page.locator('[name="name"]')
		await nameInput.fill(updateName)

		const submitButton = page.locator('button[type="submit"]')
		await submitButton.click()

		const toastMessage = page.locator('.chakra-toast__root')
		await expect(toastMessage).toHaveText('You have successfully updated your profile')

		await expect(currentUserName).toHaveText(updateName)

		await nameInput.fill(testUser.name)
		await submitButton.click()
		await expect(toastMessage).toHaveText('You have successfully updated your profile')

		await expect(currentUserName).toHaveText(testUser.name)
	})
})
