import { screen, fireEvent, waitFor } from '@testing-library/react'
import { Formik } from 'formik'
import CheckBoxField from './CheckBoxField'
import { vi } from 'vitest'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

describe('CheckBoxField Component', () => {
	test('renders correctly with label', () => {
		renderWithChakra(
			<Formik
				initialValues={{ terms: false }}
				onSubmit={vi.fn()}
			>
				<CheckBoxField name='terms'>Accept Terms</CheckBoxField>
			</Formik>,
		)

		expect(screen.getByText('Accept Terms')).toBeInTheDocument()
		expect(screen.getByRole('checkbox')).toBeInTheDocument()
	})

	test('displays error message when field is invalid', async () => {
		renderWithChakra(
			<Formik
				initialValues={{ terms: false }}
				onSubmit={vi.fn()}
				initialErrors={{ terms: 'Required' }}
				initialTouched={{ terms: true }}
			>
				<CheckBoxField name='terms'>Accept Terms</CheckBoxField>
			</Formik>,
		)

		await waitFor(() => expect(screen.getByText('Required')).toBeInTheDocument())
	})

	test('updates value when clicked', async () => {
		renderWithChakra(
			<Formik
				initialValues={{ terms: false }}
				onSubmit={vi.fn()}
			>
				<CheckBoxField name='terms'>Accept Terms</CheckBoxField>
			</Formik>,
		)

		const checkbox = screen.getByRole('checkbox')
		fireEvent.click(checkbox)
		await waitFor(() => expect(checkbox).toBeChecked())
	})
})
