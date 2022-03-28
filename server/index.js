const { v4: uuidv4 } = require('uuid')
const ws = require('ws')

const PORT = 5000

const socket = new ws.Server(
  { port: PORT },
  () => console.log(`Server started on ${PORT}`)
)

const users = {}
const rooms = new Map()
let roomName = ''

socket.on('connection', (ws) => {
  const userId = uuidv4()
  users[userId] = ws

  console.log(`User ${userId} is connected`)

  ws.on('message', (data) => {
    data = JSON.parse(data)

    const { event, roomKey } = data
    roomName = roomKey

    switch (event) {
      case 'joinIntoRoom':
        if (!rooms.get(roomKey)) {
          data.error = { text: `Room ${roomKey} is not found.` }
        }
        broadcastDataToUser(data, userId)
        break

      case 'createRoom':
        if (rooms.get(roomKey)) {
          data.error = { text: `Room ${roomKey} is created.` }
        } else {
          const newRoom = new Map([
            ['users', new Map()],
            ['messages', []]
          ])

          rooms.set(roomKey, newRoom)
        }
        broadcastDataToUser(data, userId)
        break

      case 'connectToRoom':
        console.log(data)
        const newClient = {
          name: data.activeUserName,
          id: userId
        }

        rooms
        .get(roomKey)
        .get('users')
        .set(userId, newClient)

        data.users = [
          ...rooms
          .get(roomKey)
          .get('users')
          .values()
        ]
        data.messages = [...rooms.get(roomKey).get('messages')]
        broadcastDataToUsers(data)
        break

      case 'roomMessage':
        if (rooms.get(roomKey)) {
          const messageData = {
            id: data.messageId,
            senderName: data.activeUserName,
            text: data.message
          }

          rooms
          .get(roomKey)
          .get('messages')
          .push(messageData)

          data.messages = [...rooms.get(roomKey).get('messages')]
          broadcastDataToUsers(data)
        }
        break
    }
  })

  ws.on('close', (event) => {
    console.log(event)
    if (event === 1001) {
      rooms.get(roomName).get('users').delete(userId)

      const data = {
        event: 'disconnect',
        roomKey: roomName,
        users: [...rooms.get(roomName).get('users').values()]
      }

      broadcastDataToUsers(data)
    }
    delete users[userId]
    console.log(`User ${userId} disconnect`)
  })
})

const broadcastDataToUsers = (data) => {
  socket.clients.forEach(user => {
    user.send(JSON.stringify(data))
  })

}

const broadcastDataToUser = (data, userId) => {
  users[userId].send(JSON.stringify(data))
}







