import React from 'react'
import { useParams } from 'react-router-dom'
import ChatHeader from '../../components/chatHeader/chatHeader'

const ChatWindow = () => {
  const { chatId } = useParams()

  return (
    <div className="border-start w-100">
      <div
        style={{ minHeight: 'calc(100vh - 70px)' }}
        className="d-flex flex-column justify-content-between"
      >
        <ChatHeader />
        <div style={{ flex: 1 }}>
          <div>
            <div className="p-5">{chatId}</div>
          </div>
        </div>
        <div className="bg-body p-4">
          <textarea
            autoFocus={true}
            className="form-control"
            placeholder="Type message"
            id="floatingTextarea"
          />
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
