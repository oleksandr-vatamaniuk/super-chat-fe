import { defineRecipe } from '@chakra-ui/react'

const inputRecipe = defineRecipe({
	defaultVariants: {
		variant: 'primary',
		size: 'lg',
	},
	variants: {
		size: {
			lg: {
				'--input-height': 'sizes.12',
				fontSize: 'sm',
				px: '8',
			},
		},
		variant: {
			primary: {
				bg: 'brand.grey.100',
				borderColor: 'transparent',
				borderWidth: '1px',
				focusVisibleRing: 'inside',
				_focusVisible: {
					borderColor: 'brand.primary',
					focusRingColor: 'transparent',
				},
			},
		},
	},
})

export default inputRecipe
