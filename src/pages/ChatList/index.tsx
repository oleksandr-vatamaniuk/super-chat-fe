import React, { useState } from 'react'
import styles from './chat-list.module.scss'
import ChatIcon from '../../components/icons/chat-icon/chat-icon'
import LogoutIcon from '../../components/icons/logout-icon/logout-icon'

const ChatList = () => {
  const [showDropDownMenu, setShowDropDownMenu] = useState<boolean>(false)

  const dropDownMenuHandler = () => {
    setShowDropDownMenu((prevState) => !prevState)
  }

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
                  <div>
                    <div
                      role="button"
                      onClick={dropDownMenuHandler}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <div className={styles['user-avatar']}>
                        <img
                          src="https://s3-alpha-sig.figma.com/img/c7b4/bd5b/68c53fb3e597ec684ae11dbeec7fe0e2?Expires=1676246400&Signature=bXFY9~Y7CzWDLqqXVrYzQEA5rxnCCT3~ZbCww1ryBkJSWiOo3e7IEI7Nb7il6o8pJG1KNRfLw9qy7kcQIJItwUesfEUttIS5L76Z8VFQ4zlfSydu-IoL1wxCVmApnCGBiMGBYF-foELVfZCAVc11Nr-AGB1T4L64AK~6nd7J2QGvPI93QrQFpLokcR8oglMj~LW0zKuJ6i2LiumnNEK5vGR-P73y50TkqRdpPAQLkzixZdlF0ZgTI8Yoc1E5fk83TdM6poAf4OIsDUU3utZ-im~hg4Tr55l5eaT34kklWLWDUAZgALWpfc9asnd7-UJa9kAjTULe7aWGeFPZPCJYQw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                          alt="User Avatar"
                        />
                      </div>
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
                        className={`dropdown-menu ${showDropDownMenu ? 'd-block' : ''} ${
                          styles['dropdown-menu-offset']
                        }`}
                      >
                        <li className="fw-semibold d-md-none ps-2 ">Annette Black</li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Edit profile
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="h-100">
        <div className="container-fluid h-100">
          <div className="row justify-content-center h-100">
            <div className={`${styles['header-offset-top']} col-2 border-end`}>
              <nav className="pt-4 pe-sm-0 ps-sm-0 ps-md-3 pe-md-3">
                <h4 className="text-center text-md-start grey-color-100 fs-6 mb-4">Main menu</h4>
                <ul className="nav flex-column border-bottom mb-4 pb-4">
                  <li className="nav-item">
                    <a
                      className="nav-link text-center text-md-start pe-0 ps-0 pt-0"
                      aria-current="page"
                      href="#"
                    >
                      <span className="pe-2 ps-2 ps-md-0 pe-md-3">
                        <ChatIcon />
                      </span>
                      Chat
                    </a>
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
            <div className="col grey-bg">
              <div className={styles['header-offset-top']}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At et in, ipsa obcaecati
                ullam veniam. Asperiores autem, cupiditate dicta ea enim esse neque nulla
                perferendis possimus qui, similique vitae voluptate?
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ChatList
