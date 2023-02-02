import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styles from './login.module.scss'
import SocialMediaButton from '../../components/buttons/social-media'
import { Link } from 'react-router-dom'

interface SignInFormValues {
  email: string
  password: string
}

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const submitHandler = ({ email, password }: SignInFormValues) => {
    console.log(email, password)
    setLoading(true)
  }

  const signInFormik = useFormik<SignInFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum'),
    }),
    onSubmit: submitHandler,
  })

  return (
    <div className="container-fluid p-0">
      <div className="row p-0 m-0">
        <div className="col-md-5 p-0 d-none d-md-flex">
          <div
            className={styles['img-column']}
            style={{ backgroundImage: 'url(/images/login.jpeg)' }}
          />
        </div>
        <div className="col-md-7">
          <div className="d-flex flex-column justify-content-between pt-5 p-4 min-h-100vh">
            <div className={`${styles['form-block']} pt-md-5`}>
              <div className="mb-5">
                <img width={47} height={47} src="/images/waving-hand.png" alt="Waving hand emoji" />
              </div>
              <h1>Welcome back</h1>
              <p className="mb-5">Sign in to manage your account.</p>
              <form onSubmit={signInFormik.handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control ${
                      signInFormik.touched.email && signInFormik.errors.email ? 'is-invalid' : ''
                    }`}
                    aria-describedby="emailHelp"
                    placeholder="Enter your email address"
                    value={signInFormik.values.email}
                    onChange={signInFormik.handleChange}
                  />
                  {signInFormik.touched.email && signInFormik.errors.email && (
                    <span className="invalid-feedback d-block">{signInFormik.errors.email}</span>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      signInFormik.touched.password && signInFormik.errors.password
                        ? 'is-invalid'
                        : ''
                    }`}
                    id="password"
                    placeholder="Enter your password"
                    value={signInFormik.values.password}
                    onChange={signInFormik.handleChange}
                  />
                  {signInFormik.touched.password && signInFormik.errors.password && (
                    <span className="invalid-feedback d-block">{signInFormik.errors.password}</span>
                  )}
                </div>
                <div className="mb-3">
                  <a href="/forgot-password">Forgot your password?</a>
                </div>
                <div className="d-grid">
                  <button type="submit" className={`btn btn-submit ${loading ? 'loading' : ''}`}>
                    Sign In
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
              Don&apos;t have an account <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
