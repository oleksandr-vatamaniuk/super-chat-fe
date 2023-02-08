import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import UserAvatar from '../../components/userAvatar/userAvatar'

const ChatWindow = () => {
  const { chatId } = useParams()

  return (
    <div className="border-start" style={{ minWidth: '850px' }}>
      <div
        style={{ minHeight: 'calc(100vh - 70px)' }}
        className="d-flex flex-column justify-content-between"
      >
        <div className="bg-body">
          <div className="d-flex justify-content-between align-items-center p-3">
            <div className="d-flex">
              <NavLink to="/chat-list/chat">Back</NavLink>
              <div className="pe-3 ">
                <UserAvatar width={40} height={40} />
              </div>
              <div className="d-flex flex-column =">
                <h6>Nora M. Buchanan</h6>
                <p className="m-0">Online</p>
              </div>
            </div>
            <div>
              <span>...</span>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className={'p-5'}>{chatId}</div>
          </div>
          <div className="bg-body p-4">
            <textarea className="form-control" placeholder="Type message" id="floatingTextarea" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
