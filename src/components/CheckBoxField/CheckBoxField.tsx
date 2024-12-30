import { useField } from 'formik'
import { Box, Text } from '@chakra-ui/react'
import { Checkbox } from '@components/chakra/checkbox.tsx'

// @ts-ignore
const CheckBoxField = ({ type, name, children, ...props }) => {
	const [field, meta] = useField(name)

	return (
		<Box pb={4}>
			<Checkbox
				variant='subtle'
				{...field}
				{...props}
			>
				{children}
			</Checkbox>
			{meta.touched && meta.error && (
				<Text
					textStyle='xs'
					fontWeight='500'
					color='fg.error'
				>
					{meta.error}
				</Text>
			)}
		</Box>
	)
}

export default CheckBoxField
