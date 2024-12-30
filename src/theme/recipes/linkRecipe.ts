import { defineRecipe } from '@chakra-ui/react'

const linkRecipe = defineRecipe({
	defaultVariants: {
		variant: 'primary',
	},
	variants: {
		variant: {
			primary: {
				fontSize: 'sm',
				color: 'brand.primary',
				fontWeight: '500',
				_hover: {
					textDecoration: 'underline',
				},
			},
		},
	},
})

export default linkRecipe
