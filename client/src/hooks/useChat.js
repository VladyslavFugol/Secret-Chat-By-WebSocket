import { useState, useRef } from 'react'
import { v4 as uuid } from 'uuid'

/* Socket logic */
function useChat() {
  const [users, setUsers] = useState([])
  const [roomKey, setRoomKey] = useState('')
  const [activeUserName, setActiveUserName] = useState('')
  const [messages, setMessages] = useState([])
  const [rooms, setRooms] = useState(new Map())

  const socket = useRef()

  const setConnect = (activeUserName, roomKey) => {

    socket.current = new WebSocket('ws://localhost:5000')

    setRoomKey(roomKey)
    setActiveUserName(activeUserName)

    socket.current.onopen = () => {
      const message = {
        event: 'connectToRoom',
        activeUserName,
        roomKey
      }

      const newRoom = new Map([
        ['users', new Map()],
        ['messages', []]
      ])

      setRooms(rooms.set(roomKey, newRoom))
      socket.current.send(JSON.stringify(message))
    }

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data)

      if (data.event === 'connectToRoom' || data.event === 'disconnect') {
        rooms.get(data.roomKey).set('users', [...data.users])
        setUsers(rooms.get(data.roomKey).get('users'))
      }

      rooms.get(data.roomKey).set('messages', [...data.messages])
      setMessages(rooms.get(data.roomKey).get('messages'))
    }
  }

  const sendMessage = (newMessage) => {
    const message = {
      event: 'roomMessage',
      activeUserName,
      roomKey,
      message: newMessage,
      messageId: uuid()
    }

    socket.current.send(JSON.stringify(message))
  }

  return {
    activeUserName,
    users,
    messages,
    setConnect,
    sendMessage
  }
}

export default useChat

