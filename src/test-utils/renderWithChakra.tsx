import { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import config from '@theme/theme.ts'

const renderWithChakra = (ui: ReactElement) => {
	return render(<ChakraProvider value={config}>{ui}</ChakraProvider>)
}

export default renderWithChakra
