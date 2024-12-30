import EmojiPicker, { EmojiStyle } from 'emoji-picker-react'
import { FC, useState } from 'react'
import { CiFaceSmile } from 'react-icons/ci'
import { PopoverContent, PopoverRoot, PopoverTrigger } from '@components/chakra/popover.tsx'
import { Button } from '@components/chakra/button.tsx'

const EmojiPopover: FC<{ onEmoji: (emoji: string) => void }> = ({ onEmoji }) => {
	const [open, setOpen] = useState(false)

	const onEmojiHandler = (e: any) => {
		onEmoji(e.emoji)
		setOpen(false)
	}

	return (
		<PopoverRoot
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
		>
			<PopoverTrigger asChild>
				<Button
					color='brand.grey.250'
					size='md'
					px={3}
					variant='ghost'
					_hover={{
						color: 'brand.grey.500',
					}}
				>
					<CiFaceSmile />
				</Button>
			</PopoverTrigger>
			<PopoverContent w='full'>
				<EmojiPicker
					emojiStyle={EmojiStyle.NATIVE}
					lazyLoadEmojis={true}
					open={true}
					onEmojiClick={onEmojiHandler}
				/>
			</PopoverContent>
		</PopoverRoot>
	)
}

export default EmojiPopover
