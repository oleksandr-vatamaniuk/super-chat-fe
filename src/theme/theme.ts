import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

import { breakPoints, colors, fonts } from './tokens'
import { buttonRecipe, headingRecipe, inputRecipe, linkRecipe } from './recipes'
import { avatarRecipe, chatItemRecipe, checkboxRecipe, fieldRecipe, messageRecipe } from './slotRecipes'

const config = defineConfig({
	globalCss: {
		'*::placeholder': {
			color: 'colors.brand.text',
		},
	},
	theme: {
		breakpoints: breakPoints,
		tokens: {
			colors: colors,
			fonts: fonts,
		},
		recipes: {
			input: inputRecipe,
			link: linkRecipe,
			button: buttonRecipe,
			heading: headingRecipe,
		},
		slotRecipes: {
			field: fieldRecipe,
			checkbox: checkboxRecipe,
			chatItem: chatItemRecipe,
			message: messageRecipe,
			avatar: avatarRecipe,
		},
	},
})

export default createSystem(defaultConfig, config)
