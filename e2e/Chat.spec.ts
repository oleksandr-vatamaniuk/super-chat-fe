import { expect, test } from '@playwright/test'
import TestUser, { testUser1, testUser2 } from './helpers/TestUser'

test.describe('Chat Page', () => {
	const TestUser1 = new TestUser(testUser1)

	test.beforeEach(async ({ page }) => {
		await page.goto('/login') // Replace with your app's URL
	})

	test('Create Read Update Delete Chat', async ({ page, context }) => {
		await TestUser1.login(page)

		const chatHeading = await page.locator('h2')
		await expect(chatHeading).toHaveText('Chats')

		const chatListBox = page.getByTestId('chatListBox')

		const secondParagraph = chatListBox.locator('p').nth(1)
		await expect(secondParagraph).toHaveText('Click the button above to create your first chat!')

		const newChatButton = page.getByRole('button', { name: 'New Chat' })
		await newChatButton.click()

		const newChatInput = page.locator('#searchUsers')
		await newChatInput.fill('Emcee')

		const newChatStack = await page.getByTestId('newChatStack')

		const name = newChatStack.locator('p').nth(0)

		await expect(name).toHaveText(testUser2.name)

		const email = newChatStack.locator('p').nth(1)

		await expect(email).toHaveText(testUser2.email)

		await newChatStack.locator('a').click()

		await expect(page).toHaveURL(/\/chat\/\w+/)

		const messageList = page.getByTestId('messageList')

		await expect(messageList).toHaveText('No messages yet. Send a message and break the silence!')

		const inputField = page.getByTestId('sendMessage')
		await expect(inputField).toBeVisible()

		await inputField.fill(testUser1.testMessage)

		await page.keyboard.press('Enter')

		const message = messageList.locator(`//p[text()="${testUser1.testMessage}"]`)

		await expect(message).toHaveText(testUser1.testMessage)

		const deleteChatTrigger = page.getByTestId('deleteChatTrigger')

		await deleteChatTrigger.click()

		const deleteChatButton = page.getByRole('button', { name: 'Delete Chat' })

		expect(deleteChatButton).toBeVisible()

		await deleteChatButton.click()

		await expect(page).toHaveURL(/chat/)

		const toastMessage = page.locator('.chakra-toast__root')
		await expect(toastMessage).toHaveText(`You successfully deleted chat with ${testUser2.name}`)

		await expect(secondParagraph).toHaveText('Click the button above to create your first chat!')

		await TestUser1.logout(page, context)
	})
})
