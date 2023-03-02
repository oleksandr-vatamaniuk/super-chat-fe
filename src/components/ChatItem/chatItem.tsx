import React, { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import UserAvatar from '../userAvatar/userAvatar'
import styles from './chat-item.module.scss'

type ChatItemTypes = {
  id: string
  size?: boolean
}

const ChatItem: FC<ChatItemTypes> = ({ id, size }) => {
  const { chatId } = useParams()

  return (
    <div
      className={`${styles['chat-item']} ${chatId === id ? styles['active'] : ''} ${
        size ? styles['small'] : styles['wide']
      }`}
    >
      <div className="border-bottom ">
        <Link className={styles['message-link']} to={`/chat/${id}`}>
          Message
        </Link>
        <div className="container-fluid">
          <div className="row align-items-center justify-content-center pt-3 pb-3">
            <div className="col-9 d-flex">
              <div className="pe-3">
                <UserAvatar width={40} height={40} />
              </div>
              <div className="d-flex flex-column">
                <div>
                  <h6 className="fs-14">Severo Mesia</h6>
                </div>
                <div>
                  <p className="grey-color f-14 m-0">We&apos;re happy to take a look into...</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <span className="f-14 grey-color">Just Now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatItem
