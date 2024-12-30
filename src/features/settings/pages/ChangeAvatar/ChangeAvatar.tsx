import { Heading, Text } from '@chakra-ui/react'
import { Button } from '@components/chakra/button.tsx'
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from '@components/chakra/file-upload.tsx'

const ChangeAvatar = () => {
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
			<FileUploadRoot
				mb={5}
				maxW='xl'
				alignItems='stretch'
				maxFiles={1}
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
			<Button
				px='9'
				type='submit'
			>
				Save
			</Button>
		</>
	)
}
export default ChangeAvatar
