import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styles from './password-reset.module.scss'
import { Link } from 'react-router-dom'

interface PasswordRecoveryFormValues {
  newPassword: string
  confirmNewPassword: string
}

const ResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)

  const submitHandler = (formValues: PasswordRecoveryFormValues) => {
    console.log(formValues)
    setLoading(true)
    setShowSuccessMessage(true)
  }

  const resetPasswordFormik = useFormik<PasswordRecoveryFormValues>({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: Yup.object().shape({
      newPassword: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum'),
      confirmNewPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    }),
    onSubmit: submitHandler,
  })

  return (
    <div className="container-fluid p-0">
      <div className="row p-0 m-0">
        <div className="col-md-5 p-0 d-none d-md-flex">
          <div
            className={styles['img-column']}
            style={{ backgroundImage: 'url(/images/forgot-password.jpg)' }}
          />
        </div>
        <div className="col-md-7">
          <div className="d-flex flex-column align-items-center justify-content-center  p-4 min-h-100vh">
            {showSuccessMessage ? (
              <div className={styles['form-block']}>
                <div className="mb-4">
                  <img
                    width={47}
                    height={47}
                    src="/images/waving-hand.png"
                    alt="Waving hand emoji"
                  />
                </div>
                <h1>Password was reset</h1>
                <p className="mb-5">Now you can login using new password.</p>
                <div className="mt-4 text-center">
                  <Link to="/login">Back to Login</Link>
                </div>
              </div>
            ) : (
              <div className={styles['form-block']}>
                <h1>Password recovery</h1>
                <p className="mb-5">
                  Enter the new password that you&apos;re using for your account.
                </p>
                <form onSubmit={resetPasswordFormik.handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="newPassword" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        resetPasswordFormik.touched.newPassword &&
                        resetPasswordFormik.errors.newPassword
                          ? 'is-invalid'
                          : ''
                      }`}
                      id="newPassword"
                      placeholder="Enter your new password"
                      value={resetPasswordFormik.values.newPassword}
                      onChange={resetPasswordFormik.handleChange}
                    />
                    {resetPasswordFormik.touched.newPassword &&
                      resetPasswordFormik.errors.newPassword && (
                        <span className="invalid-feedback d-block">
                          {resetPasswordFormik.errors.newPassword}
                        </span>
                      )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="confirmNewPassword" className="form-label">
                      Confirm Your Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        resetPasswordFormik.touched.confirmNewPassword &&
                        resetPasswordFormik.errors.confirmNewPassword
                          ? 'is-invalid'
                          : ''
                      }`}
                      id="confirmNewPassword"
                      placeholder="Enter your new password again"
                      value={resetPasswordFormik.values.confirmNewPassword}
                      onChange={resetPasswordFormik.handleChange}
                    />
                    {resetPasswordFormik.touched.confirmNewPassword &&
                      resetPasswordFormik.errors.confirmNewPassword && (
                        <span className="invalid-feedback d-block">
                          {resetPasswordFormik.errors.confirmNewPassword}
                        </span>
                      )}
                  </div>
                  <div className="d-grid">
                    <button type="submit" className={`btn btn-submit ${loading ? 'loading' : ''}`}>
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
