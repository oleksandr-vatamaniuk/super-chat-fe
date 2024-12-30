import { Box, Heading, HStack, Center } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import TabLink from '@features/settings/components/TabLink/TabLink.tsx'

const Settings = () => {
	return (
		<Center md={{ mt: 14 }}>
			<Box
				bg='white'
				borderRadius='md'
				p={8}
				w='full'
				maxWidth={640}
			>
				<Heading mb={4}>Manage your Account</Heading>
				<HStack
					borderBottomColor='brand.grey.150'
					borderBottomWidth={1}
					gap={{ base: 3, md: 0 }}
				>
					<TabLink to='edit-profile'>Edit Information</TabLink>
					<TabLink to='change-avatar'>User Avatar</TabLink>
					<TabLink to='change-password'>Change Password</TabLink>
				</HStack>
				<Box pt={{ base: 6, md: 9 }}>
					<Outlet />
				</Box>
			</Box>
		</Center>
	)
}

export default Settings
