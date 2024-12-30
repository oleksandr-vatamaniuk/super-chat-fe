import { defineTokens } from '@chakra-ui/react'

const colorsTokens = defineTokens.colors({
	brand: {
		primary: { value: '#4C6FFF' },
		status: { value: '#2E5BFF' },
		heading: { value: '#1A1E2C' },
		text: { value: '#6F7C8B' },
		headingBlack: { value: '#040D32' },
		grey: {
			100: { value: '#F5F6F7' }, // input background  grey
			150: { value: '#EAEDF3' }, // DIVIDERS
			200: { value: '#6F7C8B80' }, // INACTIVE
			250: { value: '#6F7C8B' }, // text
			300: { value: '#6F7C8B' }, // secondary text
			350: { value: '#8E94A7' }, // dropdown
			400: { value: '#666666' }, // Dont have and accound
			450: { value: '#8798AD' },
			500: { value: '#2E384D' },
			600: { value: '#8097B1' },
		},
		blue: {
			100: { value: '#1943EF' },
			200: { value: '#eef2ff' },
		},
	},
})

export default colorsTokens
