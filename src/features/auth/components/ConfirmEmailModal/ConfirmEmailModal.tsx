import { useState } from 'react'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { DialogBody, DialogCloseTrigger, DialogContent, DialogRoot, DialogTrigger } from '@components/chakra/dialog.tsx'
import { Button } from '@components/chakra/button.tsx'

const ConfirmEmailModal = () => {
	const [open, setOpen] = useState(false)
	return (
		<DialogRoot
			lazyMount
			open={open}
			placement='center'
			onOpenChange={(e) => setOpen(e.open)}
		>
			<DialogTrigger asChild>
				<Button variant='outline'>Open</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogCloseTrigger />
				<DialogBody
					pt={10}
					pb={6}
					px={6}
				>
					<Stack>
						<Heading
							textAlign='center'
							size='2xl'
						>
							Uh-oh, your email address has not been confirmed yet!
						</Heading>
						<Text
							textAlign='center'
							textStyle='md'
							mb={6}
						>
							Please check your inbox, junk or spam for the confirmation email and click on the link inside, so we know
							it’s definitely you.
						</Text>
						<Button>Resend Confirmation Email</Button>
					</Stack>
				</DialogBody>
			</DialogContent>
		</DialogRoot>
	)
}

export default ConfirmEmailModal
