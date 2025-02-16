import { describe, expect, it } from 'vitest'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'
import { screen } from '@testing-library/react'
import MessagesLoadingState from '../MessagesLoadingState.tsx'

describe('MessagesEmptyState component', () => {
	it('renders the skeleton loaders', () => {
		renderWithChakra(<MessagesLoadingState />)

		expect(screen.getByTestId('skeleton-stack')).toBeInTheDocument() // Counting all Skeleton and SkeletonCircle components
	})
})
