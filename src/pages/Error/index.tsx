import React from 'react'
import styles from './error.module.scss'

const Error = () => {
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
            <div className="form-block">
              <div className="mb-3">
                <img width={47} height={47} src="/images/waving-hand.png" alt="Waving hand emoji" />
              </div>
              <h1>404</h1>
              <p className="mb-5">Page not found.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error
