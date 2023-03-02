import React, { useState } from 'react'
import styles from './chat-list.module.scss'
import ChatIcon from '../../components/icons/chat-icon/chat-icon'
import LogoutIcon from '../../components/icons/logout-icon/logout-icon'
import UserProfile from '../../components/userProfile'
import { NavLink, Outlet } from 'react-router-dom'

const ChatList = () => {
  return (
    <>
      <header className={`${styles['header']} bg-white w-100 border-bottom`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2 border-end">
              <div className="h-100 d-flex align-items-center justify-content-center">
                <div className="d-md-none">
                  <svg
                    width="29"
                    height="70"
                    viewBox="0 0 29 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.99 22.1893L2.05 9.81428C0.232001 8.56028 0.850002 5.94928 3.117 5.33528L22.184 0.160282C22.5879 0.0145413 23.0207 -0.032768 23.4466 0.0222817C23.8724 0.0773314 24.279 0.233152 24.6326 0.47681C24.9861 0.720469 25.2765 1.04494 25.4795 1.42329C25.6825 1.80164 25.7924 2.22296 25.8 2.65228L24.67 20.2013C24.536 22.2843 21.808 23.4433 19.99 22.1893Z"
                      fill="#179D2D"
                    />
                    <path
                      d="M14.3 25.2443L3.73098 4.57528C3.48938 4.10243 3.38307 3.57205 3.42376 3.04262C3.46445 2.51319 3.65057 2.00528 3.96158 1.57491C4.2726 1.14453 4.69643 0.808415 5.18634 0.603617C5.67625 0.398819 6.2132 0.333299 6.73798 0.414282L26.325 3.43728C26.7759 3.50689 27.2039 3.68254 27.5738 3.94979C27.9436 4.21704 28.2447 4.56826 28.4524 4.97457C28.66 5.38088 28.7683 5.83068 28.7682 6.28697C28.7681 6.74327 28.6597 7.19303 28.452 7.59928L19.429 25.2453C19.1867 25.7168 18.8191 26.1123 18.3666 26.3885C17.9141 26.6646 17.3943 26.8107 16.8642 26.8106C16.3341 26.8105 15.8143 26.6642 15.3619 26.3879C14.9095 26.1116 14.5421 25.7159 14.3 25.2443Z"
                      fill="#70E2B2"
                    />
                    <path
                      d="M25.752 3.34831L15.988 1.84131L4 5.09631L8.785 14.4573L19.99 22.1893C20.2372 22.358 20.5091 22.4872 20.796 22.5723L25.052 14.2493L25.752 3.34831Z"
                      fill="#12215E"
                    />
                  </svg>
                </div>
                <img
                  className="d-none d-md-block"
                  width={178}
                  height={70}
                  src="/images/logo-black.png"
                  alt="Logo"
                />
              </div>
            </div>
            <div className="col">
              <div className="row h-100 justify-content-end pe-4 ps-4">
                <div className="col-4 d-flex align-items-center justify-content-end">
                  <UserProfile />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="h-100">
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col-2 border-end">
              <div className={`${styles['header-offset-top']}`}>
                <nav className="pt-4 pe-sm-0 ps-sm-0 ps-md-3 pe-md-3">
                  <h4 className="text-center text-md-start grey-color-100 fs-6 mb-4">Main menu</h4>
                  <ul className="nav flex-column border-bottom mb-4 pb-4">
                    <li className="nav-item">
                      <NavLink
                        className="nav-link text-center text-md-start pe-0 ps-0 pt-0"
                        aria-current="page"
                        to="/chat"
                      >
                        <span className="pe-2 ps-2 ps-md-0 pe-md-3">
                          <ChatIcon />
                        </span>
                        Chat
                      </NavLink>
                    </li>
                  </ul>
                  <div>
                    <button className="btn btn-logout d-flex justify-content-center">
                      <span className="pe-md-2">
                        <LogoutIcon />
                      </span>
                      <span className="d-none d-md-flex">Logout</span>
                    </button>
                  </div>
                </nav>
              </div>
            </div>
            <div className="col-10 grey-bg p-0">
              <div className={styles['header-offset-top']}>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ChatList
