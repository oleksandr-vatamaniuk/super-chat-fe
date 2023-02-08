import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

interface EditUserInfoValues {
  name: string
  age?: string
}

const EditProfile = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const submitHandler = (formValues: EditUserInfoValues) => {
    console.log(formValues)
    setLoading(true)
  }

  const editUserInfoFormik = useFormik<EditUserInfoValues>({
    initialValues: {
      name: '',
      age: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required('Name is required field')
        .min(4, 'Name should be at least 4 characters long'),
      age: Yup.number()
        .positive('Age should be a positive number')
        .integer('Age should be an integer'),
    }),
    onSubmit: submitHandler,
  })

  return (
    <div>
      <h5 className="mb-4">Change your information</h5>
      <form className="form-block" onSubmit={editUserInfoFormik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className={`form-control ${
              editUserInfoFormik.touched.name && editUserInfoFormik.errors.name ? 'is-invalid' : ''
            }`}
            placeholder="Enter your name"
            value={editUserInfoFormik.values.name}
            onChange={editUserInfoFormik.handleChange}
            aria-label="Name"
          />
          {editUserInfoFormik.touched.name && editUserInfoFormik.errors.name && (
            <span className="invalid-feedback d-block">{editUserInfoFormik.errors.name}</span>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            id="age"
            className={`form-control ${
              editUserInfoFormik.touched.age && editUserInfoFormik.errors.age ? 'is-invalid' : ''
            }`}
            placeholder="Enter your age"
            value={editUserInfoFormik.values.age}
            onChange={editUserInfoFormik.handleChange}
            aria-label="Age"
          />
          {editUserInfoFormik.touched.age && editUserInfoFormik.errors.age && (
            <span className="invalid-feedback d-block">{editUserInfoFormik.errors.age}</span>
          )}
        </div>
        <div className="d-flex gap-3">
          <button
            type="submit"
            className={`btn btn-submit btn-small fw-bold ${loading ? 'loading' : ''}`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProfile
