import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import styles from './settings.module.scss'

const Settings = () => {
  return (
    <div className="w-100">
      <div className="row">
        <div className="col d-flex justify-content-center">
          <div
            className={`${styles['settings-block']} bg-body pt-4 pb-5 pe-3 ps-3 pe-md-5 ps-md-5`}
          >
            <h3>Manage your account</h3>
            <div className="pt-3">
              <ul className={`${styles['settings-nav']} d-flex list-unstyled`}>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? `${styles['active']}` : undefined)}
                    to="/settings/edit-profile"
                  >
                    Edit Information
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? `${styles['active']}` : undefined)}
                    to="/settings/change-avatar"
                  >
                    User Avatar
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? `${styles['active']}` : undefined)}
                    to="/settings/change-password"
                  >
                    Change Password
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="pt-4">
              <div>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
