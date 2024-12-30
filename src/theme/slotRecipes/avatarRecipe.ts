import { defineSlotRecipe } from '@chakra-ui/react'
import { avatarAnatomy } from '@chakra-ui/react/anatomy'

const avatarRecipe = defineSlotRecipe({
	slots: avatarAnatomy.keys(),
	variants: {
		size: {
			'3xl': {
				root: {
					'--avatar-font-size': 'fontSizes.3xl',
					'--avatar-size': 'sizes.32',
				},
			},
		},
	},
})

export default avatarRecipe
