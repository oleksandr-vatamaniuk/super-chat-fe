import { render, screen } from '@testing-library/react'
import ChatHeaderLoading from '../ChatHeaderLoading'
import { ChakraProvider } from '@chakra-ui/react'
import config from '@theme/theme.ts'

describe('ChatHeaderLoading', () => {
	it('renders the skeleton elements', () => {
		render(
			<ChakraProvider value={config}>
				<ChatHeaderLoading />
			</ChakraProvider>,
		)

		expect(screen.getByTestId('skeleton-circle')).toBeInTheDocument()
		expect(screen.getByTestId('skeleton-text-lg')).toBeInTheDocument()
		expect(screen.getByTestId('skeleton-text-sm')).toBeInTheDocument()
	})
})
