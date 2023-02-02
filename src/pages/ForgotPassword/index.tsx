import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styles from './forgot-password.module.scss'
import { Link } from 'react-router-dom'

interface ForgotPasswordFormValues {
  email: string
}

const ForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)

  const submitHandler = ({ email }: ForgotPasswordFormValues) => {
    console.log(email)
    setLoading(true)
    setShowSuccessMessage(true)
  }

  const forgotPasswordFormik = useFormik<ForgotPasswordFormValues>({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required('Email is required'),
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
                <h1>Email was sent</h1>
                <p className="mb-5">Please check you email box and follow the instructions.</p>
                <div className="mt-4 text-center">
                  <Link to="/login">Back to Login</Link>
                </div>
              </div>
            ) : (
              <div className={styles['form-block']}>
                <h1>Password recovery</h1>
                <p className="mb-5">Enter the email you&apos;re using for your account.</p>
                <form onSubmit={forgotPasswordFormik.handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`form-control ${
                        forgotPasswordFormik.touched.email && forgotPasswordFormik.errors.email
                          ? 'is-invalid'
                          : ''
                      }`}
                      aria-describedby="emailHelp"
                      placeholder="Enter your email address"
                      value={forgotPasswordFormik.values.email}
                      onChange={forgotPasswordFormik.handleChange}
                    />
                    {forgotPasswordFormik.touched.email && forgotPasswordFormik.errors.email && (
                      <span className="invalid-feedback d-block">
                        {forgotPasswordFormik.errors.email}
                      </span>
                    )}
                  </div>
                  <div className="d-grid">
                    <button type="submit" className={`btn btn-submit ${loading ? 'loading' : ''}`}>
                      Reset
                    </button>
                  </div>
                </form>
                <div className="mt-4 text-center">
                  <Link to="/login">Back to Login</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
