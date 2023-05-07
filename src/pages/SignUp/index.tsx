import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styles from './signup.module.scss'
import SocialMediaButton from '@components/buttons/social-media'
import { Link } from 'react-router-dom'

interface SignUpFormValues {
  name: string
  age?: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

const SignUp = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const submitHandler = (formValues: SignUpFormValues) => {
    console.log(formValues)
    setLoading(true)
  }

  const signUpFormik = useFormik<SignUpFormValues>({
    initialValues: {
      name: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required('Name is required field')
        .min(4, 'Name should be at least 4 characters long'),
      age: Yup.number()
        .positive('Age should be a positive number')
        .integer('Age should be an integer'),
      email: Yup.string().email().required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum'),
      confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      terms: Yup.bool().oneOf([true], 'You must accept the terms and conditions'),
    }),
    onSubmit: submitHandler,
  })

  return (
    <div className="container-fluid p-0">
      <div className="row p-0 m-0">
        <div className="col-md-5 p-0 d-none d-md-flex">
          <div
            className={styles['img-column']}
            style={{ backgroundImage: 'url(/images/signup.jpg)' }}
          />
        </div>
        <div className="col-md-7">
          <div className="d-flex flex-column justify-content-between pt-5 p-4 min-h-100vh">
            <div className={`${styles['form-block']} pt-md-3`}>
              <h1>Get started today</h1>
              <p className="mb-5">Enter your details to create super account.</p>
              <form onSubmit={signUpFormik.handleSubmit}>
                <div className="row mb-4">
                  <div className="col">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className={`form-control ${
                        signUpFormik.touched.name && signUpFormik.errors.name ? 'is-invalid' : ''
                      }`}
                      placeholder="Enter your name"
                      value={signUpFormik.values.name}
                      onChange={signUpFormik.handleChange}
                      aria-label="Name"
                    />
                    {signUpFormik.touched.name && signUpFormik.errors.name && (
                      <span className="invalid-feedback d-block">{signUpFormik.errors.name}</span>
                    )}
                  </div>
                  <div className="col">
                    <label htmlFor="age" className="form-label">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      className={`form-control ${
                        signUpFormik.touched.age && signUpFormik.errors.age ? 'is-invalid' : ''
                      }`}
                      placeholder="Enter your age"
                      value={signUpFormik.values.age}
                      onChange={signUpFormik.handleChange}
                      aria-label="Age"
                    />
                    {signUpFormik.touched.age && signUpFormik.errors.age && (
                      <span className="invalid-feedback d-block">{signUpFormik.errors.age}</span>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control ${
                      signUpFormik.touched.email && signUpFormik.errors.email ? 'is-invalid' : ''
                    }`}
                    aria-describedby="emailHelp"
                    placeholder="Enter your email address"
                    value={signUpFormik.values.email}
                    onChange={signUpFormik.handleChange}
                  />
                  {signUpFormik.touched.email && signUpFormik.errors.email && (
                    <span className="invalid-feedback d-block">{signUpFormik.errors.email}</span>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      signUpFormik.touched.password && signUpFormik.errors.password
                        ? 'is-invalid'
                        : ''
                    }`}
                    id="password"
                    placeholder="Enter your password"
                    value={signUpFormik.values.password}
                    onChange={signUpFormik.handleChange}
                  />
                  {signUpFormik.touched.password && signUpFormik.errors.password && (
                    <span className="invalid-feedback d-block">{signUpFormik.errors.password}</span>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Your Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      signUpFormik.touched.confirmPassword && signUpFormik.errors.confirmPassword
                        ? 'is-invalid'
                        : ''
                    }`}
                    id="confirmPassword"
                    placeholder="Enter your password again"
                    value={signUpFormik.values.confirmPassword}
                    onChange={signUpFormik.handleChange}
                  />
                  {signUpFormik.touched.confirmPassword && signUpFormik.errors.confirmPassword && (
                    <span className="invalid-feedback d-block">
                      {signUpFormik.errors.confirmPassword}
                    </span>
                  )}
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      name="terms"
                      className="form-check-input"
                      type="checkbox"
                      onChange={signUpFormik.handleChange}
                      id="terms-and-policy"
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      I agree to Product
                    </label>
                    <a href="/terms-and-policy"> Terms and Policy.</a>
                    {signUpFormik.touched.terms && signUpFormik.touched.terms && (
                      <span className="invalid-feedback d-block">{signUpFormik.errors.terms}</span>
                    )}
                  </div>
                </div>
                <div className="d-grid">
                  <button type="submit" className={`btn btn-submit ${loading ? 'loading' : ''}`}>
                    Get Started now
                  </button>
                </div>
              </form>
              <div className="text-center grey-color mt-4 mb-4 quoted">
                <small>Or do it via other accounts</small>
              </div>
              <div className="d-flex justify-content-center gap-4">
                <SocialMediaButton>
                  <img src="/images/google.png" alt="Google" />
                </SocialMediaButton>
                <SocialMediaButton>
                  <img src="/images/facebook.png" alt="Facebook" />
                </SocialMediaButton>
              </div>
            </div>
            <div className="text-center grey-color pb-3">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
