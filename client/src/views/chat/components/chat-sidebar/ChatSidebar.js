import avatar from '../../../../assets/avatar.png'

import styles from './ChatSidebar.module.scss'

function ChatSidebar({ roomId, users }) {
  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <div className={styles.headerTitle}>Secret room: {roomId}</div>
      </div>

      <div className={styles.content}>
        {users?.map(user => (
          <div className={styles.contentItem} key={user.id}>
            <img src={avatar} alt={`${avatar}-icon`}/>
            <span>{user.name}</span>
          </div>
        ))}
      </div>

    </div>
  )
}

export default ChatSidebar
