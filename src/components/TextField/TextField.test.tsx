import { screen, fireEvent, waitFor } from '@testing-library/react'
import { Formik } from 'formik'
import TextField from './TextField'
import renderWithChakra from '@testUtils/renderWithChakra.tsx'

describe('TextField Component', () => {
	it('renders correctly with label and input', () => {
		renderWithChakra(
			<Formik
				initialValues={{ test: '' }}
				onSubmit={() => {}}
			>
				<TextField
					label='Test Label'
					name='test'
				/>
			</Formik>,
		)

		expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
	})

	test('displays error message when field is invalid', async () => {
		renderWithChakra(
			<Formik
				initialValues={{ test: '' }}
				onSubmit={vi.fn()}
				initialErrors={{ test: 'Required' }}
				initialTouched={{ test: true }}
			>
				<TextField
					name='test'
					label='Test Label'
				/>
			</Formik>,
		)

		await waitFor(() => expect(screen.getByText('Required')).toBeInTheDocument())
	})

	test('updates value when typing', async () => {
		renderWithChakra(
			<Formik
				initialValues={{ test: '' }}
				onSubmit={vi.fn()}
			>
				<TextField
					name='test'
					label='Test Label'
				/>
			</Formik>,
		)

		const input = screen.getByLabelText('Test Label')
		fireEvent.change(input, { target: { value: 'Hello' } })

		await waitFor(() => expect(input).toHaveValue('Hello'))
	})
})
