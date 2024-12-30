import { useField } from 'formik'
import { FC } from 'react'
import { Field, FieldProps } from '@components/chakra/field.tsx'
import { PasswordInput, PasswordInputProps } from '@components/chakra/password-input.tsx'

export type PassWordFieldProps = { name: string } & PasswordInputProps & FieldProps

const PasswordField: FC<PassWordFieldProps> = ({ label, name, ...props }) => {
	const [field, meta] = useField(name)

	return (
		<Field
			required={props.required}
			label={label}
			invalid={meta.touched && !!meta.error}
			errorText={meta.error}
		>
			<PasswordInput
				{...field}
				{...props}
			/>
		</Field>
	)
}

export default PasswordField
