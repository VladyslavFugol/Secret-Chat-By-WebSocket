import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import styles from './Login.module.scss'

function Login({ setConnect, setAuthorized }) {
  const [isConnected, setConnected] = useState(false)
  const [roomKey, setRoom] = useState('')
  const [activeUserName, setActiveUserName] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if(isConnected) {
      navigate(`/${roomKey}`)
    } else {
      navigate('/')
    }
  }, [isConnected])

  const joinIntoRoom = () => {
    const checkSocket = new WebSocket('ws://localhost:5000')

    checkSocket.onopen = () => {
      const message = {
        event: 'joinIntoRoom',
        roomKey
      }

      checkSocket.send(JSON.stringify(message))
    }

    checkSocket.onmessage = (event) => {
      const message = JSON.parse(event.data)

      if (!message.error) {
        setConnected(true)
        setAuthorized(true)
        setConnect(activeUserName, roomKey)
      } else {
        toast.error(message.error.text)
      }
      checkSocket.close()
    }
  }

  const createRoom = () => {
    const createSocket = new WebSocket('ws://localhost:5000')

    createSocket.onopen = () => {
      const message = {
        event: 'createRoom',
        activeUserName,
        roomKey
      }

      createSocket.send(JSON.stringify(message))
    }

    createSocket.onmessage = (event) => {
      const message = JSON.parse(event.data)

      if (!message.error) {
        toast.success('Create room is successful')
      } else {
        toast.error(message.error.text)
      }

      createSocket.close()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <input
          className={styles.formInput}
          type="text"
          placeholder='room'
          value={roomKey}
          onChange={event => setRoom(event.target.value)}
        />
        <input
          className={styles.formInput}
          type="text"
          placeholder='name'
          value={activeUserName}
          onChange={event => setActiveUserName(event.target.value)}
        />

        <div className={styles.formButtons}>
          <button className={styles.button} onClick={joinIntoRoom}>Join</button>
          <button className={styles.buttonCreate} onClick={createRoom}>Create room</button>
        </div>
      </div>
    </div>
  )
}

export default Login
