import { Box, Heading, Text } from '@chakra-ui/react'
import { Button } from '@components/chakra/button.tsx'
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from '@components/chakra/file-upload.tsx'
import { useEffect, useState } from 'react'
import { useUpdateAvatarMutation } from '@store/user/userApi.ts'
import { toaster } from '@components/chakra/toaster.tsx'

const ChangeAvatar = () => {
	const [file, setFile] = useState<any>(null)

	const [updateAvatar, { isLoading, isSuccess, isError, error }] = useUpdateAvatarMutation()

	const submitHandler = () => {
		if (file && file.acceptedFiles.length !== 0) {
			const formData = new FormData()
			formData.append('image', file.acceptedFiles[0])
			updateAvatar(formData)

			file.acceptedFiles = []
			setFile(null)
		}
	}

	useEffect(() => {
		if (isSuccess) {
			toaster.create({
				title: 'Image updated successfully!',
				type: 'success',
			})
		}
		if (isError) {
			if ((error as any).data.message) {
				toaster.create({
					description: (error as any).data.message,
					type: 'error',
				})
			}
		}
	}, [isLoading])

	return (
		<>
			<Heading
				mb={2}
				as='h3'
				size='lg'
			>
				Change your photo
			</Heading>
			<Text
				mb={5}
				fontSize='sm'
			>
				Drag and drop file below
			</Text>
			<Box
				asChild
				mb={5}
				maxW='xl'
				alignItems='stretch'
			>
				<FileUploadRoot
					maxFileSize={5 * 1024 * 1024} // 5mb
					accept={'image/*'}
					maxFiles={1}
					onFileChange={(details) => setFile(details)}
					disabled={isLoading}
				>
					<FileUploadDropzone
						label='Drag and drop or click here to upload'
						description='.png, .jpg up to 5MB'
					/>
					<FileUploadList
						showSize
						clearable
					/>
				</FileUploadRoot>
			</Box>
			<Button
				px='9'
				loading={isLoading}
				onClick={submitHandler}
			>
				Save
			</Button>
		</>
	)
}
export default ChangeAvatar
