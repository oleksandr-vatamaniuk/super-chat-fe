import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { Box, chakra, defineRecipe } from '@chakra-ui/react'

type TabLinkProps = React.ComponentProps<typeof NavLink> & {
	children: React.ReactNode
}

const tabLinkRecipe = defineRecipe({
	className: 'custom-tab',
	base: {
		w: 'full',
		fontSize: 'sm',
		textAlign: 'center',
		py: 3.5,
		position: 'relative',
		fontWeight: 500,
		display: 'inline-block',
		textDecoration: 'none',
		md: {
			maxWidth: '128px',
		},
		_before: {
			content: '""',
			width: '100%',
			height: '2px',
			position: 'absolute',
			bottom: 0,
			left: 0,
		},
	},
	variants: {
		variant: {
			active: {
				color: 'brand.status',
				_before: { bg: 'brand.status' },
				_hover: {
					_before: { bg: 'brand.primary' },
					color: 'brand.status',
				},
			},
			inactive: {
				color: 'brand.text/50',
				_before: { bg: 'none' },
				_hover: {
					_before: { bg: 'brand.status/50' },
					color: 'brand.primary',
				},
			},
		},
	},
	defaultVariants: {
		variant: 'inactive',
	},
})

const TabLinkElement = chakra('span', tabLinkRecipe)

const TabLink: FC<TabLinkProps> = ({ children, ...props }) => {
	return (
		<Box
			w={{ md: 'full' }}
			maxWidth={{ base: 'full', md: '128px' }}
			asChild
		>
			<NavLink {...props}>
				{({ isActive }) => <TabLinkElement variant={isActive ? 'active' : 'inactive'}>{children}</TabLinkElement>}
			</NavLink>
		</Box>
	)
}

export default TabLink
