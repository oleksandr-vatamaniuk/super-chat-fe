import { screen } from '@testing-library/react'
import EmojiPopover from './EmojiPopover'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

// Mock the EmojiPicker component
vi.mock('emoji-picker-react', () => ({
	default: () => <div data-testid='emoji-picker'>Mock Emoji Picker</div>,
	EmojiStyle: {
		NATIVE: 'native',
	},
}))

describe('EmojiPopover', () => {
	const mockOnEmoji = vi.fn()

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders the popover trigger button', () => {
		renderWithChakra(
			<EmojiPopover
				onEmoji={mockOnEmoji}
				disabled={false}
			/>,
		)
		expect(screen.getByTestId('emojiPopoverTriger')).toBeEnabled()
	})

	it('renders the popover trigger button and respects the disabled prop', () => {
		renderWithChakra(
			<EmojiPopover
				onEmoji={mockOnEmoji}
				disabled={true}
			/>,
		)
		const triggerButton = screen.getByTestId('emojiPopoverTriger')
		expect(triggerButton).toBeInTheDocument()
		expect(triggerButton).toBeDisabled()
	})
})
