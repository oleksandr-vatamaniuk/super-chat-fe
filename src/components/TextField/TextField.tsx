import { Input, InputProps } from '@chakra-ui/react'
import { useField } from 'formik'
import { FC } from 'react'
import { Field, FieldProps } from '@components/chakra/field.tsx'

export type TextFieldProps = { name: string } & InputProps & FieldProps

const TextField: FC<TextFieldProps> = ({ label, name, ...props }) => {
	const [field, meta] = useField(name)

	return (
		<Field
			required={props.required}
			label={label}
			invalid={meta.touched && !!meta.error}
			errorText={meta.error}
		>
			<Input
				data-testid={name}
				{...field}
				{...props}
			/>
		</Field>
	)
}

export default TextField
