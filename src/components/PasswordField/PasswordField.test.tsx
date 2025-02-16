import { screen, fireEvent, waitFor } from '@testing-library/react'
import { Formik } from 'formik'
import PasswordField from './PasswordField'
import { vi } from 'vitest'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

describe('PasswordField Component', () => {
	test('renders correctly with label', () => {
		renderWithChakra(
			<Formik
				initialValues={{ password: '' }}
				onSubmit={vi.fn()}
			>
				<PasswordField
					name='password'
					label='Password'
				/>
			</Formik>,
		)

		expect(screen.getByLabelText('Password')).toBeInTheDocument()
	})

	test('displays error message when field is invalid', async () => {
		renderWithChakra(
			<Formik
				initialValues={{ password: '' }}
				onSubmit={vi.fn()}
				initialErrors={{ password: 'Required' }}
				initialTouched={{ password: true }}
			>
				<PasswordField
					name='password'
					label='Password'
				/>
			</Formik>,
		)

		await waitFor(() => expect(screen.getByText('Required')).toBeInTheDocument())
	})

	test('updates value when typing', async () => {
		renderWithChakra(
			<Formik
				initialValues={{ password: '' }}
				onSubmit={vi.fn()}
			>
				<PasswordField
					name='password'
					label='Password'
				/>
			</Formik>,
		)

		const input = screen.getByLabelText('Password')
		fireEvent.change(input, { target: { value: 'Secret123' } })

		await waitFor(() => expect(input).toHaveValue('Secret123'))
	})
})
