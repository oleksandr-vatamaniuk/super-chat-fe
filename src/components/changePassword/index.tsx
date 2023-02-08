import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

interface changePasswordValues {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

const ChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const submitHandler = (formValues: changePasswordValues) => {
    console.log(formValues)
    setLoading(true)
  }

  const changePasswordFormik = useFormik<changePasswordValues>({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum'),
      newPassword: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum'),
      confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    }),
    onSubmit: submitHandler,
  })

  return (
    <div>
      <h5 className="mb-4">Change your password</h5>
      <form className="form-block" onSubmit={changePasswordFormik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Old Password
          </label>
          <input
            type="password"
            className={`form-control ${
              changePasswordFormik.touched.oldPassword && changePasswordFormik.errors.oldPassword
                ? 'is-invalid'
                : ''
            }`}
            id="password"
            placeholder="Enter your current password"
            value={changePasswordFormik.values.oldPassword}
            onChange={changePasswordFormik.handleChange}
          />
          {changePasswordFormik.touched.oldPassword && changePasswordFormik.errors.oldPassword && (
            <span className="invalid-feedback d-block">
              {changePasswordFormik.errors.oldPassword}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className={`form-control ${
              changePasswordFormik.touched.newPassword && changePasswordFormik.errors.newPassword
                ? 'is-invalid'
                : ''
            }`}
            id="password"
            placeholder="Enter your new password"
            value={changePasswordFormik.values.newPassword}
            onChange={changePasswordFormik.handleChange}
          />
          {changePasswordFormik.touched.newPassword && changePasswordFormik.errors.newPassword && (
            <span className="invalid-feedback d-block">
              {changePasswordFormik.errors.newPassword}
            </span>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm New Password
          </label>
          <input
            type="password"
            className={`form-control ${
              changePasswordFormik.touched.confirmNewPassword &&
              changePasswordFormik.errors.confirmNewPassword
                ? 'is-invalid'
                : ''
            }`}
            id="confirmPassword"
            placeholder="Enter your new password again"
            value={changePasswordFormik.values.confirmNewPassword}
            onChange={changePasswordFormik.handleChange}
          />
          {changePasswordFormik.touched.confirmNewPassword &&
            changePasswordFormik.errors.confirmNewPassword && (
              <span className="invalid-feedback d-block">
                {changePasswordFormik.errors.confirmNewPassword}
              </span>
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

export default ChangePassword
