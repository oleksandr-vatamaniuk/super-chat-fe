import React, { useState } from 'react'
import styles from './user-profile.module.scss'
import { Link } from 'react-router-dom'
import UserAvatar from '../userAvatar/userAvatar'

const UserProfile = () => {
  const [showDropDownMenu, setShowDropDownMenu] = useState<boolean>(false)

  const dropDownMenuHandler = () => {
    setShowDropDownMenu((prevState) => !prevState)
  }

  return (
    <div>
      <div
        role="button"
        onClick={dropDownMenuHandler}
        className="d-flex align-items-center justify-content-center"
      >
        <UserAvatar width={48} height={48} />
        <div className="d-flex align-items-center">
          <p className="m-0 ps-3 fw-bold d-none d-md-block">Annette Black</p>
          <div className="ps-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="#8E94A7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="dropdown">
        <ul
          className={`dropdown-menu ${styles['dropdown']} ${showDropDownMenu ? 'd-block' : ''} ${
            styles['dropdown-menu-offset']
          }`}
        >
          <li className="fw-semibold d-md-none ps-2 ">Annette Black</li>
          <li>
            <Link className="dropdown-item" to="/chat-list/settings/edit-profile">
              Edit profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserProfile
