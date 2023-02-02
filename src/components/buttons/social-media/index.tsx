import React, { FC } from 'react'
import styles from './social-medial.module.scss'

const SocialMediaButton: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <a href="/">
      <div className={`${styles['social-button']}`}>{children}</div>
    </a>
  )
}

export default SocialMediaButton
