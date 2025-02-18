import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import Header from './Header'
import useIsOffline from '@hooks/useIsOffline'
import { useWebsocketConnectQuery } from '@features/chat/chatApi'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

vi.mock('@hooks/useIsOffline', () => ({
	default: vi.fn(),
}))

vi.mock('@features/chat/chatApi.ts', () => ({
	useWebsocketConnectQuery: vi.fn(),
}))

vi.mock('@features/user/components', () => ({
	MobileNavigation: () => <div data-testid='mobile-navigation' />,
	UserProfile: () => <div data-testid='user-profile' />,
}))

vi.mock('@features/chat/components', () => ({
	SearchModal: () => <div data-testid='search-modal' />,
}))

describe('Header', () => {
	// const mockUseIsOffline = vi.fn()

	beforeEach(() => {
		vi.mocked(useWebsocketConnectQuery as any).mockReturnValue(undefined)
		vi.mocked(useIsOffline).mockReturnValue(false)
	})

	it('renders correctly when online', () => {
		vi.mocked(useWebsocketConnectQuery as any).mockReturnValue({})
		vi.mocked(useIsOffline).mockReturnValue(false)
		renderWithChakra(<Header />)

		// Check if the header container is rendered
		const header = screen.getByRole('heading')
		expect(header).toBeInTheDocument()

		// Check if the logo is rendered
		const logo = screen.getByRole('img', { name: 'Logo' })
		expect(logo).toBeInTheDocument()

		// Check if child components are rendered
		expect(screen.getByTestId('mobile-navigation')).toBeInTheDocument()
		expect(screen.getByTestId('search-modal')).toBeInTheDocument()
		expect(screen.getByTestId('user-profile')).toBeInTheDocument()

		// Check if the offline banner is not rendered
		expect(screen.queryByText('You are offline 😕')).not.toBeInTheDocument()
	})

	it('renders the offline banner when offline', () => {
		vi.mocked(useWebsocketConnectQuery as any).mockReturnValue({})
		vi.mocked(useIsOffline).mockReturnValue(true)
		renderWithChakra(<Header />)

		// Check if the offline banner is rendered
		const offlineBanner = screen.getByText('You are offline 😕')
		expect(offlineBanner).toBeInTheDocument()
	})

	it('renders the correct logo for medium screens and above', () => {
		// Mock useBreakpointValue to return the medium screen logo
		vi.mock('@chakra-ui/react', async () => {
			const actual = await vi.importActual('@chakra-ui/react')
			return {
				...actual,
				useBreakpointValue: vi.fn().mockReturnValue('/images/logo-black.png'),
			}
		})

		renderWithChakra(<Header />)

		// Check if the medium screen logo is rendered
		const logo = screen.getByRole('img', { name: 'Logo' })
		expect(logo).toHaveAttribute('src', '/images/logo-black.png')
	})
})
