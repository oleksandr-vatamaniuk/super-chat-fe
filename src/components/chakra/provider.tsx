'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode'

import config from '@theme/theme.ts'

export function Provider(props: ColorModeProviderProps) {
	return (
		<ChakraProvider value={config}>
			<ColorModeProvider {...props} />
		</ChakraProvider>
	)
}
