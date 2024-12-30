import { defineSlotRecipe } from '@chakra-ui/react'
import { fieldAnatomy } from '@chakra-ui/react/anatomy'

const fieldRecipe = defineSlotRecipe({
	slots: fieldAnatomy.keys(),
	base: {
		root: {
			mb: 4,
		},
		label: {
			fontWeight: '500',
			color: 'brand.grey.250',
		},
	},
})

export default fieldRecipe
