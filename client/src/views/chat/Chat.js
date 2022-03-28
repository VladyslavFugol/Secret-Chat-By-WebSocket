import { useParams } from 'react-router-dom'

import { ChatBody, ChatSidebar, Error } from './components/index'

import styles from './Chat.module.scss'

function Chat({ users, activeUserName, sendMessage, messages, isAuthorized }) {
  const { roomId } = useParams()

  const renderChatBody = (isAuthorized) => {
    if (!isAuthorized) {
      return <Error/>
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <ChatSidebar roomId={roomId} users={users}/>
          <ChatBody
            sendMessage={sendMessage}
            messages={messages}
            activeUserName={activeUserName}/>
        </div>
      </div>
    )
  }

  return (
    <>
      {renderChatBody(isAuthorized)}
    </>
  )
}

export default Chat
