import { defineSlotRecipe } from '@chakra-ui/react'

export const messageRecipe = defineSlotRecipe({
	slots: ['root', 'container', 'bubble', 'bubbleText', 'label', 'time'],
	base: {
		root: {
			transition: 'background-color 1s ease-out',
			w: 'full',
			mb: 2,
			gap: 2,
			display: 'flex',
			alignItems: 'end',
		},
		bubble: {
			flexDirection: { base: 'column', lg: 'row' },
			maxWidth: { xl: '400px' },
			// maxWidth: { base: '75%', xl: '400px' },
			minWidth: '120px',
			borderRadius: '1rem',
			position: 'relative',
			_before: {
				content: "''",
				position: 'absolute',
				bottom: '-6px',
				width: '0px',
				height: '0px',
				borderStyle: 'solid',
				transform: 'rotate(0deg)',
			},
		},
		label: {
			textAlign: 'right',
			textStyle: 'sm',
			color: 'brand.text',
		},
		bubbleText: {
			m: { base: 3, lg: 4 },
			mb: { base: 0, lg: 6 },
			textStyle: 'sm',
		},
		time: {
			py: { base: 1, lg: 2 },
			px: { base: 2, lg: 4 },
			alignSelf: 'end',
			textStyle: 'xs',
			fontSize: { base: '10px', lg: '12px' },
		},
		container: {
			pb: 2,
			gap: 2,
		},
	},
	variants: {
		variant: {
			sender: {
				root: {
					flexDirection: 'row',
					justifyContent: 'end',
				},
				bubble: {
					borderBottomRightRadius: 0,
					bg: 'brand.primary',
					color: 'white',
					_before: {
						right: 0,
						borderWidth: '0 6px 6px 0',
						borderColor: 'transparent #2E5BFF transparent transparent',
					},
				},
				label: {
					textAlign: 'right',
				},
				container: {
					alignItems: 'end',
				},
			},
			receiver: {
				root: {
					flexDirection: 'row-reverse',
					justifyContent: 'start',
				},
				bubble: {
					borderBottomLeftRadius: 0,
					bg: 'white',
					color: 'brand.grey.500',
					_before: {
						left: 0,
						borderWidth: '6px 6px 0 0',
						borderColor: 'white transparent transparent  transparent ',
					},
				},
				label: {
					textAlign: 'left',
				},
				time: {
					color: 'brand.grey.600',
				},
			},
		},
	},
})

export default messageRecipe
