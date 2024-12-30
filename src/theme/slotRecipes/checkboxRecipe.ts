import { defineSlotRecipe } from '@chakra-ui/react'
import { checkboxAnatomy } from '@chakra-ui/react/anatomy'

const checkboxRecipe = defineSlotRecipe({
	base: {
		label: {
			color: 'brand.grey.400',
			fontWeight: '500',
			fontSize: 'md',
		},
	},
	variants: {
		size: {
			md: {
				label: {
					textStyle: 'sm',
				},
			},
		},
	},
	slots: checkboxAnatomy.keys(),
})

export default checkboxRecipe
