import React, { FC } from 'react'
import styles from './social-medial.module.scss'

const SocialMediaButton: FC<{ children: any }> = ({ children }) => {
  return (
    <a>
      <div className={`${styles['social-button']}`}>{children}</div>
    </a>
  )
}

export default SocialMediaButton
