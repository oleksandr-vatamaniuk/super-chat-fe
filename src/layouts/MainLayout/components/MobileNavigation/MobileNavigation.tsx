import { useRef, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import {
	DrawerBackdrop,
	DrawerBody,
	DrawerCloseTrigger,
	DrawerContent,
	DrawerRoot,
	DrawerTrigger,
} from '@components/chakra/drawer.tsx'
import { Button } from '@components/chakra/button.tsx'
import { Navigation } from '@layouts/MainLayout/components'

const MobileNavigation = () => {
	const [open, setOpen] = useState(false)
	const ref = useRef(null)

	return (
		<DrawerRoot
			initialFocusEl={() => ref.current}
			placement='bottom'
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
		>
			<DrawerTrigger asChild>
				<Button
					variant='ghost'
					size='sm'
				>
					<GiHamburgerMenu />
				</Button>
			</DrawerTrigger>
			<DrawerBackdrop />
			<DrawerContent ref={ref}>
				<DrawerBody>
					<Navigation />
				</DrawerBody>
				<DrawerCloseTrigger />
			</DrawerContent>
		</DrawerRoot>
	)
}

export default MobileNavigation
