import { defineRecipe } from '@chakra-ui/react'

const buttonRecipe = defineRecipe({
	variants: {
		size: {
			xl: {
				height: '14',
				fontSize: 'lg',
			},
			lg: {
				fontSize: 'sm',
				height: '11',
				minWidth: '108px',
			},
		},
		variant: {
			solid: {
				bgColor: 'brand.primary',
				color: 'white',
				_hover: {
					bgColor: 'blue.400',
				},
			},
			ghost: {
				_hover: {
					bgColor: 'brand.grey.100',
				},
			},
			surface: {
				bg: 'white',
				shadow: '0 1px 4px var(--shadow-color)',
				_hover: {
					bg: 'white',
					shadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
				},
			},
		},
	},
})

export default buttonRecipe
