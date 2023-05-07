import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import ChatItem from '@components/ChatItem/chatItem'
import styles from './chat.module.scss'

const Chat = () => {
  const { chatId } = useParams()

  const isMobileRes = () => {
    return window.innerWidth < 700 && !!chatId
  }

  let isMobile = isMobileRes()
  useEffect(() => {
    isMobile = isMobileRes()
  }, [chatId])

  return (
    <div className="container-fluid p-0">
      <div className="d-flex w-100 overflow-hidden">
        {!isMobile && (
          <div className={`${chatId ? styles['w-380'] + ' bg-body' : 'w-100'}`}>
            {!chatId && (
              <div className="mt-4 pe-3 ps-3 pe-md-4 ps-md-4">
                <div className="d-flex align-items-center justify-content-between">
                  <h5 className="d-inline-block m-0">Chats</h5>
                  <button className="btn btn-primary btn-small-2">
                    <span className={styles['plus-icon']}>+</span>
                    <span className="d-none d-md-inline ms-md-2">New Chat</span>
                  </button>
                </div>
                <div className="container-fluid mt-4">
                  <div className="row">
                    <div className="col-6 col-md-9 ps-0 ps-md-3">
                      <div role="button">
                        <span className="fs-14 grey-color-100">Name</span>
                        <span className="ms-1">
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
                        </span>
                      </div>
                    </div>
                    <div className="col-6 col-md-3 pe-0 pe-md-3">
                      <div role="button" className="text-end text-md-start">
                        <span className="fs-14 grey-color-100">Last Message</span>
                        <span className="ms-1">
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
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div>
              <ChatItem id={'123'} size={!!chatId} />
              <ChatItem id={'456'} size={!!chatId} />
              <ChatItem id={'678'} size={!!chatId} />
            </div>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  )
}

export default Chat
