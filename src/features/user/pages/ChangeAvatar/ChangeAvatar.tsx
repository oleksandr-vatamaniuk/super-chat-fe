import { Box, FileUploadFileChangeDetails, Heading, Text, Image, Center } from '@chakra-ui/react'
import { Button } from '@components/chakra/button.tsx'
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from '@components/chakra/file-upload.tsx'
import { useEffect, useState } from 'react'
import { useUpdateAvatarMutation } from '@features/user/userApi.ts'
import { toaster } from '@components/chakra/toaster.tsx'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

type FileType = File | null

const ChangeAvatar = () => {
	const [file, setFile] = useState<FileType>(null)
	const [imageSrc, setImageSrc] = useState<string>('')
	const [updateAvatar, { isLoading, isSuccess }] = useUpdateAvatarMutation()

	const submitHandler = () => {
		if (file) {
			const formData = new FormData()
			formData.append('image', file)
			updateAvatar(formData)
		}
	}

	const handleFileChange = (e: FileUploadFileChangeDetails) => {
		const selectedFile = e.acceptedFiles[0] || null
		setFile(selectedFile)
		setImageSrc(selectedFile ? URL.createObjectURL(selectedFile) : '')
	}

	useEffect(() => {
		if (isSuccess) {
			setFile(null)
			setImageSrc('')
			toaster.create({
				title: 'Image updated successfully!',
				type: 'success',
			})
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
				cursor='pointer'
			>
				<FileUploadRoot
					maxFileSize={MAX_FILE_SIZE}
					accept={'image/*'}
					maxFiles={1}
					onFileChange={handleFileChange}
					disabled={isLoading}
				>
					{!file ? (
						<FileUploadDropzone
							label='Drag and drop or click here to upload'
							description='.png, .jpg up to 5MB'
						/>
					) : (
						<Center
							border='1px solid'
							borderColor='brand.grey.150'
							borderRadius='sm'
							h='250px'
							bgColor='brand.grey.100'
						>
							<Image
								boxSize='150px'
								borderRadius='full'
								fit='cover'
								src={imageSrc}
							/>
						</Center>
					)}
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
