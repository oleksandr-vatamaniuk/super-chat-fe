import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import UserAvatar from '../userAvatar/userAvatar'
import styles from '../userProfile/user-profile.module.scss'
import { ReactPortal } from '../utils/portal/portal'
import { Modal } from 'react-bootstrap'

const ChatHeader = () => {
  const [showDropDownMenu, setShowDropDownMenu] = useState<boolean>(false)

  const dropDownMenuHandler = () => {
    setShowDropDownMenu((prevState) => !prevState)
  }

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShowDropDownMenu((prevState) => !prevState)
    setShow(true)
  }

  return (
    <div className="bg-body border-bottom">
      <div className="d-flex justify-content-between align-items-center pb-3 pt-3 pe-4 ps-4">
        <div className="d-flex">
          <NavLink className="d-flex align-items-center pe-3" to="/chat">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
            >
              <path
                d="M16 6.09173H3.32616L7.92527 1.28429L6.69664 0L0 7L6.69664 14L7.92527 12.7157L3.32616 7.90826H16V6.09173Z"
                fill="#8E94A7"
              />
            </svg>
          </NavLink>
          <div className="pe-3 ">
            <UserAvatar width={40} height={40} />
          </div>
          <div className="d-flex flex-column justify-content-center ">
            <h6 className="fs-18 m-0">Nora M. Buchanan</h6>
            <p className="m-0 fs-12 dark-gray-color">Online</p>
          </div>
        </div>
        <div>
          <div role="button" onClick={dropDownMenuHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
          </div>
          <div style={{ left: '-150px' }} className="dropdown">
            <ul
              className={`dropdown-menu ${styles['dropdown']} ${
                showDropDownMenu ? 'd-block' : ''
              } `}
            >
              <li>
                <div className="dropdown-item">
                  <button onClick={handleShow} className="btn">
                    Show Modal
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <ReactPortal wrapperId="modal">
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>Woohoo, you&apos;re reading this text in a modal!</Modal.Body>
              <Modal.Footer>
                <button onClick={handleClose}>Close</button>
                <button onClick={handleClose}>Save Changes</button>
              </Modal.Footer>
            </Modal>
          </ReactPortal>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
