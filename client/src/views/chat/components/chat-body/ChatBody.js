import { useState } from 'react'

import avatar from '../../../../assets/avatar.png'
import sendIcon from '../../../../assets/icons/send.svg'

import styles from './ChatBody.module.scss'

function ChatBody({ activeUserName, sendMessage, messages }) {
  const [message, setMessage] = useState('')

  const renderMessage = (message) => {
    if (message.senderName === activeUserName) {
      return (
        <div className={styles.contentMyMessage} key={message.id}>
          <div className={styles.contentMyMessageAuthor}>
            <img src={avatar} alt='avatar'/>
          </div>
          <div className={styles.contentMyMessageText}>{message.text}</div>
        </div>
      )
    }

    return (
      <div className={styles.contentMessage} key={message.id}>
        <div className={styles.contentMessageAuthor}>
          <img src={avatar} alt='avatar'/>
          <span>{message.senderName}</span>
        </div>
        <div className={styles.contentMessageText}>{message.text}</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <img src={avatar} alt='avatar'/>
          <span>{activeUserName}</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.contentMessages}>
          {messages?.map(renderMessage)}
        </div>

        <div className={styles.contentInput}>
          <input
            type='text'
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <img
            src={sendIcon}
            alt='send-icon'
            onClick={() => {
              sendMessage(message)
              setMessage('')
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ChatBody
