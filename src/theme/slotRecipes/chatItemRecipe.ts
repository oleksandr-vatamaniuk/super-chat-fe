import { defineSlotRecipe } from '@chakra-ui/react'

const chatItemRecipe = defineSlotRecipe({
	slots: ['root', 'detail', 'messageCount', 'fakeLink'],
	base: {
		root: {
			borderRadius: 8,
			py: 4,
			bg: 'white',
		},
		detail: {
			h: 'full',
			px: 4,
		},
		messageCount: {
			flexShrink: 0,
			alignSelf: 'end',
			textAlign: 'center',
			lineHeight: '22px',
			width: '22px',
			height: '22px',
			fontSize: 'xs',
			color: 'white',
			bg: 'brand.status',
			borderRadius: 'full',
		},
		fakeLink: {
			px: 2.5,
			color: 'brand.status',
			fontSize: 'sm',
			fontWeight: 500,
			hideBelow: 'md',
			_hover: {
				color: 'brand.primary',
				textDecoration: 'underline',
			},
		},
	},
	variants: {
		size: {
			small: {
				root: {
					borderBottomColor: 'brand.divider',
					borderBottomWidth: '1px',
					borderRadius: 0,
				},
				detail: {
					justifyContent: 'start',
					alignItems: 'end',
					flexDirection: 'column',
				},
				fakeLink: {
					display: 'none',
				},
			},
			full: {
				detail: {
					justifyContent: { base: 'start', md: 'space-between' },
					alignItems: { base: 'end', md: 'center' },
					flexDirection: { base: 'column', md: 'row' },
				},
				fakeLink: {
					display: 'block',
				},
				messageCount: {
					mx: 3,
				},
			},
		},
	},
})

export default chatItemRecipe
