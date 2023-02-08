import React from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import UserAvatar from '../../components/userAvatar/userAvatar'

const Chat = () => {
  const { chatId } = useParams()

  return (
    <div className="container-fluid p-0">
      <div className="d-flex">
        <div className={`${chatId ? 'bg-body' : ''} w-100`}>
          <div className={`${chatId ? 'd-none' : ''}`}>
            <div className="mt-4 d-flex align-items-center justify-content-between">
              <h3 className="d-inline-block">Chats</h3>
              <button className="d-inline-block btn btn-primary">+ New Chat</button>
            </div>
            <div className="container-fluid mt-3">
              <div className="row">
                <div className="col-9">
                  <span className="fw-bold grey-color-100">Name</span>
                </div>
                <div className="col-3">
                  <span className="fw-bold grey-color-100">Last Message</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-body border-bottom rounded-3 mt-2 mb-3">
              <div className="container-fluid">
                <div className="row align-items-center justify-content-center pt-3 pb-3">
                  <div className="col-9 d-flex">
                    <div className="pe-3">
                      <UserAvatar width={40} height={40} />
                    </div>
                    <div className="d-flex flex-column">
                      <div>
                        <h6>Severo Mesia</h6>
                      </div>
                      <div>
                        <p className="grey-color f-14 m-0">
                          We&apos;re happy to take a look into...
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 d-flex justify-content-between">
                    <span className="f-14 grey-color">Just Now</span>
                    <Link to="/chat-list/chat/123">Message</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-body border-bottom rounded-3 mt-2 mb-3">
              <div className="container-fluid">
                <div className="row align-items-center justify-content-center pt-3 pb-3">
                  <div className="col-9 d-flex">
                    <div className="pe-3">
                      <UserAvatar width={40} height={40} />
                    </div>
                    <div className="d-flex flex-column">
                      <div>
                        <h6>Severo Mesia</h6>
                      </div>
                      <div>
                        <p className="grey-color f-14 m-0">
                          We&apos;re happy to take a look into...
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 d-flex justify-content-between">
                    <span className="f-14 grey-color">Just Now</span>
                    <Link to="/chat-list/chat/567">Message</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-body border-bottom rounded-3 mt-2 mb-3">
              <div className="container-fluid">
                <div className="row align-items-center justify-content-center pt-3 pb-3">
                  <div className="col-9 d-flex">
                    <div className="pe-3">
                      <UserAvatar width={40} height={40} />
                    </div>
                    <div className="d-flex flex-column">
                      <div>
                        <h6>Severo Mesia</h6>
                      </div>
                      <div>
                        <p className="grey-color f-14 m-0">
                          We&apos;re happy to take a look into...
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 d-flex justify-content-between">
                    <span className="f-14 grey-color">Just Now</span>
                    <Link to="/chat-list/chat/456">Message</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Chat
