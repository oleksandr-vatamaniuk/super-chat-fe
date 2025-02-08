import { FC, useEffect } from 'react'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { DialogBody, DialogCloseTrigger, DialogContent, DialogRoot } from '@components/chakra/dialog.tsx'
import { Button } from '@components/chakra/button.tsx'
import { useResendVerificationEmailMutation } from '@features/auth/authApi.ts'
import { toaster } from '@components/chakra/toaster.tsx'

const ResendVerificationCodeModal: FC<{ initialOpen: boolean; onClose: () => void; email: string }> = ({
	email = '',
	initialOpen = false,
	onClose,
}) => {
	const [resendVerificationEmail, { isLoading, isSuccess, isError }] = useResendVerificationEmailMutation()

	const resendVerificationEmailHandler = () => {
		if (email) {
			resendVerificationEmail(email)
		}
	}

	useEffect(() => {
		if (isSuccess) {
			toaster.create({
				title: 'Email verification send',
				type: 'success',
			})
			onClose()
		}
		if (isError) {
			onClose()
		}
	}, [isLoading])

	return (
		<DialogRoot
			lazyMount
			open={initialOpen}
			placement='center'
			onOpenChange={(e) => {
				if (!e.open) onClose()
			}}
		>
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
						<Button
							onClick={resendVerificationEmailHandler}
							loading={isLoading}
						>
							Resend Confirmation Email
						</Button>
					</Stack>
				</DialogBody>
			</DialogContent>
		</DialogRoot>
	)
}

export default ResendVerificationCodeModal
